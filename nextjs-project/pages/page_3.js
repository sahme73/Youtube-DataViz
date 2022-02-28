import Link from 'next/link';
import { Fragment } from 'react';
import * as d3 from "d3";
import React, {useState, useRef, useEffect} from 'react';

function PageThree({ final_data }) {
  const [data] = useState(final_data);
  const svgRef = useRef();

  useEffect(() => {
    
   // set the dimensions and margins of the graph
    var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 450 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select(svgRef.current).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

    // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
    var layout = d3.layout.cloud()
    .size([width, height])
    .words(data.map(function(d) { return {text: d}; }))
    .padding(10)
    .fontSize(60)
    .on("end", draw);
    layout.start();

    // This function takes the output of 'layout' above and draw the words
    // Better not to touch it. To change parameters, play with the 'layout' variable above
    function draw(words) {
      svg
      .append("g")
        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
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
      <svg ref={svgRef} ></svg>
      </div>
      <br></br>
    </Fragment>
  );
  
}


// Processes texts and performs data preparation to be passed into
// Partially taken from https://observablehq.com/@d3/word-cloud
function wordCloudProcessor(json_result) {
  
  // var JSON_data = JSON.parse(json_result);
  let items = json_result["items"];
  console.log(items)
  var full_text = "";
  for (let index = 0; index < items.length; index++) {
    full_text = full_text + items[index]["snippet"]["topLevelComment"]["snippet"]["textOriginal"] + " ";
  }

  var stopwords = new Set("i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall".split(","));
  var words = full_text.split(/[\s.]+/g)
  .map(w => w.replace(/^[“‘"\-—()\[\]{}]+/g, ""))
  .map(w => w.replace(/[;:.!?()\[\]{},"'’”\-—]+$/g, ""))
  .map(w => w.replace(/['’]s$/g, ""))
  .map(w => w.substring(0, 30))
  .map(w => w.toLowerCase())
  .filter(w => w && !stopwords.has(w))

  return words;
}

export async function getServerSideProps() {
  const json_data = require('../resource/response.json');
  const final_data = wordCloudProcessor(json_data);

  return {props:{final_data}}

}

export default PageThree;