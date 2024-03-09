import React, { Component } from "react";
import Chart from "react-apexcharts";

import { Card } from "@chakra-ui/react";
import { barChartData, barChartOptions } from "./Variable";

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    this.setState({
      chartData: barChartData,
      chartOptions: barChartOptions,
    });
  }

  render() {
    return (
      <Card
        py="1rem"
        borderRadius={'20px'}
        height={{ sm: "200px" }}
        width="100%"
        bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
        position="relative"
      >
        <Chart
          options={this.state.chartOptions}
          series={this.state.chartData}
          type="bar"
          width="100%"
          height="100%"
        />
      </Card>
    );
  }
}

export default BarChart;
