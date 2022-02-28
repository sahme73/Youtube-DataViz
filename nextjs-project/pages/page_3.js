import Link from 'next/link';
import { Fragment } from 'react';
import * as d3 from "d3";
import React, {useState, useRef, useEffect} from 'react';

function PageThree({ array_2d }) {

  const [data] = useState(array_2d);
  const svgRef = useRef();

  useEffect(() => {
    //container
    var w = 600;
    var h = 500;

    const svg = d3.select(svgRef.current)
      .attr('width', w + 100 + 100)
      .attr('height',h + 100 + 100)
      .attr("transform","translate(" + 100 + "," + 100 + ")")
      .style('overflow', 'visible')
      .style('margin-bottom', '100px');

    //scaling
    const xScale = d3.scaleLinear()
      .domain([0, 100000000])
      .range([0, w]);
    const yScale = d3.scaleLinear()
      .domain([0, 10000000])
      .range([h, 0]);

    //axis
    
    svg.append('g')
      .attr('transform', 'translate(0, ${w})')
      .call(d3.axisBottom(xScale));
      
    svg.append('g')
      .attr('transform', 'translate(0, ${h})')
      .call(d3.axisLeft(yScale));

    //label
      //do later

    //data
    svg.append('g')
      .selectAll("dot")
      .data(data)
      .enter()
      .append('circle')
        .attr('cx', d => xScale(d[0]))
        .attr('cy', d => yScale(d[1]))
        .attr('r', 2);

  }, [data]);

  return (
    <Fragment>
      <h1>
        Page 2
      </h1>
      <Link href='/'>
        Return home!
      </Link>
      <br></br>
      <div className='PageTwo'>
      <svg ref={svgRef} ></svg>
      </div>
      <br></br>
    </Fragment>
  );
  
}

export async function getServerSideProps() {


}

export default PageThree;