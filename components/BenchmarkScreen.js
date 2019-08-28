import { Component } from "react";
import CeoBenchmark from "../components/CeoBenchmark";
import { data } from "../constants";
import { getHighest } from "../utils";

class BenchmarkScreen extends Component {
  render() {
    const { counterAWS, counterGoogle, counterAzure, seconds } = this.props;
    const counterArray = [counterAWS, counterAzure, counterGoogle];

    this.counterTotal = counterAWS + counterAzure + counterGoogle;
    this.highest = getHighest(counterArray);

    return (
      <div className="benchmarkscreen">
        <h1>
          You have <span>{seconds}</span> seconds left.
        </h1>
        {data.map((item, key) => (
          <CeoBenchmark
            key={key}
            logoSrc={item.logoSrc}
            companyName={item.companyName}
            ceoName={item.ceoName}
            ceoSrc={item.ceoSrc}
            count={counterArray[key]}
            totalCount={this.counterTotal}
            highest={this.highest}
          />
        ))}
        <style jsx>{`
          div {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            padding: 30vh 5vw 0 5vw;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: flex-end;
            opacity: 0;
            transition: all 500ms cubic-bezier(0.155, 0.905, 0.17, 1);
            transform: translateX(100px);
          }
          h1 {
            position: absolute;
            top: 0;
            width: 100%;
            left: 0;
            text-align: center;
            padding-top: 10vh;
            font-size: 4vw;
            color: white;
          }
          h1 span {
            font-weight: bold;
          }
          @media only screen and (max-width: 320px) {
            h1 {
              font-size: 22px;
              margin-bottom: 1rem;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default BenchmarkScreen;
