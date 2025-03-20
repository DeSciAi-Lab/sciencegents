
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
  },
  {
    "inputs": [],
    "name": "getAllRegisteredCapabilityIDs",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "capabilityID",
        "type": "string"
      }
    ],
    "name": "getCapabilityDetails",
    "outputs": [
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "capabilityFeeInETH",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "creator",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "symbol", "type": "string" },
      { "internalType": "uint256", "name": "totalSupply", "type": "uint256" },
      { "internalType": "uint256", "name": "virtualETH", "type": "uint256" },
      { "internalType": "string[]", "name": "selectedCapabilityIDs", "type": "string[]" }
    ],
    "name": "createToken",
    "outputs": [
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "launchFee",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// DSI Token ABI (only the functions we need)
export const dsiTokenABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "account", "type": "address" }
    ],
    "name": "balanceOf",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "owner", "type": "address" },
      { "internalType": "address", "name": "spender", "type": "address" }
    ],
    "name": "allowance",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
