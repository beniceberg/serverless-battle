/*
 ** https://teqnation-serverless.nl/
 ** This is where the people in the audience will go when they scan the QR code
 ** or when they directly visit teqnation-serverless.nl/
 */

import { Component } from "react";
import Overlay from "../components/Overlay";
import VoteScreen from "../components/VoteScreen";
import io from "socket.io-client";
import { sendVoteToCloud } from "../utils";

class IndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showVoting: false,
      showResults: false,
      counterAWS: 0,
      counterGoogle: 0,
      counterAzure: 0,
      multiplier: 1
    };
  }

  componentDidMount() {
    this.socket = io();
    this.socket.on("now", this.getData);
    this.socket.on("get_data", this.getData);
    this.socket.on("get_counters", this.getCounts);
    this.socket.on("get_multiplier", this.getData);
  }

  componentDidUnMount() {
    this.socket.off("now");
    this.socket.off("get_data");
    this.socket.off("get_counters");
    this.socket.off("get_multiplier");
  }

  getCounts = data => {
    this.setState({
      counterAWS: data.counter_aws,
      counterGoogle: data.counter_google,
      counterAzure: data.counter_microsoft
    });
  };

  getData = data => {
    const { showVoting, timer, multiplier } = data;
    const newState = {};
    showVoting !== undefined && Object.assign(newState, { showVoting });
    timer !== undefined && Object.assign(newState, { timer });
    multiplier !== undefined && Object.assign(newState, { multiplier });
    this.setState(newState);
  };

  sendVote = ceoName => {
    const { showVoting, timer, multiplier } = this.state;
    for (let i = 0; i < multiplier; i++) {
      setTimeout(() => {
        if (showVoting && timer) {
          sendVoteToCloud(ceoName);
          this.socket.emit("send_vote", {
            vote: ceoName
          });
        }
      }, 2);
    }
  };

  render() {
    const {
      timer,
      counterAWS,
      counterGoogle,
      counterAzure,
      showVoting
    } = this.state;
    const bodyClassName =
      showVoting && timer ? "voting--enabled" : "voting--disabled";
    return (
      <div className={`main ${bodyClassName}`}>
        <Overlay />
        <VoteScreen
          seconds={timer}
          counterAWS={counterAWS}
          counterAzure={counterAzure}
          counterGoogle={counterGoogle}
          sendVote={this.sendVote}
        />
      </div>
    );
  }
}

export default IndexPage;
