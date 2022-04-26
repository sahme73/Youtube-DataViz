import React, {Component} from 'react'
import * as d3 from "d3";
import { Fragment } from 'react';
import Link from 'next/link';
import styles from '../styles/DefaultPage.module.css';

class BarChart extends Component {
  componentDidMount() {
    this.drawChart();
  }
    
  drawChart() {
    const data = [12, 5, 6, 6, 9, 10];
    
    var w = 415;
    var h = 300;

    const svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background", "#d9d9d9")
    .style("margin-left", 0);
                  
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
        <h1 className={styles.title}>Page 1 : D3 Bar Graph Example</h1>
          <button className={styles.button}>
            <span>
              <Link href='/'>
                Return home!
              </Link>
            </span>  
          </button>
        <div id={"#" + this.props.id}></div>
      </Fragment>
      
    );
  }

}
    
export default BarChart;