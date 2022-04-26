import Link from 'next/link';
import { Fragment } from 'react';
import { processVideos, processVideoCategories } from '../resource/tools'
import * as d3 from "d3";
import React, {useState, useRef, useEffect} from 'react';
import styles from '../styles/DefaultPage.module.css';
import { axisLeft, leastIndex } from 'd3';

function PageFour({ final_data, categories_json }) {
  const [data] = useState(final_data);
  const [categories] = useState(processVideoCategories(categories_json))
  const svgRef = useRef();

  useEffect(() => {
    // Copyright 2021 Observable, Inc.
    // Released under the ISC license.
    // https://observablehq.com/@d3/bubble-chart
    function BubbleChart(data, {
      name = ([x]) => x, // alias for label
      label = name, // given d in data, returns text to display on the bubble
      value = ([, y]) => y, // given d in data, returns a quantitative size
      group, // given d in data, returns a categorical value for color
      title, // given d in data, returns text to show on hover
      link, // given a node d, its link (if any)
      linkTarget = "_blank", // the target attribute for links, if any
      width = 900, // outer width, in pixels
      height = width, // outer height, in pixels
      padding = 3, // padding between circles
      margin = 10, // default margins
      marginTop = margin, // top margin, in pixels
      marginRight = margin, // right margin, in pixels
      marginBottom = margin, // bottom margin, in pixels
      marginLeft = margin, // left margin, in pixels
      groups, // array of group names (the domain of the color scale)
      colors = d3.schemeTableau10, // an array of colors (for groups)
      fill = "#ccc", // a static fill color, if no group channel is specified
      fillOpacity = 0.7, // the fill opacity of the bubbles
      stroke, // a static stroke around the bubbles
      strokeWidth, // the stroke width around the bubbles, if any
      strokeOpacity, // the stroke opacity around the bubbles, if any
    } = {}) {
      // Compute the values.
      const D = d3.map(data, d => d);
      const V = d3.map(data, value);
      const G = group == null ? null : d3.map(data, group);
      const I = d3.range(V.length).filter(i => V[i] > 0);
    
      // Unique the groups.
      if (G && groups === undefined) groups = I.map(i => G[i]);
      groups = G && new d3.InternSet(groups);
    
      // Construct scales.
      const color = G && d3.scaleOrdinal(groups, colors);
    
      // Compute labels and titles.
      const L = label == null ? null : d3.map(data, label);
      const T = title === undefined ? L : title == null ? null : d3.map(data, title);
    
      // Compute layout: create a 1-deep hierarchy, and pack it.
      const root = d3.pack()
          .size([width - marginLeft - marginRight, height - marginTop - marginBottom])
          .padding(padding)
        (d3.hierarchy({children: I})
          .sum(i => V[i]));
    
      const svg = d3.select(svgRef.current).append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("viewBox", [-marginLeft, -marginTop, width, height])
          .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
          .attr("fill", "currentColor")
          .attr("font-size", 10)
          .attr("font-family", "sans-serif")
          .attr("text-anchor", "middle");
    
      const leaf = svg.selectAll("a")
        .data(root.leaves())
        .join("a")
          .attr("xlink:href", link == null ? null : (d, i) => link(D[d.data], i, data))
          .attr("target", link == null ? null : linkTarget)
          .attr("transform", d => `translate(${d.x},${d.y})`);
    
      leaf.append("circle")
          .attr("stroke", stroke)
          .attr("stroke-width", strokeWidth)
          .attr("stroke-opacity", strokeOpacity)
          .attr("fill", G ? d => color(G[d.data]) : fill == null ? "none" : fill)
          .attr("fill-opacity", fillOpacity)
          .attr("r", d => d.r);
    
      if (T) leaf.append("title")
          .text(d => T[d.data]);
    
      if (L) {
        // A unique identifier for clip paths (to avoid conflicts).
        const uid = `O-${Math.random().toString(16).slice(2)}`;
    
        leaf.append("clipPath")
            .attr("id", d => `${uid}-clip-${d.data}`)
          .append("circle")
            .attr("r", d => d.r);
             
        leaf.append("text")
            .attr("clip-path", d => `url(${new URL(`#${uid}-clip-${d.data}`, location)})`)
          .selectAll("tspan")
          .data(d => `${L[d.data]}`.split(/\n/g))
          .join("tspan")
            .attr("x", 0)
            .attr("y", (d, i, D) => `${i - D.length / 2 + 0.85}em`)
            .attr("fill-opacity", (d, i, D) => i === D.length - 1 ? 0.7 : null)
            .text(d => d);
        var tooltip = d3.select(svgRef.current)
          .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "black")
            .style("border-radius", "5px")
            .style("padding", "10px")
            .style("color", "white")
      }
    
      return Object.assign(svg.node(), {scales: {color}});
    }

    let chart = BubbleChart(data, {
      label: d => [d.title, d.viewCount.toLocaleString("en")].join("\n"),
      value: d => d.viewCount,
      link: d => d.videoID,
      group: d => d.id,
      title: d => `${d.title}\nViews: ${d.viewCount.toLocaleString("en")} \nCategory: ${categories[d.id]}`,
      width: 1152
    })


  }, [data]);

  return (
    <Fragment>
      <h1 className={styles.title}>Page 4 : Bubble Chart</h1>
          <button className={styles.button}>
            <span>
              <Link href='/'>
                Return home!
              </Link>
            </span>  
          </button>
      <br></br>
      <div className='PageFour'>
      <svg ref={svgRef} width="1400" height = "1400"/>
      </div>
      <br></br>
    </Fragment>
  );
  
}

export async function getServerSideProps() {
  
  const api_key = process.env.YOUTUBE_KEY;
  let categories = await fetch('https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key='+ api_key);
  let categories_json = await categories.json();
  let response = await fetch('https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=100&regionCode=US&key='+ api_key);
  let json = await response.json();
  let items = json.items; 
  let i = 0;
  let nextPageToken = json.nextPageToken;
  while (nextPageToken && i < 3) {
    response = await fetch('https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=100&pageToken=' + nextPageToken + '&regionCode=US&key='+ api_key);
    json = await response.json();
    items = items.concat(json.items);
    nextPageToken = json.nextPageToken;
    i+=1;
  }

  const final_data = processVideos(items);

  return {props:{final_data, categories_json}}

}

export default PageFour;