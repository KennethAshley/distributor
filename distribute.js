require('dotenv').config();

const find = require('lodash/find');
const consola = require('consola');
const readlineSync = require('readline-sync');

const { ERC20, REWARD_TOKENS, RANKINGS } = require('./constants');
const { getConnex, calculateSplitRewards } = require('./utils');

const [network] = process.argv.slice(2);

// ensure we have appropriate arguments
if (!network) {
  consola.error("Usage: node distribute [mainnet|testnet]");

  process.exit(1);
} else if (network ==='mainnet') {
  const input = readlineSync.question("Confirm you want to execute this on the MAINNET? (y/n) ");

  if (input != 'y') process.exit(1);
}

const distribute = async () => {
  const connex = await getConnex(network);

  const rankings = RANKINGS[network];

  const transferABI = find(ERC20, { name: 'transfer' });

  const transferVeUSDMethod = connex.thor.account(REWARD_TOKENS[network].VEUSD).method(transferABI);
  const transferVexMethod = connex.thor.account(REWARD_TOKENS[network].VEX).method(transferABI);

  for (const ranking of rankings) {
    const { VeUSD, Vex } = calculateSplitRewards(ranking.reward);
    let receipt = null;

    consola.info('--------------------- Transfering ---------------------');
    consola.info(`Address: ${ranking.address}`);
    consola.info(`VeUSD Reward: ${VeUSD.original}`);
    consola.info(`VEX Reward: ${Vex.original}`);
    consola.info(' ');

    const transferVeUSD = transferVeUSDMethod.asClause(ranking.address, VeUSD.formatted);
    const transferVex = transferVexMethod.asClause(ranking.address, Vex.formatted);

    const { txid } = await connex.vendor.sign('tx', [transferVeUSD, transferVex]).request();
    consola.info(`Transaction: ${txid}`);

    const transaction = await connex.thor.transaction(txid);

    while (!receipt) {
      await connex.thor.ticker().next();
      receipt = await transaction.getReceipt();
    }

    if (receipt.reverted) {
      consola.warn('Transaction was reverted');
    } else {
      consola.success('Transaction was successful');
    }
  }

  process.exit(1);
};

distribute();
