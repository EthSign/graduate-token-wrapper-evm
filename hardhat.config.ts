import "@openzeppelin/hardhat-upgrades";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import { config } from "dotenv";
import "@nomicfoundation/hardhat-foundry";

if (process.env.NODE_ENV !== "PRODUCTION") {
  config();
}

export default {
  contractSizer: {
    strict: true,
  },
  networks: {
    hardhat: {
      chainId: 33133,
      allowUnlimitedContractSize: false,
      loggingEnabled: false,
      zksync: false,
    },
    sepolia: {
      chainId: 11155111,
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_ETH_API}`,
      accounts: [process.env.PRIVATE_KEY],
      saveDeployments: true,
      zksync: false,
    },
    goerli: {
      chainId: 5,
      url: "https://ethereum-goerli.publicnode.com",
      accounts: [process.env.PRIVATE_KEY],
      saveDeployments: true,
      zksync: false,
    },
    scrollAlpha: {
      chainId: 534353,
      url: "https://alpha-rpc.scroll.io/l2",
      accounts: [process.env.PRIVATE_KEY],
      saveDeployments: true,
      zksync: false,
    },
    mantleTestnet: {
      chainId: 5001,
      url: "https://rpc.ankr.com/mantle_testnet",
      accounts: [process.env.PRIVATE_KEY],
      saveDeployments: true,
      zksync: false,
    },
    zkSyncTestnet: {
      chainId: 300,
      url: "https://sepolia.era.zksync.dev/",
      ethNetwork: "https://rpc.ankr.com/eth_sepolia",
      accounts: [process.env.PRIVATE_KEY],
      saveDeployments: true,
      zksync: true,
      verifyURL: "https://explorer.sepolia.era.zksync.dev/contract_verification",
    },
    zkSyncEra: {
      chainId: 324,
      url: "https://mainnet.era.zksync.io",
      ethNetwork: "https://ethereum.publicnode.com",
      accounts: [process.env.PRIVATE_KEY],
      saveDeployments: true,
      zksync: true,
      verifyURL: "https://zksync2-mainnet-explorer.zksync.io/contract_verification",
    },
    bnbMainnet: {
      url: "https://bsc-dataseed.bnbchain.org/",
      chainId: 56,
      // gasPrice: 20000000000,
      accounts: [process.env.PRIVATE_KEY],
      saveDeployments: true,
      zksync: false,
    },
    polygon: {
      url: "https://rpc.ankr.com/polygon",
      chainId: 137,
      loggingEnabled: true,
      accounts: [process.env.PRIVATE_KEY],
      saveDeployments: true,
      zksync: false,
    },
    mumbai: {
      url: "https://rpc.ankr.com/polygon_mumbai",
      chainId: 80001,
      loggingEnabled: true,
      accounts: [process.env.PRIVATE_KEY],
      saveDeployments: true,
      zksync: false,
    },
    ethereum: {
      url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_ETH_API}`,
      chainId: 1,
      loggingEnabled: true,
      accounts: [process.env.PRIVATE_KEY],
      saveDeployments: true,
      zksync: false,
    },
    mantaPacificTestnet: {
      chainId: 3441005,
      url: "https://pacific-rpc.testnet.manta.network/http",
      accounts: [process.env.PRIVATE_KEY],
      saveDeployments: true,
      zksync: false,
    },
    mantaPacific: {
      chainId: 169,
      url: "https://pacific-rpc.manta.network/http",
      accounts: [process.env.PRIVATE_KEY],
      saveDeployments: true,
      zksync: false,
    },
    avaxC: {
      chainId: 43114,
      url: "https://rpc.ankr.com/avalanche",
      accounts: [process.env.PRIVATE_KEY],
      saveDeployments: true,
      zksync: false,
    },
    zetachainTestnet: {
      chainId: 7001,
      url: "https://zetachain-athens-evm.blockpi.network/v1/rpc/public",
      accounts: [process.env.PRIVATE_KEY],
      saveDeployments: true,
      zksync: false,
    },
    zetachain: {
      chainId: 7000,
      url: "https://zetachain-evm.blockpi.network/v1/rpc/public",
      accounts: [process.env.PRIVATE_KEY],
      saveDeployments: true,
      zksync: false,
    },
    scroll: {
      chainId: 534352,
      url: "https://rpc.ankr.com/scroll",
      accounts: [process.env.PRIVATE_KEY],
      saveDeployments: true,
      zksync: false,
    },
    berachainTestnet: {
      chainId: 80084,
      url: "https://bartio.rpc.berachain.com/",
      accounts: [process.env.PRIVATE_KEY],
      saveDeployments: true,
      zksync: false,
    },
    scrollSepolia: {
      chainId: 534351,
      url: "https://sepolia-rpc.scroll.io/",
      accounts: [process.env.PRIVATE_KEY!],
      saveDeployments: true,
      zksync: false,
    },
    base: {
      chainId: 8453,
      url: "https://mainnet.base.org",
      accounts: [process.env.PRIVATE_KEY!],
      saveDeployments: true,
      zksync: false,
    },
    baseSepolia: {
      chainId: 84532,
      url: "https://sepolia.base.org",
      accounts: [process.env.PRIVATE_KEY!],
      saveDeployments: true,
      zksync: false,
    },
    cyber: {
      chainId: 7560,
      url: "https://cyber.alt.technology/",
      accounts: [process.env.PRIVATE_KEY!],
      saveDeployments: true,
      zksync: false,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          metadata: {
            bytecodeHash: "none",
          },
        },
      },
    ],
  },
  zksolc: {
    version: "1.4.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 10,
      },
      metadata: {
        bytecodeHash: "none",
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  sourcify: {
    enabled: false,
  },
  etherscan: {
    apiKey: {
      polygon: process.env.POLYGONSCAN_KEY,
      polygonMumbai: process.env.POLYGONSCAN_KEY,
      mantaPacific: process.env.MANTAPACIFIC_KEY,
      mantaPacificTestnet: process.env.MANTAPACIFIC_TEST_KEY,
      avaxC: process.env.SNOWTRACE_KEY,
      sepolia: process.env.ETHERSCAN_KEY,
      mainnet: process.env.ETHERSCAN_KEY,
      zetachainTestnet: "0",
      zetachain: process.env.ZETASCAN_API_KEY,
      scrollSepolia: process.env.SCROLL_API_KEY!,
      scroll: process.env.SCROLL_API_KEY!,
      base: process.env.BASE_API_KEY!,
      baseSepolia: process.env.BASE_API_KEY!,
      berachainTestnet: process.env.BERA_TEST_API_KEY!,
      cyber: "0",
      bsc: process.env.BSC_API_KEY!,
      berachainCartio: "0",
    },
    customChains: [
      {
        network: "mantaPacific",
        chainId: 169,
        urls: {
          apiURL: "https://manta-pacific.calderaexplorer.xyz/api",
          browserURL: "https://pacific-explorer.manta.network/",
        },
      },
      {
        network: "mantaPacificTestnet",
        chainId: 3441005,
        urls: {
          apiURL: "https://pacific-explorer.testnet.manta.network/api",
          browserURL: "https://pacific-explorer.testnet.manta.network/",
        },
      },
      {
        network: "avaxC",
        chainId: 43114,
        urls: {
          apiURL: "https://api.routescan.io/v2/network/mainnet/evm/43114/etherscan",
          browserURL: "https://avascan.info/",
        },
      },
      {
        network: "zetachainTestnet",
        chainId: 7001,
        urls: {
          apiURL: "https://zetachain-athens-3.blockscout.com/api",
          browserURL: "https://zetachain-athens-3.blockscout.com/",
        },
      },
      {
        network: "zetachain",
        chainId: 7000,
        urls: {
          apiURL: "https://zetachain.blockscout.com/api",
          browserURL: "https://zetachain.blockscout.com/",
        },
      },
      {
        network: "scrollSepolia",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia.scrollscan.com/",
        },
      },
      {
        network: "scroll",
        chainId: 534352,
        urls: {
          apiURL: "https://api.scrollscan.com/api",
          browserURL: "https://scrollscan.com/",
        },
      },
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org",
        },
      },
      {
        network: "berachainTestnet",
        chainId: 80084,
        urls: {
          apiURL: "https://api.routescan.io/v2/network/testnet/evm/80084/etherscan/api",
          browserURL: "https://bartio.beratrail.io/",
        },
      },
      {
        network: "cyber",
        chainId: 7560,
        urls: {
          apiURL: "https://cyber-explorer.alt.technology/api",
          browserURL: "https://cyber-explorer.alt.technology/",
        },
      },
    ],
  },
  docgen: {
    pages: "files",
    exclude: ["libraries", "mock"],
  },
  gasReporter: {
    enabled: false,
  },
};
