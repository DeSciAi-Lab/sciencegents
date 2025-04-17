// ScienceGents Contract Configuration
export const contractConfig = {
  // Contract addresses
  addresses: {
    ScienceGentsFactory: "0x2A4FA31F3a97e7B49219f8B097a25EE337CaB20d",
    ScienceGentsSwap: "0xf0e6d293A46DFf9A0f556f78B72d843fCA112364",
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
  },
  {
    "inputs": [],
    "name": "getTokenCount",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "offset", "type": "uint256" },
      { "internalType": "uint256", "name": "limit", "type": "uint256" }
    ],
    "name": "getTokensWithPagination",
    "outputs": [
      { "internalType": "address[]", "name": "tokens", "type": "address[]" },
      { "internalType": "uint256", "name": "total", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "token", "type": "address" }
    ],
    "name": "getTokenDetails",
    "outputs": [
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "symbol", "type": "string" },
      { "internalType": "uint256", "name": "totalSupply", "type": "uint256" },
      { "internalType": "address", "name": "creator", "type": "address" },
      { "internalType": "bool", "name": "tradingEnabled", "type": "bool" },
      { "internalType": "bool", "name": "isMigrated", "type": "bool" },
      { "internalType": "uint256", "name": "capabilityCount", "type": "uint256" },
      { "internalType": "uint256", "name": "adminLockAmount", "type": "uint256" },
      { "internalType": "uint256", "name": "adminLockRemainingTime", "type": "uint256" },
      { "internalType": "bool", "name": "adminLockIsUnlocked", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "token", "type": "address" }
    ],
    "name": "getTokenAssignedCapabilities",
    "outputs": [
      { "internalType": "string[]", "name": "", "type": "string[]" }
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
