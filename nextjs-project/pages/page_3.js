import Link from 'next/link';
import { Fragment } from 'react';
import { wordCloudProcessor } from '../resource/tools'
import * as d3 from "d3";
import * as cloud from 'd3-cloud';
import React, {useState, useRef, useEffect} from 'react';

function PageThree({ final_data }) {
  const [data] = useState(final_data);
  const svgRef = useRef();

  useEffect(() => {
    
   // set the dimensions and margins of the graph
    var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 900 - margin.left - margin.right,
    height = 900 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select(svgRef.current).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

    // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
    var layout = cloud()
    .size([width, height])
    .words(data.map(function(d) { return {text: d.word, size:d.size}; }))
    .padding(5)
    .fontSize(function(d) { return d.size *8; })
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .on("end", draw);
    layout.start();

    // This function takes the output of 'layout' above and draw the words
    // Better not to touch it. To change parameters, play with the 'layout' variable above
    function draw(words) {
      svg
      .append("g")
        .attr("transform", "translate(" + layout.size()[0]/2 + "," + layout.size()[1]/2 + ")")
        .selectAll("text")
          .data(words)
        .enter().append("text")
          .style("font-size", function(d) { return d.size + "px"; })
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function(d) { return d.text; });
      }

  }, [data]);

  return (
    <Fragment>
      <h1>
        Page 3
      </h1>
      <Link href='/'>
        Return home!
      </Link>
      <br></br>
      <div className='PageThree'>
      <svg ref={svgRef} width="900" height = "900"/>
      </div>
      <br></br>
    </Fragment>
  );
  
}

export async function getServerSideProps() {
  const json_data = require('../resource/response.json');
  const final_data = wordCloudProcessor(json_data);

  return {props:{final_data}}

}

export default PageThree;