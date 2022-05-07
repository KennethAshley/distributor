const ethers = require('ethers');

const ERC20 = require('./abis/ERC20.json');
const rankings = require('./data/rankings.json');

// Trading ending date April 17, 2022 16:00:00
const ENDING_VEX_PRICE = 0.912460;

const RANKING_ENDPOINT = "https://dev-api.vexchange.io/v1/trading-competition/ranking";

const NETWORKS = {
  testnet: 'http://testnet02.vechain.fi.blockorder.net',
  mainnet: 'http://mainnet02.vechain.fi.blockorder.net'
};

const REWARD_TOKENS = {
  testnet: {
    VEX: '0x0000000000000000000000000000456e65726779', // VTHO
    VEUSD: '0x0000000000000000000000000000456e65726779' // VTHO
  },
  mainnet: {
    VEUSD: '0x4e17357053da4b473e2daa2c65c2c949545724b8',
    VEX: '0x0bd802635eb9ceb3fcbe60470d2857b86841aab6'
  },
};

const RANKINGS = {
  mainnet: rankings,
  testnet: [
    {
      address: "0x65680bbc18ffcb96e54bF3F081B01145D8A152E5",
      points: "391109.137047",
      reward: 11,
    },
    {
      address: "0x0Ad2fA31e73Db2E36Bff7c3Fd7CEffcB7E4A710c",
      points: "260055.752947",
      reward: 5,
    },
    {
      address: "0x08D37E1B411267A3ec7785662a887445A1bb1783",
      points: "174932.993847",
      reward: 2,
    }
  ]
};


module.exports = {
  ENDING_VEX_PRICE,
  ERC20,
  NETWORKS,
  RANKINGS,
  RANKING_ENDPOINT,
  REWARD_TOKENS,
};
