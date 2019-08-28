import { Component } from "react";
import _isEmpty from "lodash/isEmpty";
import ms from "ms";
import numeral from "numeral";
import ResultsRow from "../components/ResultsRow";
import { resultsTableLogosArray } from "../constants";

class ResultsTable extends Component {
  renderTableRows(resultsArray, logosArray) {
    return resultsArray.map((item, index) => (
      <ResultsRow
        key={index}
        index={index}
        logoSrc={logosArray[index]}
        executionTimeAverage={ms(
          (item.total_time / item.total_votes).toFixed(2)
        )}
        executionTimeTotal={ms(item.total_time)}
        executionCostsPerRequest={numeral(
          item.total_cost / item.total_votes
        ).format("$0,0.000000")}
        executionCostsTotal={numeral(item.total_cost).format("$0,0.00")}
        votes={item.total_votes}
      />
    ));
  }
  render() {
    const { tableAWS, tableGoogle, tableAzure } = this.props;

    const resultsArray = [tableAWS, tableGoogle, tableAzure];
    
    return (
      <div className="results-table">
        <table className="table">
          <thead className="thead">
            <tr className="tr">
              <td />
              <td className="td">Total Votes</td>
              <td className="td">Execution Time Average</td>
              <td className="td">Execution Time Total</td>
              <td className="td">Process Costs Per Request</td>
              <td className="td">Process Costs Total</td>
            </tr>
          </thead>
          <tbody className="tbody">
            {this.renderTableRows(resultsArray, resultsTableLogosArray)}
          </tbody>
        </table>
        <style jsx>{`
          .results-table {
            width: 100%;
            padding: 0 2vw;
            border-radius: 2vw;
            padding-bottom: 1rem;
          }

          .results-table .table {
            width: 100%;
            border-collapse: collapse;
          }

          .results-table .thead {
            width: 100%;
            color: white;
            font-size: 2vw;
          }

          .results-table .thead .td {
            text-align: center;
            padding: 0 2vw 2vw 2vw;
          }

          .results-table .tbody .td {
            padding: 0 0.5vw;
            background-color: white;
            font-size: 2vw;
            text-align: center;
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

          .results-table .tbody .td img {
            height: 10vh;
          }
        `}</style>
      </div>
    );
  }
}

export default ResultsTable;
