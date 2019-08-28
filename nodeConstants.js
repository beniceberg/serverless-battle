require("dotenv").config();

const awsHeaders = {
//   "Content-Type": "application/json",
  AccessKey: process.env.AWS_ACCESS_KEY,
  SecretKey: process.env.AWS_SECRET_KEY
};
const awsUrl = process.env.AWS_API_URL;

const azureHeaders = {
//   "Content-Type": "application/json",
  "Ocp-Apim-Trace": process.env.AZURE_TRACE,
  "Ocp-Apim-Subscription-Key": process.env.AZURE_SUBSCRIPTION_KEY
};
const azureUrl = process.env.AZURE_API_URL;

const googleUrl = process.env.GOOGLE_API_URL;

module.exports = Object.freeze({
  START_TIME: 60,
  VOTE_START_VALUE: 0,
  JEFF_BEZOS: "Jeff Bezos",
  SATYA_NADELLA: "Satya Nadella",
  SUNDAR_PICHAI: "Sundar Pichai",
  AWS_HEADERS: awsHeaders,
  AWS_URL: awsUrl,
  AZURE_HEADERS: azureHeaders,
  AZURE_URL: azureUrl,
  GOOGLE_URL: googleUrl
});
