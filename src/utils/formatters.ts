/**
 * Formats a number with commas as thousands separators and optional decimal places.
 */
export const formatNumber = (value: number | null | undefined, decimals: number = 2): string => {
  if (value === null || value === undefined || isNaN(value)) {
    return '-'; // Return dash for invalid input
  }
  return value.toLocaleString(undefined, { 
    minimumFractionDigits: decimals, 
    maximumFractionDigits: decimals 
  });
};

/**
 * Formats a number as a percentage string with a sign.
 */
export const formatPercent = (value: number | null | undefined, decimals: number = 2): string => {
  if (value === null || value === undefined || isNaN(value)) {
    return '-%'; // Return dash for invalid input
  }
  const percentage = value.toFixed(decimals);
  return `${value >= 0 ? '+' : ''}${percentage}%`;
};

/**
 * Shortens a number to k (thousands), M (millions), B (billions).
 */
export const shortenNumber = (value: number | null | undefined): string => {
    if (value === null || value === undefined || isNaN(value)) {
        return '-';
    }
    if (value >= 1e9) {
        return (value / 1e9).toFixed(2) + 'B';
    }
    if (value >= 1e6) {
        return (value / 1e6).toFixed(2) + 'M';
    }
    if (value >= 1e3) {
        return (value / 1e3).toFixed(2) + 'k';
    }
    return value.toString();
}; 