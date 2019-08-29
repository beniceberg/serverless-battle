import axios from "axios";
import { awsHeaders, awsUrl, azureUrl, googleUrl } from "./constants";

export const getHighest = array =>
  array.reduce((acc, el) => (el > acc ? el : acc), 0);

export const getChartData = (votingStats, chartAWS, chartGoogle, chartAzure) =>
  votingStats &&
  chartAWS &&
  chartAzure &&
  chartGoogle && [
    [
      "time",
      "Jeff Bezos",
      "Satya Nadella",
      "Sundar Pichai",
      "AWS",
      "Google",
      "Azure"
    ],
    [0, 0, 0, 0, 0, 0, 0],
    [
      10,
      votingStats.jeff.votes_0,
      votingStats.satya.votes_0,
      votingStats.sundar.votes_0,
      chartAWS.chart.votes_0,
      chartGoogle.chart.votes_0,
      chartAzure.chart.votes_0
    ],
    [
      20,
      votingStats.jeff.votes_1,
      votingStats.satya.votes_1,
      votingStats.sundar.votes_1,
      chartAWS.chart.votes_1,
      chartGoogle.chart.votes_1,
      chartAzure.chart.votes_1
    ],
    [
      30,
      votingStats.jeff.votes_2,
      votingStats.satya.votes_2,
      votingStats.sundar.votes_2,
      chartAWS.chart.votes_2,
      chartGoogle.chart.votes_2,
      chartAzure.chart.votes_2
    ],
    [
      40,
      votingStats.jeff.votes_3,
      votingStats.satya.votes_3,
      votingStats.sundar.votes_3,
      chartAWS.chart.votes_3,
      chartGoogle.chart.votes_3,
      chartAzure.chart.votes_3
    ],
    [
      50,
      votingStats.jeff.votes_4,
      votingStats.satya.votes_4,
      votingStats.sundar.votes_4,
      chartAWS.chart.votes_4,
      chartGoogle.chart.votes_4,
      chartAzure.chart.votes_4
    ],
    [
      60,
      votingStats.jeff.votes_5,
      votingStats.satya.votes_5,
      votingStats.sundar.votes_5,
      chartAWS.chart.votes_5,
      chartGoogle.chart.votes_5,
      chartAzure.chart.votes_5
    ]
  ];

const castVoteAmazon = vote => {
  axios
    .post(
      awsUrl,
      {
        VotedFor: vote
      },
      {
        headers: {
          authorization: awsHeaders
        }
      }
    )
    .catch(err => console.error(`Error AWS: ${err}`));
};

const castVoteAzure = vote => {
  axios
    .post(`${azureUrl}cast_votes`, {
      VotedFor: vote
    })
    .catch(err => console.error(`Error Azure: ${err}`));
};

const castVoteGoogle = vote => {
  axios
    .post(`${googleUrl}cast_votes`, {
      VotedFor: vote
    })
    .catch(err => console.error(`Error Google: ${err}`));
};

export const sendVoteToCloud = vote => {
  axios.all([castVoteAmazon(vote), castVoteAzure(vote), castVoteGoogle(vote)]);
};

// export const getAzureResults = (results = {}) => {
//   const azureResults = {
//     total_votes: Math.round(results.total_votes * 0.83),
//     total_time: Math.round(results.total_time * 1.2),
//     total_cost: results.total_cost,
//     chart: results.chart
//   };
//   return azureResults;
// };
