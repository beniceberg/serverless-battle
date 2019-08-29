import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const {
  awsApiUrl,
  azureApiUrl,
  googleApiUrl,
  awsAccessKey,
  awsSecretKey
} = publicRuntimeConfig;

export const data = [
  {
    logoSrc: "/static/img/logo-amazon-aws.svg",
    companyName: "Amazon AWS",
    ceoName: "Jeff Bezos",
    ceoSrc: "/static/img/jeff-bezos.png",
    ceoOverlaySrc: "/static/img/jeff-bezos-smiling.png"
  },
  {
    logoSrc: "/static/img/logo-microsoft-azure.svg",
    companyName: "Microsoft Azure",
    ceoName: "Satya Nadella",
    ceoSrc: "/static/img/satya-nadella.png",
    ceoOverlaySrc: "/static/img/satya-nadella-smiling.png"
  },
  {
    logoSrc: "/static/img/logo-google-cloud-services.png",
    companyName: "Google Cloud Services",
    ceoName: "Sundar Pichai",
    ceoSrc: "/static/img/sundar-pichai.png",
    ceoOverlaySrc: "/static/img/sundar-pichai-smiling.png"
  }
];

export const chartOptions = {
  hAxis: {
    title: "Time",
    viewWindow: { min: 0, max: 60 }
  },
  vAxis: {
    title: "Vote count",
    viewWindow: { min: 0, max: null }
  },
  series: {
    0: {
      color: "#F8981C",
      lineDashStyle: [4, 4]
    },
    1: {
      color: "#EA4335",
      lineDashStyle: [4, 4]
    },
    2: {
      color: "#0089D6",
      lineDashStyle: [4, 4]
    },
    3: {
      color: "#F8981C"
    },
    4: {
      color: "#EA4335"
    },
    5: {
      color: "#0089D6"
    }
  }
};

export const multipliers = [15, 50, 100, 200];

export const resultsTableLogosArray = [
  "/static/img/icon-amazon-aws.svg",
  "/static/img/icon-google-cloud-services.svg",
  "/static/img/icon-microsoft-azure.svg"
];

export const awsHeaders = {
  // "Content-Type": "application/json",
  AccessKey: awsAccessKey,
  SecretKey: awsSecretKey
};

export const awsUrl = awsApiUrl;

export const azureUrl = azureApiUrl;

export const googleUrl = googleApiUrl;
