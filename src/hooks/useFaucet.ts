import { useState, useEffect, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { requestDsiTokens, getFaucetCooldown } from '@/services/faucetService';
import { formatDistanceToNowStrict } from 'date-fns';

// Function to format remaining seconds into a readable string
const formatCooldownTime = (seconds: number): string => {
  if (seconds <= 0) return "";
  return formatDistanceToNowStrict(Date.now() + seconds * 1000, { addSuffix: true });
};

export const useFaucet = () => {
  const { address, isConnected } = useAccount();
  const [isRequesting, setIsRequesting] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0); // Remaining cooldown in seconds
  const [cooldownMessage, setCooldownMessage] = useState("");
  const [canRequest, setCanRequest] = useState(false);

  // Check cooldown status periodically
  const checkCooldown = useCallback(async () => {
    if (!isConnected || !address) {
      setCooldownTime(0);
      setCooldownMessage("");
      setCanRequest(false);
      return;
    }

    try {
      const remaining = await getFaucetCooldown(address);
      setCooldownTime(remaining);
      if (remaining > 0) {
        setCooldownMessage(`Please wait ${formatCooldownTime(remaining)} for the cooldown period to end (24 hours between requests)`);
        setCanRequest(false);
      } else {
        setCooldownMessage("");
        setCanRequest(true);
      }
    } catch (error) {
      console.error("Failed to check faucet cooldown:", error);
      // Assume user can request if check fails, to avoid blocking unnecessarily
      setCooldownTime(0);
      setCooldownMessage("Could not verify cooldown status.");
      setCanRequest(true);
    }
  }, [address, isConnected]);

  // Initial check and periodic refresh
  useEffect(() => {
    checkCooldown(); // Initial check
    const interval = setInterval(checkCooldown, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [checkCooldown]);

  // Update message when cooldownTime changes
  useEffect(() => {
    if (cooldownTime > 0) {
        setCooldownMessage(`Please wait ${formatCooldownTime(cooldownTime)} for the cooldown period to end (24 hours between requests)`);
        setCanRequest(false);
    } else {
        setCooldownMessage("");
        setCanRequest(isConnected); // Can request only if connected and cooldown is 0
    }
  }, [cooldownTime, isConnected]);

  const handleRequestTokens = async () => {
    if (!canRequest || isRequesting) return;

    setIsRequesting(true);
    const success = await requestDsiTokens();
    setIsRequesting(false);

    if (success) {
      // Successfully requested, immediately re-check cooldown to update status
      await checkCooldown();
    }
  };

  return {
    isRequesting,
    canRequest,
    cooldownTime,
    cooldownMessage,
    handleRequestTokens,
    isConnected,
    address
  };
}; 