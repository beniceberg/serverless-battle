const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");
const fetch = require("node-fetch");
const axios = require("axios");
const {
  START_TIME,
  VOTE_START_VALUE,
  JEFF_BEZOS,
  SATYA_NADELLA,
  SUNDAR_PICHAI,
  AWS_HEADERS,
  AWS_URL,
  AZURE_HEADERS,
  AZURE_URL,
  GOOGLE_URL
} = require("./nodeConstants");

require("dotenv").config();

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

let port = process.env.PORT;
let clients = 0;
let showVoting = false;
let showResults = false;
let appHasResults = false;
let intervalCount = 0;
let multiplier = 1;
let timer = START_TIME;
let countdown;
let voteUpdates;
const voteChart = {
  jeff: {},
  satya: {},
  sundar: {}
};

// Global scope
let votesAws = VOTE_START_VALUE;
let votesGoogle = VOTE_START_VALUE;
let votesAzure = VOTE_START_VALUE;

// let voteCount = 0;

// const sendVoteToCloud = vote => {
//   // voteCount++;

//   // Shoot
//   axios.all([castVoteAmazon(vote), castVoteAzure(vote), castVoteGoogle(vote)]);
// };

// function castVoteAmazon(vote) {
//   axios.post(
//     AWS_URL,
//     {
//       VotedFor: vote
//     },
//     {
//       headers: {
//         authorization: AWS_HEADERS
//       }
//     }
//   ).catch(err => console.error(`Error AWS: ${err}`));
// }

// function castVoteAzure(vote) {
//   axios.post(
//     `${AZURE_URL}cast_votes`,
//     {
//       VotedFor: vote
//     }
//     // {
//     //   headers: {
//     //     authorization: AZURE_HEADERS
//     //   }
//     // }
//   ).catch(err => console.error(`Error Azure: ${err}`));
// }

// function castVoteGoogle(vote) {
//   axios.post(
//     `${GOOGLE_URL}cast_votes`,
//     {
//       VotedFor: vote
//     }
//   )
//   .catch(err => console.error(`Error Google: ${err}`));
// }

const getResultsAmazon = () => {
  fetch(AWS_URL, {
    method: "GET",
    headers: AWS_HEADERS
  })
    .then(res => res.json())
    .then(amazon => {
      if (amazon) {
        const data = { amazon };
        return io.sockets.emit("get_results", data);
      }
    })
    .catch(err => console.error(`Get Votes AWS Error: ${err}`));
};
const getResultsAzure = () => {
  fetch(`${AZURE_URL}get_votes`, {
    method: "GET"
    // headers: AZURE_HEADERS
  })
    .then(res => res.json())
    .then(azure => {
      if (azure.message !== null) {
        const data = { azure };
        return io.sockets.emit("get_results", data);
      }
    })
    .catch(err => console.error(`Get Votes Azure Error: ${err}`));
};
const getResultsGoogle = () => {
  fetch(`${GOOGLE_URL}get_votes`, {
    method: "GET"
  })
    .then(res => res.json())
    .then(google => {
      if (google) {
        const data = { google };
        return io.sockets.emit("get_results", data);
      }
    })
    .catch(err => console.error(`Get Votes Google Error: ${err}`));
};

const getVotingStats = () => {
  return io.sockets.emit("get_results", {
    votingStats: voteChart
  });
};

const dropDatabase = () => {
  // Drop AWS database
  try {
    fetch(AWS_URL, {
      method: "DELETE",
      headers: AWS_HEADERS
    })
      // .then(res => res.json())
      .then(json => {
        // See if the status code is 200
        if (json.status === 200) {
          console.log("AWS Database dropped");

          // // Reset the app
          // resetApp();

          // // Reset the buttons
          // io.sockets.emit("reset_app", {
          //   showVoting,
          //   showResults,
          //   cleaningDatabase: false,
          //   appHasResults,
          //   multiplier
          // });
        }
      });
  } catch (error) {
    console.error(`Database Drop Error: ${error}`);
  }

  // Drop Azure database
  try {
    fetch(`${AZURE_URL}delete_votes`, {
      method: "DELETE"
      // headers: AZURE_HEADERS
    }).then(json => {
      // See if the status code is 200
      if (json.status === 200) {
        console.log("Azure Database dropped");
      }
    });
  } catch (error) {
    console.error(`Database Drop Error: ${error}`);
  }

  // Drop Google database
  try {
    fetch(`${GOOGLE_URL}delete_votes`, {
      method: "DELETE"
    }).then(json => {
      // See if the status code is 200
      if (json.status === 200) {
        console.log("Googles Database dropped");
      }
    });
  } catch (error) {
    console.error(`Database Drop Error: ${error}`);
  }

  // Reset the app
  resetApp();

  // Reset the buttons
  io.sockets.emit("reset_app", {
    showVoting,
    showResults,
    cleaningDatabase: false,
    appHasResults,
    multiplier
  });
};

function increaseVoteObject() {
  voteChart["jeff"]["votes_" + intervalCount] = votesAws;
  voteChart["satya"]["votes_" + intervalCount] = votesAzure;
  voteChart["sundar"]["votes_" + intervalCount] = votesGoogle;
  intervalCount++;
}

function resetApp() {
  multiplier = 1;
  intervalCount = 0;
  showVoting = false;
  showResults = false;
  appHasResults = false;
  countdown && clearInterval(countdown);
  countdown = undefined;
  voteUpdates && clearInterval(voteUpdates);
  // voteCount = 0;
  timer = START_TIME;
  votesAws = VOTE_START_VALUE;
  votesAzure = VOTE_START_VALUE;
  votesGoogle = VOTE_START_VALUE;
}

io.on("connect", socket => {
  // Increase
  clients++;
  console.log(`A new client has connected. Total: ${clients} clients`);

  // When a client connects set the current state
  socket.emit("now", {
    showVoting,
    showResults,
    multiplier,
    appHasResults
  });

  // When admin toggles the voting button
  socket.on("toggle_show_voting", () => {
    // First time enabling the voting screen
    if (!showVoting) {
      showVoting = true;

      // Get counters for clients and web services
      io.sockets.emit("get_counters", {
        clients,
        counter_aws: votesAws,
        counter_google: votesGoogle,
        counter_microsoft: votesAzure
      });

      // Get vote
      io.sockets.emit("get_data", {
        showVoting,
        timer,
        multiplier
      });

      // Count down every second
      if (!countdown) {
        // Were starting the app count down - set appHasResults to true to show the red button in /admin
        appHasResults = true;

        countdown = setInterval(function() {
          timer--;

          // Update every ten seconds
          if (timer % 10 === 0 && timer !== START_TIME) {
            increaseVoteObject();
          }

          // Auto-end voting when timer hits zero
          if (timer === 0) {
            showVoting = false;
            io.sockets.emit("get_data", { showVoting });

            clearInterval(countdown);
          } else {
            io.sockets.emit("get_data", {
              timer,
              appHasResults
            });
          }
        }, 1000);
      }

      // Update number of votes 10 times every second
      voteUpdates = setInterval(function() {
        // Stop the interval when the count down hits 0
        if (timer === 0) {
          clearInterval(voteUpdates);
        }

        io.sockets.emit("get_counters", {
          clients,
          counter_aws: votesAws,
          counter_google: votesGoogle,
          counter_microsoft: votesAzure
        });
      }, 500);
    } else if (showVoting) {
      // Manually hide the voting screen
      showVoting = false;
      io.sockets.emit("get_data", {
        showVoting,
        timer
      });
    }
  });

  socket.on("toggle_show_results", () => {
    showResults = !showResults;
    io.sockets.emit("get_data", { showResults });
  });

  socket.on("fetch_results", () => {
    getResultsAmazon();
    getResultsAzure();
    getResultsGoogle();
    getVotingStats();
  });

  // When admin toggles the drop db button
  socket.on("reset_app", () => {
    if (!showResults && !showVoting) {
      dropDatabase();
    }
  });

  socket.on("set_multiplier", data => {
    multiplier = data.multiplier;
    io.sockets.emit("get_multiplier", { multiplier });
  });

  // Send voten web services API's
  socket.on("send_vote", data => {
    switch (data.vote) {
      case JEFF_BEZOS:
        votesAws++;
        break;
      case SATYA_NADELLA:
        votesAzure++;
        break;
      case SUNDAR_PICHAI:
        votesGoogle++;
        break;
    }
    // timer && sendVoteToCloud(data.vote);
  });
  socket.on("error", (err) => {
    console.log("Caught flash policy server socket error: ")
    console.log(err.stack)
  });
  // When anyone disconnects
  socket.on("disconnect", () => {
    clients -= 1;
    console.log(`A client has disconnected. Total: ${clients} clients`);
  });
});
setInterval(function(){
  timer && global.gc();
}, 300);

nextApp.prepare().then(() => {
  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
