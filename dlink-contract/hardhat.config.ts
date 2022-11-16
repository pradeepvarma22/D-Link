import { HardhatUserConfig } from "hardhat/config";

import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import "dotenv/config";

const MUMBAI_ALCHEMY_API_KEY_URL: string = process.env.MUMBAI_ALCHEMY_API_KEY_URL ? process.env.MUMBAI_ALCHEMY_API_KEY_URL: "" ;
const METAMASK_PRIVATE_KEY: string = process.env.METAMASK_PRIVATE_KEY ? process.env.METAMASK_PRIVATE_KEY: "";

const config: HardhatUserConfig = {
  networks: {
    mumbai: {
      url: MUMBAI_ALCHEMY_API_KEY_URL,
      accounts: [METAMASK_PRIVATE_KEY]
    },
  },
  solidity: {
    version: "0.8.17"
  },
  paths: {
    artifacts: "./data/src/artifacts",
    cache: "./data/src/cache"
  },
  typechain: {
    outDir: "./data/src/types"
  },
  etherscan: {
    apiKey: process.env.ETHER_SCAN_API_KEY!
  }
};

export default config;
