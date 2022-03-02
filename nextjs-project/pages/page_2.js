import Link from 'next/link';
import { Fragment } from 'react';
import * as d3 from "d3";
import React, {useState, useRef, useEffect} from 'react';

function PageTwo({ array_2d }) {

  const [data] = useState(array_2d);
  const svgRef = useRef();

  useEffect(() => {
    //container
    var w = 800;
    var h = 600;
    var spacing = 120;

    const svg = d3.select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style("background", "grey")
      .style('overflow', 'visible')
      .style('margin-top', '0px')
      .append('g')
        .attr('transform', 'translate(' + spacing/2 + ',' + spacing/2 + ')');

    //scaling
    const xScale = d3.scaleLinear()
      .domain([d3.min(data, function(d) {
        return d[0];
      }) - 1, d3.max(data, function(d) {
        return d[0];
      }) + 1])
      .range([0, w - spacing]);
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) {
        return d[1];
      })])
      .range([h - spacing, 0]);

    //axis
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    svg.append('g')
      .attr('transform', 'translate(0,' + (h - spacing) + ')')
      .call(xAxis);
    svg.append('g')
      .call(yAxis);

    //label
      //do later

    //data
    svg.selectAll()
      .data(data)
      .enter()
      .append('circle')
        .attr('cx', d => xScale(d[0]))
        .attr('cy', d => yScale(d[1]))
        .attr('r', 2)
        .style('fill', 'red');

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
      <svg ref={svgRef}></svg>
      </div>
      <br></br>
    </Fragment>
  );
  
}

export async function getServerSideProps() {

  // TO-DO: Create an interface for picking months, Visualize the data sets

  // shortened data:
  //const res = await fetch('https://projectdatasetfor222.s3.us-east-2.amazonaws.com/split_data/aug_2020%20-%20Copy.json?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCR9Utw27OUSxf3LgQoqAXbVq3FTpMphgzjvsXnW0D2vgIgHoKU9OAXFyeiLAk4GsjS%2Fy2IzpWR6ism4bXjxYVTzuQq7QIIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw3MzUyOTA2Mzk1ODMiDIw3zgr%2FwAoEdQw5oCrBAttkSgBeKbQRlZQ2jq%2FDROwt7ZM6fSJFJsEz231l0MHnz2IXfcsPWhbpIGjVCAfwkM67B%2FfFgoDacr6odqjNGLPJYm6ydXmecL0pvVmRC6swId0AqdzO%2Fe69jdNh7gXSNeVr2e7CbsKfOamhHZwx7GG3DwHftOp5OhprOETdsHBcWQ7y7CvgDNdeWDOo%2BDp2H9iYS%2FdtI3ckVGjYd1%2F1uucs0LFnC84M8RfUhAHMnqHAIOYQNk90hefle9jx9R7RyvXMsvEpm41JQzdY9ptJ8XWqPg8OdEiGDWA8DymGWPBwhjyJWRxPzW1iOoZ%2BSDZkLnT5BnQCheMb9dI%2Few646V3hTTwBQJHBs7h5DRz017O3Ps%2Frm8SCJ2kw7p2QsDCFxhyj9SlUDV4zOefvSunBTQoj8hIbpafzgqbnovSK5m7HVDDf54KQBjqzArkzLdXdsFRGqCoATTMvNvR9i8deyKfVP%2FQD4Jr%2B8ulWZIjRUIAdYLbcuioL1AE98phJ9ZFyYwCso0WNwpJWul4okSiqUya7GhW6hRNFgLdd%2BiI%2FejiBgVqzH8YFgq0USGswO6c%2Bivms%2F5oQO8p58H3Jh8yE3VHWXlP5XEEkte2FOLgAhg7QIH07u86RSCDctK1Ued8T9k%2BYOtmdRqR8d6FR0%2Ba7LkYwKN5TIJS%2BBVeABFoJrAIjqOsyvCjCtQWQjJG%2FSbKSIxtxbBVJHtxX4ba0lqOK4irnx4GnFi%2B24M2wp9Qd%2FaRcqmoVRd5RqLnVaTBM9%2FEQX%2FE6sLuM1JtCobMEaDlLB2FKlOdiGgINBJe0QRz4%2FWQrLPSIbLXLH2YrmnXDwXQnRFk4z0jAvVsCEi96kak%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220207T080211Z&X-Amz-SignedHeaders=host&X-Amz-Expires=21599&X-Amz-Credential=ASIA2WMV4YTPYROLI5PN%2F20220207%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Signature=ba60f48b0458d2a86f56ff7a3a32395133a6d42c26db99e553f5bcde455f6932')

  // full data for August 2020:
  //const res = await fetch('https://projectdatasetfor222.s3.us-east-2.amazonaws.com/split_data/aug_2020.json?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLWVhc3QtMiJHMEUCIQDXAHpWoGU6Xk1MqwNTbeglZMUtuIjv0mas3nl4vVoH6gIgTwZZPkjqAi0YDsLOElwaEdafk01Fm3t9XX1uRLaoBdgq7QIIqv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw3MzUyOTA2Mzk1ODMiDNoZcBrOe3aP%2FI%2BHhCrBAgHNKFoOsCVUwSAn%2BUQaLdfaLGibQL%2FTxgLd5SQyO2q7%2FQXSo%2BUuqD%2FpbTP7ddyRRswMd1OwfvrpqdmavmkVhf7pKnmbHshMkEePFIQhFNTERk%2BTHt21YTQggZUN0dcqP5xvtmfGF94Qy3QxI9x9evWASIrjlPzDHVZBaGSR%2B%2FjWodZesdUxBU8NVEr%2Fep3rW3HFmECBnFcvfqH%2FGOHKPHg%2BGjVWV%2BbWcdK2PXltx1IZV5yrBmaTDjS9%2BECKq441QQh6KTpxA9ltmOapIE%2Fpj%2BNIRUlbXcGFZqDOd1jQg6KOaxMGOxotbUqua6RXSZScXzoWnyHFoiXqrtNb9payMW%2FKNLrY%2BNEyt%2F3U8RIOZVsR4wNaRk3GgpPf87CPDj5Wyg9OJ5E3zBk5wcWOK93Xr5%2FEIIw9oXewsalhK9U9KiLPJzC6nOSQBjqzApfyprCZpUQzGoKUFCDzJl%2FGPPhRW%2FdMon0w0VtaqWL8Gb57r1ao7kymwHetgyV1pSUqEHv7rIiW1YrwnCVvFs6jzjlqx2kVkcWwn%2FGakZZRqGGBeqNQIRSSG%2BY0LUbqsS0z0iyDwm74q3tSeD2e%2Bhau2Bv6U6AyxJtMDeYa%2B0izCJ2q83oSRbHEHJAruTTtHwaclWlDcmq3cz1FaC9inQfMXrHF83rEmV0jZ2OHURkKW071dSkM3LwAVho7LZvkFXqeDT3wXkR87x26wc7xuu3NdIM6BO%2B6drhcENgPtgy40VJqc0FHtmp2jPyt1rdZgMlBwMdfcV%2Bb%2FYj2bFY6fYZvdoVgWcfcTWP8W%2F8VOvYtMKCG5Qu9%2Bwb%2FsnsBzaMUVKT86Hhk0aChmqPl2ZsF3CHs1L8%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220225T171851Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Credential=ASIA2WMV4YTPWASYJZ6J%2F20220225%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Signature=42072121dbf5767a5b9f2cd8ab33383d192414096373ce60fb9b1ff12aa56188');

  //const data = await res.json(); // JSON format of all videos trending in August 2020

  //temporary fix for data link problem:
  const data = require('../resource/aug_2020.json');

  const array_2d = [[]]; // array of (x,y) where x is views and y is likes

  for (let i = 0; i < data.length; i++) {
    array_2d[i] = [data[i]["view_count"],data[i]["likes"]];
  }

  return {props: {array_2d},} //returns the 2d array to the client's page
}

export default PageTwo;