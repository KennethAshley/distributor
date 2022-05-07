const ERC20 = require('./abis/ERC20.json');

const NETWORKS = {
  testnet: 'http://testnet02.vechain.fi.blockorder.net',
  mainnet: 'http://mainnet02.vechain.fi.blockorder.net'
};

module.exports = {
  ABI: {
    ERC20,
  },
  NETWORKS,
};
