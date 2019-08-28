module.exports = {
  publicRuntimeConfig: {
    awsApiUrl: process.env.AWS_API_URL,
    azureApiUrl: process.env.AZURE_API_URL,
    googleApiUrl: process.env.GOOGLE_API_URL,
    awsAccessKey: process.env.AWS_ACCESS_KEY,
    awsSecretKey: process.env.AWS_SECRET_KEY,
    azureTrace: process.env.AZURE_TRACE,
    azureSubscriptionKey: process.env.AZURE_SUBSCRIPTION_KEY
  }
};
