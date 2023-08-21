import { CONFIG } from "../config";

const NEXT_PUBLIC_INFURA_PROJECT_ID =
  process.env.NEXT_PUBLIC_INFURA_PROJECT_ID || "";
const NEXT_PUBLIC_INFURA_PROJECT_SECRET =
  process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET || "";

const { INFURA_ID, IPFS_ENDPOINT, BOX_ENDPOINT, NETWORK_CONFIG } = CONFIG;

export { BOX_ENDPOINT, INFURA_ID, IPFS_ENDPOINT };

export const INVOICE_TYPES = {
  Escrow: "escrow",
  Instant: "instant",
};

export const chainIds = {
  xdai: 100,
  mainnet: 1,
  ropsten: 3,
  rinkeby: 4,
  goerli: 5,
  kovan: 42,
  matic: 137,
  hardhat: 31137,
  linea: 59144,
  linea_testnet: 59140,
  mumbai: 80001,
} as const;

export type Chain = keyof typeof chainIds;
export type ChainId = (typeof chainIds)[keyof typeof chainIds];

export const hexChainIds = {
  xdai: "0x64",
  mainnet: "0x01",
  ropsten: "0x03",
  rinkeby: "0x04",
  goerli: "0x05",
  kovan: "0x2a",
  hardhat: "0x7a69",
  matic: "0x89",
  mumbai: "0x13881",
  linea: "0xe6f",
  linea_testnet: "0xe6f",
};

export const networkLabels = {
  100: "xDai",
  1: "Ethereum",
  3: "Ropsten",
  4: "Rinkeby",
  5: "Goerli",
  42: "Kovan",
  56: "BSC",
  77: "Sokol",
  137: "Matic",
  31137: "Hardhat",
  59144: "Linea",
  59140: "Linea Testnet",
  80001: "Mumbai",
};

export const networkNames = {
  1: "Ethereum Mainnet",
  3: "Ropsten Testnet",
  4: "Rinkeby Testnet",
  5: "Goerli Testnet",
  42: "Kovan Testnet",
  100: "Gnosis Chain",
  137: "Polygon Mainnet",
  31137: "Hardhat",
  59144: "Linea",
  59140: "Linea Testnet",
  80001: "Mumbai Testnet",
};

export const rpcUrls = {
  1: `https://mainnet.infura.io/v3/${INFURA_ID}`,
  3: `https://ropsten.infura.io/v3/${INFURA_ID}`,
  4: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
  5: `https://goerli.infura.io/v3/${INFURA_ID}`,
  42: `https://kovan.infura.io/v3/${INFURA_ID}`,
  100: "https://rpc.gnosischain.com/",
  137: `https://polygon-mainnet.infura.io/v3/${INFURA_ID}`,
  80001: `https://polygon-mumbai.infura.io/v3/${INFURA_ID}`,
  31137: "http://localhost:8545",
  59144: "https://rpc.linea.exchange",
  59140: "https://rpc.testnet.linea.exchange",
};

export const explorerUrls = {
  1: "https://etherscan.io",
  3: "https://ropsten.etherscan.io",
  4: "https://rinkeby.etherscan.io",
  5: "https://goerli.etherscan.io/",
  42: "https://kovan.etherscan.io",
  100: "https://blockscout.com/poa/xdai",
  137: "https://polygonscan.com",
  80001: "https://mumbai.polygonscan.com",
  31137: "",
  59144: "https://explorer.linea.exchange",
  59140: "https://explorer.testnet.linea.exchange",
};

export const nativeSymbols = {
  1: "ETH",
  3: "ETH",
  4: "ETH",
  5: "ETH",
  42: "ETH",
  100: "XDAI",
  137: "MATIC",
  31137: "ETH",
  80001: "MATIC",
  59144: "ETH",
  59140: "ETH",
};

export const graphUrls = {
  1: `https://api.thegraph.com/subgraphs/name/${NETWORK_CONFIG[1].SUBGRAPH}`,
  3: "",
  4: `https://api.thegraph.com/subgraphs/name/${NETWORK_CONFIG[4].SUBGRAPH}`,
  5: `https://api.thegraph.com/subgraphs/name/${NETWORK_CONFIG[5].SUBGRAPH}`,
  42: "",
  100: `https://api.thegraph.com/subgraphs/name/${NETWORK_CONFIG[100].SUBGRAPH}`,
  137: `https://api.thegraph.com/subgraphs/name/${NETWORK_CONFIG[137].SUBGRAPH}`,
  31137: `https://api.thegraph.com/subgraphs/name/${NETWORK_CONFIG[31137].SUBGRAPH}`,
  59144: "",
  59140: "",
  80001: `https://api.thegraph.com/subgraphs/name/${NETWORK_CONFIG[80001].SUBGRAPH}`,
};

export const resolvers = {
  1: Object.keys(NETWORK_CONFIG[1].RESOLVERS),
  3: [] as string[],
  4: Object.keys(NETWORK_CONFIG[4].RESOLVERS),
  5: Object.keys(NETWORK_CONFIG[5].RESOLVERS),
  42: [] as string[],
  100: Object.keys(NETWORK_CONFIG[100].RESOLVERS),
  137: Object.keys(NETWORK_CONFIG[137].RESOLVERS),
  31137: Object.keys(NETWORK_CONFIG[31137].RESOLVERS),
  80001: Object.keys(NETWORK_CONFIG[80001].RESOLVERS),
  59144: [] as string[],
  59140: [] as string[],
};

const emptyResolvers = {} as {
  [x: string]: {
    name: string;
    logoUrl: string;
    termsUrl: string;
  };
};

export const resolverInfo = {
  1: NETWORK_CONFIG[1].RESOLVERS,
  3: emptyResolvers,
  4: NETWORK_CONFIG[4].RESOLVERS,
  5: NETWORK_CONFIG[5].RESOLVERS,
  42: emptyResolvers,
  100: NETWORK_CONFIG[100].RESOLVERS,
  137: NETWORK_CONFIG[137].RESOLVERS,
  31137: NETWORK_CONFIG[31137].RESOLVERS,
  59144: emptyResolvers,
  59140: emptyResolvers,
  80001: NETWORK_CONFIG[80001].RESOLVERS,
};

export const wrappedNativeToken = {
  1: NETWORK_CONFIG[1].WRAPPED_NATIVE_TOKEN,
  3: "WETH",
  4: NETWORK_CONFIG[4].WRAPPED_NATIVE_TOKEN,
  5: NETWORK_CONFIG[5].WRAPPED_NATIVE_TOKEN,
  42: "",
  100: NETWORK_CONFIG[100].WRAPPED_NATIVE_TOKEN,
  137: NETWORK_CONFIG[137].WRAPPED_NATIVE_TOKEN,
  31137: NETWORK_CONFIG[31137].WRAPPED_NATIVE_TOKEN,
  80001: NETWORK_CONFIG[80001].WRAPPED_NATIVE_TOKEN,
  59144: "WETH",
  59140: "WETH",
};

export const invoiceFactory = {
  1: NETWORK_CONFIG[1].INVOICE_FACTORY,
  3: "",
  4: NETWORK_CONFIG[4].INVOICE_FACTORY,
  5: NETWORK_CONFIG[5].INVOICE_FACTORY,
  42: "",
  100: NETWORK_CONFIG[100].INVOICE_FACTORY,
  137: NETWORK_CONFIG[137].INVOICE_FACTORY,
  31137: NETWORK_CONFIG[31137].INVOICE_FACTORY,
  80001: NETWORK_CONFIG[80001].INVOICE_FACTORY,
  59144: "",
  59140: "",
};

export const SUPPORTED_NETWORKS = Object.keys(NETWORK_CONFIG).map(
  (n) => Number(n) as ChainId
);

export const INVOICE_VERSION = "smart-invoice-v0";

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export const ESCROW_STEPS = {
  1: {
    step_title: "Project Details",
    step_details: [],
    next: "payment details",
  },
  2: {
    step_title: "Payment Details",
    step_details: [],
    next: "set payment amounts",
  },
  3: {
    step_title: "Payment Chunks",
    step_details: [],
    next: "confirmation",
  },
  4: {
    step_title: "Confirmation",
    step_details: [],
    next: "create invoice",
  },
};

export const INSTANT_STEPS = {
  1: {
    step_title: "Project Details",
    step_details: [],
    next: "payment details",
  },
  2: {
    step_title: "Payment Details",
    step_details: [],
    next: "confirm invoice",
  },
  3: {
    step_title: "Confirmation",
    step_details: [],
    next: "create invoice",
  },
};

export const INFURA_AUTH =
  "Basic " +
  Buffer.from(
    `${NEXT_PUBLIC_INFURA_PROJECT_ID}` +
      ":" +
      `${NEXT_PUBLIC_INFURA_PROJECT_SECRET}`
  ).toString("base64");
