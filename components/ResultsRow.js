import { Component } from "react";

class ResultsRow extends Component {
  render() {
    const {
      logoSrc,
      executionTimeAverage,
      executionTimeTotal,
      executionCostsPerRequest,
      executionCostsTotal,
      votes
    } = this.props;

    return (
      <tr className="tr">
        <td className="td">
          <img src={logoSrc && logoSrc} />
        </td>
        <td className="td">{votes && votes}</td>
        <td className="td">
          {executionTimeAverage && executionTimeAverage + "ms"}
        </td>
        <td className="td">{executionTimeTotal && executionTimeTotal}</td>
        <td className="td">
          {executionCostsPerRequest && executionCostsPerRequest}
        </td>
        <td className="td">{executionCostsTotal && executionCostsTotal}</td>
        <style jsx>{`
          .td {
            padding: 0 0.5vw;
            background-color: white;
            font-size: 2vw;
            text-align: center;
          }

          .td img {
            height: 10vh;
          }
        `}</style>
      </tr>
    );
  }
}

export default ResultsRow;
