require('dotenv').config();

const find = require('lodash/find');
const consola = require('consola');

const { ERC20, REWARD_TOKENS, RANKINGS } = require('./constants');
const { getConnex, calculateSplitRewards } = require('./utils');

const distribute = async network => {
  const connex = await getConnex(network);

  const rankings = RANKINGS[network];

  const transferABI = find(ERC20, { name: 'transfer' });

  const transferVeUSDMethod = connex.thor.account(REWARD_TOKENS[network].VEUSD).method(transferABI);
  const transferVexMethod = connex.thor.account(REWARD_TOKENS[network].VEX).method(transferABI);

  for (const ranking of rankings) {
    const { VeUSD, Vex } = calculateSplitRewards(ranking.reward);

    consola.info('--------------------- Transfering ---------------------');
    consola.info(`Address: ${ranking.address}`);
    consola.info(`VeUSD Reward: ${VeUSD.original}`);
    consola.info(`VEX Reward: ${Vex.original}`);
    consola.info(' ');

    const transferVeUSD = transferVeUSDMethod.asClause(ranking.address, VeUSD.formatted);
    const transferVex = transferVexMethod.asClause(ranking.address, Vex.formatted);

    const { txid } = await connex.vendor.sign('tx', [transferVeUSD, transferVex]).request();
    consola.info(`Transaction: ${txid}`);

    await connex.thor.ticker().next();

    const transaction = await connex.thor.transaction(txid).getReceipt();

    if (transaction.reverted) {
      consola.warn('Transaction was reverted');
    } else {
      consola.success('Transaction was successful');
    }
  }

  process.exit(1);
};

distribute("testnet");
