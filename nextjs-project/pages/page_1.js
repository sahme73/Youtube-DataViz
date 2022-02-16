import React, {Component} from 'react'
import * as d3 from "d3";
import { Fragment } from 'react';
import Link from 'next/link';

class BarChart extends Component {
  componentDidMount() {
    this.drawChart();
  }
    
  drawChart() {
    const data = [12, 5, 6, 6, 9, 10];
    
    var w = 700;
    var h = 300;

    const svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("margin-left", 100);
                  
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => h - 10 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green")

    svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d) => d)
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => h - (10 * d) - 3)

  }
        
  render() {
    return (
      <Fragment>
        <h1>Page 1</h1>
        <div id={"#" + this.props.id}></div>
        <Link href='/'>
        Return home!
        </Link>
      </Fragment>
      
    );
  }

}
    
export default BarChart;