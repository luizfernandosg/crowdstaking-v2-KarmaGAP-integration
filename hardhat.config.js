require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const apiKey = process.env.HARDHAT_ALCHEMY_ID;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      chainId: 31337,
      forking: {
        url: `https://polygon-mainnet.g.alchemy.com/v2/${apiKey}`,
        blockNumber: 47649933,
      },
      mining: {
        auto: true,
        interval: 2000,
      },
    },
  },
  solidity: "0.8.19",
};
