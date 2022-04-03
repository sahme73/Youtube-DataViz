import Link from 'next/link';
import { Fragment } from 'react';
import { wordCloudProcessor } from '../resource/tools'
import * as d3 from "d3";
import * as cloud from 'd3-cloud';
import React, {useState, useRef, useEffect} from 'react';
import styles from '../styles/DefaultPage.module.css';


// function PageThree({ final_data }) {
function PageThree() {
  const svgRef = useRef();
  const [videoId, setVideoID] = useState('');
  const [submit, setSubmit] = useState(false);
  const [initialSubmit, setInitialSubmit] = useState(false);
  const [dataJson, setJsonData] = useState({})

  function onChangeVideoID(event) {
    console.log(event.target.value)
    setVideoID(event.target.value);
  }

  function onSubmitVideoID(event) {
    retrieveJsonData();
    
  }

  async function retrieveJsonData() {
    const api_key = process.env.YOUTUBE_KEY; // use your own API key
    var final_data = {};
    try {
      let response = await fetch('https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId='+ videoId +'&key='+api_key);
      let json = await response.json();
      console.log(json)
      final_data = wordCloudProcessor(json);
      setJsonData(final_data);
      setInitialSubmit(true);
      setSubmit(!submit);
    } catch(error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (initialSubmit) {
      // set the dimensions and margins of the graph
      var margin = {top: 10, right: 10, bottom: 10, left: 10},
      width = 900 - margin.left - margin.right,
      height = 900 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      var svg = d3.select(svgRef.current).html("").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

      // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
      var layout = cloud()
      .size([width, height])
      .words(dataJson.map(function(d) { return {text: d.word, size:d.size}; }))
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
    }

  }, [submit]);

  return (
    <Fragment>
      <h1 className={styles.title}>Page 3 : Word Cloud</h1>
          <button className={styles.button}>
            <span>
              <Link href='/'>
                Return home!
              </Link>
            </span>  
          </button>
      <br></br>
      <div className='PageThree'>
          <label>
            Video ID:
            <input type="text" name="videoid" value={videoId} onChange={onChangeVideoID}/>
          </label>
          <input type="submit" value="Submit" onClick={onSubmitVideoID}/>
        <svg ref={svgRef} width="900" height = "900"/>
      </div>
      <br></br>
    </Fragment>
  );
  
}

// export async function getServerSideProps() {
//   var key_value = process.env.YOUTUBE_KEY // use your own API key
//   console.log(key_value)
// //   var final_data = {}
// //   let response = await fetch('https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=p0Qu37bIzRI'+'&key='+key)
// //   let json = await response.json()
// //   final_data = wordCloudProcessor(json);

// //   // const json_data = require('../resource/response.json');
// //   // const final_data = wordCloudProcessor(json_data);

//   return {props:{key}}

// }

export default PageThree;