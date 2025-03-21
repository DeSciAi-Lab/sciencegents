
// Track pending transactions to prevent duplicates
export const pendingTransactions = new Set<string>();

/**
 * Clears all pending transactions
 * Used when resetting state or handling errors
 */
export const clearPendingTransactions = (): void => {
  pendingTransactions.clear();
};

/**
 * Checks if a transaction is pending
 * @param key Unique transaction key
 * @returns Boolean indicating if transaction is pending
 */
export const isTransactionPending = (key: string): boolean => {
  return pendingTransactions.has(key);
};

/**
 * Adds a transaction to the pending set
 * @param key Unique transaction key
 */
export const addPendingTransaction = (key: string): void => {
  pendingTransactions.add(key);
};

/**
 * Removes a transaction from the pending set
 * @param key Unique transaction key
 */
export const removePendingTransaction = (key: string): void => {
  pendingTransactions.delete(key);
};
