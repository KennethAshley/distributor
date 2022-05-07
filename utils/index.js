const { Framework } = require('@vechain/connex-framework');
const { Driver, SimpleNet, SimpleWallet } = require('@vechain/connex-driver');

const { NETWORKS } = require('../constants')

const Connex = async network => {
  const wallet = new SimpleWallet();

  wallet.import(process.env.PRIVATE_KEY);

  console.log("Using wallet address:", wallet.keys[0].address);

  const net = new SimpleNet();
  const driver = await Driver.connect(NETWORKS[network], wallet);
  const connex = new Framework(driver);

  return connex;
};

module.exports = {
  Connex
}
