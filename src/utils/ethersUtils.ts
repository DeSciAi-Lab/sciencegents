
import { ethers } from "ethers";

/**
 * Safely formats a big number string to ETH
 * @param value BigNumber string
 * @returns Formatted ETH value or 0 if conversion fails
 */
export const safeFormatEther = (value: string): string => {
  try {
    if (!value) return "0";
    return ethers.utils.formatEther(value);
  } catch (error) {
    console.error("Error formatting big number to ether:", error);
    return "0";
  }
};

/**
 * Safely formats a big number string to ETH as a number
 * @param value BigNumber string
 * @returns Formatted ETH value as number or 0 if conversion fails
 */
export const safeFormatEtherAsNumber = (value: string): number => {
  try {
    if (!value) return 0;
    const formatted = ethers.utils.formatEther(value);
    return parseFloat(formatted);
  } catch (error) {
    console.error("Error formatting ETH value as number:", error, "Value:", value);
    return 0;
  }
};

/**
 * Safely converts a big number string to a number
 * Useful for non-eth values like token amounts
 * @param value BigNumber string
 * @returns Number or 0 if conversion fails
 */
export const safeBigNumberToNumber = (value: string): number => {
  try {
    if (!value) return 0;
    
    // For very large numbers, don't try to convert to a JavaScript number
    if (value.length > 15) {
      console.warn("BigNumber too large for safe conversion to number:", value);
      // Return max safe integer to avoid overflow
      return Number.MAX_SAFE_INTEGER;
    }
    
    const bn = ethers.BigNumber.from(value);
    // Check if the number is too large to be safely converted to a JavaScript number
    if (bn.gt(ethers.constants.MaxUint256.div(ethers.BigNumber.from(2)))) {
      console.warn("BigNumber too large for safe conversion to number:", value);
      return Number.MAX_SAFE_INTEGER;
    }
    return bn.toNumber();
  } catch (error) {
    console.error("Error converting BigNumber to number:", error, "Value:", value);
    return 0;
  }
};

/**
 * Safely converts a BigNumber string to a formatted string
 * @param value BigNumber string
 * @returns Formatted string representation or "0" if conversion fails
 */
export const safeBigNumberToString = (value: string): string => {
  try {
    if (!value) return "0";
    const bn = ethers.BigNumber.from(value);
    return bn.toString();
  } catch (error) {
    console.error("Error converting BigNumber to string:", error, "Value:", value);
    return "0";
  }
};
