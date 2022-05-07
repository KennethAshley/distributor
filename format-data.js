const axios = require('axios').default;
const fs = require('fs');

const { RANKING_ENDPOINT } = require('./constants');

const { addRewards } = require('./utils');

const formatRankings = async () => {
  const { data } = await axios.get(RANKING_ENDPOINT);
  const rankings = data.slice(0, 100);

  const rankingsWithReward = rankings.map(addRewards);

  fs.writeFileSync('./constants/data/rankings.json', JSON.stringify(rankingsWithReward));
};

formatRankings();

