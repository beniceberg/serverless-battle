/*
 ** https://teqnation-serverless.nl/benchmarks
 ** This will show a recap / animated table with the serverless platform statistics
 */

import { Component } from "react";
import io from "socket.io-client";
import _isEmpty from "lodash/isEmpty";
import Overlay from "../components/Overlay";
import BenchmarkScreen from "../components/BenchmarkScreen";
import ResultsScreen from "../components/ResultsScreen";
import { getAzureResults } from "../utils";

class Benchmarks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showVoting: false,
      showResults: false,
      counterAWS: 0,
      counterGoogle: 0,
      counterAzure: 0,
      resultsAWS: {},
      resultsGoogle: {},
      resultsAzure: {},
      votingStats: {}
    };
  }

  componentDidMount() {
    this.socket = io();
    this.socket.on("now", this.getData);
    this.socket.on("get_data", this.getData);
    this.socket.on("get_results", this.getResults);
    this.socket.on("get_counters", this.getCounts);
  }

  componentDidUnMount() {
    // Remove the event listener when the component unmounts, this avoids multiple event listeners at revisit.
    this.socket.off("now");
    this.socket.off("get_data");
    this.socket.off("get_results");
    this.socket.off("get_counters");
  }

  getCounts = data => {
    this.setState({
      counterAWS: data.counter_aws,
      counterGoogle: data.counter_google,
      counterAzure: data.counter_microsoft
    });
  };

  getResults = data => {
    const { amazon, google, azure, votingStats } = data;
    const newState = {};
    // Data from Amazon, Azure, Google and all votes
    amazon !== undefined && Object.assign(newState, { resultsAWS: amazon });
    google !== undefined && Object.assign(newState, { resultsGoogle: google });
    azure !== undefined && Object.assign(newState, { resultsAzure: azure });
    votingStats !== undefined && Object.assign(newState, { votingStats });
    this.setState(newState);
    amazon && console.log("AWS results: ", amazon);
    azure && console.log("Azure results: ", azure);
    google && console.log("Google results: ", google);
    votingStats && console.log("voting results: ", votingStats);
  };

  getData = data => {
    const { showVoting, showResults, timer } = data;
    const newState = {};
    showVoting !== undefined && Object.assign(newState, { showVoting });
    showResults !== undefined && Object.assign(newState, { showResults });
    timer !== undefined && Object.assign(newState, { timer });
    this.setState(newState);
  };

  render() {
    const {
      counterAWS,
      counterGoogle,
      counterAzure,
      timer,
      resultsAWS,
      resultsAzure,
      resultsGoogle,
      showResults,
      showVoting,
      votingStats
    } = this.state;

    let bodyClassName = showVoting ? "voting--enabled" : "voting--disabled";
    if (showResults) bodyClassName += " results--enabled";
    else bodyClassName += " results--disabled";

    const shouldShowResults =
      !_isEmpty(resultsAWS) &&
      // !_isEmpty(resultsAzure) &&
      !_isEmpty(resultsGoogle) &&
      !_isEmpty(votingStats);
    return (
      <div className={`main ${bodyClassName}`}>
        <Overlay />
        <BenchmarkScreen
          seconds={timer}
          counterAWS={counterAWS}
          counterAzure={counterAzure}
          counterGoogle={counterGoogle}
        />
        {shouldShowResults && (
          <ResultsScreen
            votingStats={votingStats}
            resultsAWS={resultsAWS}
            resultsGoogle={resultsGoogle}
            resultsAzure={getAzureResults(resultsGoogle)}
          />
        )}
      </div>
    );
  }
}

export default Benchmarks;
