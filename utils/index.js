const consola = require('consola');
const ethers = require('ethers');

const { Framework } = require('@vechain/connex-framework');
const { Driver, SimpleNet, SimpleWallet } = require('@vechain/connex-driver');

const { NETWORKS, ENDING_VEX_PRICE } = require('../constants')

const getConnex = async network => {
  const wallet = new SimpleWallet();

  wallet.import(process.env.PRIVATE_KEY);

  consola.info("Using wallet address:", wallet.keys[0].address);

  const net = new SimpleNet(NETWORKS[network]);
  const driver = await Driver.connect(net, wallet);
  const connex = new Framework(driver);

  return connex;
};

const getRewardByRankingPosition = position => {
  if (position === 1) return "6000"
  if (position === 2) return "2650"
  if (position === 3) return "1200"
  if (position === 4) return "800"
  if (position === 5) return "600"
  if (position >= 6 && position <= 10) return "400"
  if (position >= 11 && position <= 25) return "200"
  if (position >= 26 && position <= 50) return "150"
  if (position >= 51 && position <= 100) return "100"

  return 0
};

const addRewards = (ranking, index) => {
  ranking.reward = getRewardByRankingPosition(index + 1);

  return ranking;
};

const calculateSplitRewards = reward => {
  const amountOfVeUSD = (reward / 2).toString();
  const amountOfVex = Math.floor((reward / 2) / ENDING_VEX_PRICE).toString();

  return {
    VeUSD: {
      formatted: ethers.utils.parseEther(amountOfVeUSD).toString(),
      original: amountOfVeUSD
    },
    Vex: {
      formatted: ethers.utils.parseEther(amountOfVex).toString(),
      original: amountOfVex
    },
  }
};

module.exports = {
  addRewards,
  calculateSplitRewards,
  getConnex,
};
