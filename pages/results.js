/*
 ** https://teqnation-serverless.nl/results
 ** This will show results
 */

import { Component } from "react";
import io from "socket.io-client";
import _isEmpty from "lodash/isEmpty";
import ResultsScreen from "../components/ResultsScreen";

class Results extends Component {
  // Initialize the class
  constructor(props) {
    super(props);

    this.state = {
      resultsAWS: {},
      resultsGoogle: {},
      resultsAzure: {},
      votingStats: {}
    };
  }

  // Runs when the component is inserted into the DOM tree
  componentDidMount() {
    this.socket = io(); // Load the socket.io library
    this.socket.emit("fetch_results"); // Runs "fetch_results" on the middleware server
    this.socket.on("get_results", this.updateResults); // Show the results when the middleware send a response
  }

  componentDidUnMount() {
    // Remove the event listener when the component unmounts, this avoids multiple event listeners at revisit.
    this.socket.off("get_results");
  }

  updateResults = data => {
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

  // Runs before componentDidMount and returns the needed markup
  render() {
    const { resultsAWS, votingStats, resultsAzure, resultsGoogle } = this.state;
    const showResults =
      !_isEmpty(resultsAWS) &&
      // !_isEmpty(resultsAzure) &&
      !_isEmpty(resultsGoogle) &&
      !_isEmpty(votingStats);
    return (
      <div className="main results--enabled voting--disabled">
        {showResults && (
          <ResultsScreen
            votingStats={votingStats}
            resultsAWS={resultsAWS}
            resultsGoogle={resultsGoogle}
            resultsAzure={resultsGoogle}
          />
        )}
      </div>
    );
  }
}

export default Results;
