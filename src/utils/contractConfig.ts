
// ScienceGents Contract Configuration
export const contractConfig = {
  // Contract addresses
  addresses: {
    ScienceGentsFactory: "0x6cef989316a8924141C71fB262FCfeAb449B8D74",
    ScienceGentsSwap: "0xeb4B7382BAd358c401D57194e5b0d5494c3f0309",
    DSIToken: "0x6e03251F1e6577c269fF6073001f86Bd29D405c1"
  },
  // Network details
  network: {
    chainId: "0xaa36a7", // Sepolia testnet
    chainName: "Sepolia Test Network",
    nativeCurrency: {
      name: "Sepolia Ether",
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: ["https://sepolia.infura.io/v3/"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"]
  }
};

// ScienceGentsFactory ABI (only the functions we need)
export const factoryABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "capabilityID", "type": "string" },
      { "internalType": "string", "name": "description", "type": "string" },
      { "internalType": "uint256", "name": "capabilityFeeInETH", "type": "uint256" },
      { "internalType": "address", "name": "capabilityCreator", "type": "address" }
    ],
    "name": "registerGlobalCapability",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
