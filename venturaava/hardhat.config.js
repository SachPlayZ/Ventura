require("@matterlabs/hardhat-zksync-solc");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  zksolc: {
    version: "1.3.9",
    compilerSource: "binary",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  etherscan: {
    apiKey: {
      snowtrace: "snowtrace", // apiKey is not required, just set a placeholder
    },
  },
  networks: {
    snowtrace: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: [
        "909d01f16308cb9eca55165db96850084ab145756a6bfec9d55788c609f0c703",
      ],
    },
  },
  customChains: [
    {
      network: "snowtrace",
      chainId: 43113,
      urls: {
        apiURL:
          "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan",
        browserURL: "https://avalanche.testnet.localhost:8080",
      },
    },
  ],
  paths: {
    artifacts: "./artifacts-zk",
    cache: "./cache-zk",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
