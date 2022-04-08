import Link from 'next/link';
import { Fragment } from 'react';
import * as d3 from 'd3';
import React, {useState, useRef, useEffect} from 'react';
import styles from '../styles/DefaultPage.module.css';
import { useRouter } from 'next/router';

function PageTwo({ array_4d }) {

  const [data] = useState(array_4d);
  const svgRef = useRef();

  const router = useRouter();

  useEffect(() => {
    //container creation
    var w = 1200;
    var h = 900;
    var spacing = 60;

    var svg = d3.select(svgRef.current);

    svg
      .attr('width', w)
      .attr('height', h)
      .style("background", "#d9d9d9")
      .style('cursor', 'crosshair');

    //scaling both x and y to match dataset
    const xScale = d3.scaleLinear()
      .domain([d3.min(data, function(d) {
        return d[0];
      }) - 1, d3.max(data, function(d) {
        return d[0];
      }) + 1])
      .range([0, w - 200]);

    xScale.nice();

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) {
        return d[1];
      })])
      .range([h - spacing, 60]);

    yScale.nice();

    //axis adjusted to match scale
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    var gX = svg.append('g')
      .attr('transform', 'translate(120,' + (h - spacing) + ')')
      .call(xAxis);
    
    var gY = svg.append('g')
      .attr('transform', 'translate(' + 120 + ', 0)')
      .call(yAxis);

    //axis label creation
    svg.append('text')
      .attr('x', (w - spacing)/2)
      .attr('y', h - spacing)
      .attr('dy', '2.25em')
      .style('text-anchor', 'middle')
      .text('Views');

      svg.append('text')
      .attr('x', -(h - spacing)/2)
      .attr('y', 0)
      .attr('dy', '3.25em')
      .attr('transform', 'rotate(-90)')
      .style('text-anchor', 'middle')
      .text('Likes');


    //dataset entered into graph as points
    const points = svg.append('g');

    var radius = 1.5

    points
      .selectAll('circle')
      .data(data)
      .join('circle')
        .attr('cx', d => xScale(d[0]))
        .attr('cy', d => yScale(d[1]))
        .attr('r', radius)
        .style('fill', 'red')
        .style('opacity', '0.65')
        .attr('transform', 'translate(120, 0)');

    //zoom controller
    const zoomBehaivor = d3.zoom()
      .scaleExtent([0.5, 6400])
      .translateExtent([[0, 0], [w, h]])
      .extent([[0, 0], [w, h]])
      .on('zoom', (e) => {
        points
          .attr('transform', e.transform);

        points
          .selectAll('circle')
          .attr('r', function(d) {

          if (e.transform.k < 1) {
            return 1.5;
          }

          if (e.transform.k > 6000) {
            return 0.01;
          }

          if (e.transform.k > 600) {
            return 0.004;
          }
          
          if (e.transform.k > 200) {
            return 0.008;
          } else if (e.transform.k > 100) {
            return 0.02;
          } else {
            return Math.pow(radius, (-1 * (e.transform.k / 10)));
          }

          });
          console.log("Scale factor: " + e.transform.k);
          console.log("Radius of point: " + Math.pow(radius, (-1 * (e.transform.k / 10))));
        
        gX.call(xAxis.scale(e.transform.rescaleX(xScale)));
        gY.call(yAxis.scale(e.transform.rescaleY(yScale)));
      });

    svg
      .call(zoomBehaivor);

    //hover controller
    var div = d3.select('body')
      .append('div')
      .style('position', 'absolute');

    points.selectAll('circle')
      .on("mouseover", function(event, d) {
        
        var link_string = "https://youtu.be/" + d[2]; //the link of the point's video
        var title_string = d[3]; //the title of the point's video

        //console.log("OVER")
        if (d[3] === '') console.log("video deleted");

        div.html('<a href="' + link_string + '" target="_blank">' + title_string + '</a>')
          .style('left', (event.pageX + 8) + 'px')  
          .style('top', (event.pageY - 32) + 'px')
          .transition().duration(100)
          .style('opacity', '.9');

      })
      .on("mousemove", function(event, d) {
        
        var link_string = "https://youtu.be/" + d[2]; //the link of the point's video
        var title_string = d[3]; //the title of the point's video

        if (d[3] === '') console.log("video deleted");

        div.html('<a href="' + link_string + '" target="_blank">' + title_string + '</a>')
          .style('left', (event.pageX + 8) + 'px')  
          .style('top', (event.pageY - 32) + 'px')
          .transition().duration(100)
          .style('opacity', '.9');

      })
      .on('click', function(event, d) {

        console.log('clicking');

        var link_string = "https://youtu.be/" + d[2]; //the link of the point's video

        router.push(link_string);

      })
      .on('mouseout', function(event, d) {
        div.transition()
          .duration(1280)
          .style('opacity', '0');

        setTimeout(() => {
          div.html("");
        }, 1280);

      });

  }, [data]);

  return (
    <Fragment>
      <h1 className={styles.title}>Page 2 : Views vs Likes (August 2020)</h1>
        <Link href='/'>
          <button className={styles.button}>
            <span>
              Return Home!
            </span>  
          </button>
        </Link>
      <br></br>
      <div>
        <svg ref={svgRef}/>
      </div>
      <br></br>
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

  const array_4d = [[[[]]]]; // array of (x,y) where x is views and y is likes

  for (let i = 0; i < data.length; i++) {
    array_4d[i] = [data[i]["view_count"],data[i]["likes"],data[i]["video_id"],data[i]["title"]];
  }

  return {props: {array_4d},} //returns the 2d array to the client's page
}

export default PageTwo;