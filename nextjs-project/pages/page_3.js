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


// Processes texts and performs data preparation to be passed into
// Partially taken from https://observablehq.com/@d3/word-cloud
function wordCloudProcessor(json_result) {
  var JSON_data = JSON.parse(json_result);
  let items = JSON_data["items"];
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


}

export default PageThree;