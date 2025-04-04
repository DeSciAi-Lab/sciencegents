-- Drop the old function signature if it exists, before creating the new one
DROP FUNCTION IF EXISTS get_token_stats_24h(text);

-- Function to get 24h volume, price change, high, and low for a specific token
create or replace function get_token_stats_24h(p_token_id text)
returns table (
    volume_24h numeric,
    price_change_percentage_24h numeric,
    high_24h numeric,
    low_24h numeric
)
language plpgsql
as $$
declare
    start_time timestamptz := now() - interval '24 hours';
    latest_price numeric;
    start_price numeric;
begin
    -- Calculate 24h volume by summing value_in_usd
    select coalesce(sum(value_in_usd), 0)
    into volume_24h
    from trades
    where token_id = p_token_id and time >= start_time;

    -- Get the latest price within the 24h window
    select price_in_usd
    into latest_price
    from trades
    where token_id = p_token_id and time >= start_time
    order by time desc
    limit 1;

    -- Get the earliest price within the 24h window
    select price_in_usd
    into start_price
    from trades
    where token_id = p_token_id and time >= start_time
    order by time asc
    limit 1;
    
    -- Get the highest price within the 24h window
    select max(price_in_usd)
    into high_24h
    from trades
    where token_id = p_token_id and time >= start_time;
    
    -- Get the lowest price within the 24h window
    select min(price_in_usd)
    into low_24h
    from trades
    where token_id = p_token_id and time >= start_time;

    -- Calculate percentage change
    if start_price is not null and start_price != 0 and latest_price is not null then
        price_change_percentage_24h := ((latest_price - start_price) / start_price) * 100;
    else
        price_change_percentage_24h := 0;
    end if;

    -- Ensure nulls are returned as 0 (or a sensible default like latest_price for high/low if no trades found? Let's stick with 0 for now)
    volume_24h := coalesce(volume_24h, 0);
    price_change_percentage_24h := coalesce(price_change_percentage_24h, 0);
    high_24h := coalesce(high_24h, latest_price, 0); -- Use latest_price as fallback if MAX is null, then 0
    low_24h := coalesce(low_24h, latest_price, 0);  -- Use latest_price as fallback if MIN is null, then 0

    return next; -- Return the calculated row
end;
$$;
