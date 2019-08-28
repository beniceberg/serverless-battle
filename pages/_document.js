/*
 ** Were creating a custom document setup with a dynamic body class.
 ** Changing the body class will make CSS animations
 */
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width, user-scalable=no,maximum-scale=1.0"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Ubuntu:400,700"
            rel="stylesheet"
          />
          <style>{`
          * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
            font-family: Ubuntu, sans-serif;
            user-select: none;
            touch-action: manipulation;
          }

          body {
            transition: all 500ms cubic-bezier(0.155, 0.905, 0.170, 1.000);
            overflow: hidden;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
          }
  
          div.main {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
          }
          
          div.voting--enabled,
          div.voting--disabled.results--enabled {
            background-color: #12303a;
          }

          div.voting--disabled {
            background-color: #fff;
          }

          div.voting--enabled .overlay {
            transform: translateX(-100px);
            opacity: 0;
          }

          div.voting--disabled.results--enabled .overlay {
            transform: translateX(100px);
            opacity: 0;
          }

          div.voting--disabled .overlay {
            transform: translateX(0px);
            opacity: 1;
          }

          div.voting--enabled .votescreen,
          div.voting--enabled .benchmarkscreen {
            transform: translateX(0);
            opacity: 1;
          }

          div.voting--enabled .votescreen .card {
            transform: translateX(0) scale(1)
            opacity: 1;
            transition: all 1000ms cubic-bezier(0.155, 0.905, 0.17, 1);
          }

          div.voting--enabled .votescreen .card:nth-child(2) {
            transition-delay: 0ms;
          }

          div.voting--enabled .votescreen .card:nth-child(3) {
            transition-delay: 80ms;
          }

          div.voting--enabled .votescreen .card:nth-child(4) {
            transition-delay: 160ms;
          }

          div.voting--enabled .votescreen .card .ceo-profile {
            transform: scale(1)
          }

          div.voting--enabled .votescreen .card:nth-child(2) .ceo-profile {
            transition-delay: 100ms;
          }

          div.voting--enabled .votescreen .card:nth-child(3) .ceo-profile {
            transition-delay: 140ms;
          }

          div.voting--enabled .votescreen .card:nth-child(4) .ceo-profile {
            transition-delay: 180ms;
          }

          div.voting--disabled .votescreen .card {
            transform: translateX(25vw) scale(0.97);
            opacity: 0;
          }

          div.voting--disabled .votescreen,
          div.voting--disabled .benchmarkscreen {
            opacity: 0;
          }

          div.voting--disabled.results--enabled .results-screen {
            opacity: 1;
            transform: translateX(0px);
          }

          .results-table .tbody .tr:first-child .td:first-child {
            border-top-left-radius: 2vw;
          }

          .results-table .tbody .tr:first-child .td:last-child {
            border-top-right-radius: 2vw;
          }

          .results-table .tbody .tr:last-child .td:first-child {
            border-bottom-left-radius: 2vw;
          }

          .results-table .tbody .tr:last-child .td:last-child {
            border-bottom-right-radius: 2vw;
          }

          .results-chart-table {
            border-radius: 2vw;
            width: 100%;
            overflow: hidden;
          }

          `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
