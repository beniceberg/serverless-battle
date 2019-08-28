import { Component } from "react";
import _isEmpty from "lodash/isEmpty";
import ResultsTable from "../components/ResultsTable";
import ResultsChart from "../components/ResultsChart";

class ResultsScreen extends Component {
  render() {
    const { votingStats, resultsAWS, resultsGoogle, resultsAzure } = this.props;
    return !_isEmpty(resultsAWS) && !_isEmpty(resultsGoogle) ? (
      <div className="results-screen">
        <ResultsTable
          tableAWS={resultsAWS}
          tableGoogle={resultsGoogle}
          tableAzure={resultsAzure}
        />
        <ResultsChart
          chartAWS={resultsAWS}
          chartGoogle={resultsGoogle}
          chartAzure={resultsAzure}
          votingStats={votingStats}
        />
        <style jsx>{`
          .results-screen {
            padding: 3vh 6vw;
            opacity: 0;
            transform: translateX(-100px);
            transition: all 500ms cubic-bezier(0.155, 0.905, 0.17, 1);
            z-index: 3;
          }
        `}</style>
      </div>
    ) : null;
  }
}

export default ResultsScreen;
