
import { http, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { contractConfig } from '@/utils/contractConfig';

// Convert the chain ID from hex string to number
const targetChainId = parseInt(contractConfig.network.chainId, 16);

// Select the appropriate chain based on the target chain ID
const targetChain = targetChainId === 11155111 ? sepolia : mainnet;

// Create wagmi config
export const config = createConfig({
  chains: [targetChain],
  connectors: [
    injected(),
  ],
  transports: {
    // Explicitly define transports for each possible chain ID
    // This ensures the Record<1 | 11155111, Transport> type is satisfied
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
