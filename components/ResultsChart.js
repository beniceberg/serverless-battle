import { Component } from "react";
import { Chart } from "react-google-charts";

import { getChartData } from "../utils";
import { chartOptions } from "../constants";

class ResultsChart extends Component {
  render() {
    const { votingStats, chartAWS, chartGoogle, chartAzure } = this.props;
    const chartData = getChartData(
      votingStats,
      chartAWS,
      chartGoogle,
      chartAzure
    );
    return chartAWS && chartAzure && chartGoogle ? (
      <div className="results-chart">
        <Chart
          className="results-chart-table"
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={chartData}
          options={chartOptions}
          width="100%"
          height="400px"
          legendToggle
        />
        <style jsx>{`
          .results-chart {
            padding: 0 2vw;
          }
        `}</style>
      </div>
    ) : null;
  }
}

export default ResultsChart;
