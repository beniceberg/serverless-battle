import Ceo from "./Ceo";
import { data } from "../constants";

class VoteScreen extends React.Component {
  render() {
    const {
      seconds,
      counterAWS,
      counterGoogle,
      counterAzure,
      sendVote
    } = this.props;
    const counterArray = [counterAWS, counterAzure, counterGoogle];
    return (
      <div className="votescreen">
        <h1>
          You have <span>{seconds}</span> seconds left.
          <br />
          Vote as often as you can!
        </h1>
        {data.map((item, key) => (
          <Ceo
            key={key}
            logoSrc={item.logoSrc}
            companyName={item.companyName}
            ceoName={item.ceoName}
            ceoSrc={item.ceoSrc}
            ceoOverlaySrc={item.ceoOverlaySrc}
            count={counterArray[key]}
            doClick={sendVote}
          />
        ))}
        <style jsx>{`
          div {
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
            transform: translateX(100px);
            transition: all 500ms cubic-bezier(0.155, 0.905, 0.17, 1);
            z-index: 1;
          }
          h1 {
            color: white;
            font-weight: 300;
            font-size: 25px;
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

export default VoteScreen;
