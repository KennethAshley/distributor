require('dotenv').config()

const find = require('lodash/find');

const { Connex } = require('./utils');
const { ABIS, NETWORKS } = require('./constants');

const rankings = require('./ranking.json');

const distribute = async () => {
  const transferABI = find(ABIS.ERC20, { name: 'transfer' });

  const connex = await Connex(network);

  console.log(connex)

  // console.log("Using wallet address:", wallet.keys[0].address);
  //
  // const net = new SimpleNet(config.network[network].rpcUrl);
  // const driver = await Driver.connect(net, wallet);
  // const connex = new Framework(driver);


};

distribute("testnet");
