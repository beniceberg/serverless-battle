/*
 ** https://teqnation-serverless.nl/admin
 ** Presentor control panel
 **
 */

import { Component } from "react";
import io from "socket.io-client";
import MultiplierButton from "../components/MultiplierButton";
import { multipliers } from "../constants";
import AdminButton from "../components/AdminButton";

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVoting: false,
      showResults: false,
      cleaningDatabase: false,
      appHasResults: false,
      multiplier: 1
    };
  }

  getData = data => {
    const {
      showVoting,
      showResults,
      cleaningDatabase,
      appHasResults,
      multiplier
    } = data;
    const newState = {};
    showVoting !== undefined && Object.assign(newState, { showVoting });
    showResults !== undefined && Object.assign(newState, { showResults });
    cleaningDatabase !== undefined &&
      Object.assign(newState, { cleaningDatabase });
    appHasResults !== undefined && Object.assign(newState, { appHasResults });
    multiplier !== undefined && Object.assign(newState, { multiplier });
    this.setState(newState);
  };

  votingButtonClick = () => {
    this.socket.emit("toggle_show_voting");
  };

  getResultsClick = () => {
    this.socket.emit("fetch_results");
  };

  resultsButtonClick = () => {
    this.socket.emit("toggle_show_results");
  };

  cleanDatabaseClick = () => {
    const { showResults, showVoting } = this.state;
    if (!showResults && !showVoting) {
      this.setState({ cleaningDatabase: true });
      this.socket.emit("reset_app");
    }
  };

  changeMultiplier = multiplier => {
    let multi = multiplier;
    if (multiplier === this.state.multiplier) multi = 1;
    this.setState({
      multiplier: multi
    });
    this.socket.emit("set_multiplier", { multiplier: multi });
  };

  componentDidMount() {
    // Listen to "now", "get_data" coming from socket.io, and toggle the component state accordingly
    this.socket = io();
    this.socket.on("now", this.getData);
    this.socket.on("get_data", this.getData);
    this.socket.on("reset_app", this.getData);
  }

  componentDidUnMount() {
    // Remove the event listener when the component unmounts, this avoids multiple event listeners at revisit.
    // this.socket.off(this.toggleState);
    this.socket.off("now");
    this.socket.off("get_data");
    this.socket.off("reset_app");
  }

  render() {
    const {
      multiplier,
      showResults,
      showVoting,
      cleaningDatabase,
      appHasResults
    } = this.state;
    const disableCleanDB = showResults || showVoting || cleaningDatabase;
    const resetButtonClassName = `${
      disableCleanDB ? "button--disabled" : null
    } ${appHasResults ? "button--app-has-results" : null}`;
    return (
      <div className="buttons">
        <AdminButton
          className={showVoting || cleaningDatabase ? "button--disabled" : null}
          title={`${!showVoting ? "Enable" : "Disable"} Voting`}
          onButtonClick={this.votingButtonClick}
        />
        <AdminButton
          className={
            this.state.gettingResults || cleaningDatabase
              ? "button--disabled"
              : null
          }
          title="Fetch Results"
          onButtonClick={this.getResultsClick}
        />
        <AdminButton
          className={
            showResults || cleaningDatabase ? "button--disabled" : null
          }
          title={`${!showResults ? "Show" : "Hide"} Results`}
          onButtonClick={this.resultsButtonClick}
        />
        <AdminButton
          className={resetButtonClassName}
          title={!cleaningDatabase ? "Reset App" : "Processing"}
          onButtonClick={this.cleanDatabaseClick}
        />
        <div className="multipliers">
          {multipliers.map(multi => (
            <MultiplierButton
              key={multi}
              changeMultiplier={this.changeMultiplier}
              multiplier={multi}
              active={multi !== multiplier}
            />
          ))}
        </div>

        <style jsx>{`
          .buttons {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            padding: 2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            overflow: hidden;
          }
          .multipliers {
            max-width: 320px;
            width: 100%;
            display: flex;
            justify-content: space-between;
          }
          .multipliers button {
            padding-top: 1rem;
            padding-bottom: 1rem;
            width: 31%;
            display: inline-block;
            font-size: smaller;
          }
          .multipliers button span {
            font-size: xx-small;
          }
        `}</style>
      </div>
    );
  }
}

export default AdminPage;
