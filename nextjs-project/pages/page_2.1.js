import Link from 'next/link';
import { Fragment } from 'react';
import * as d3 from 'd3';
import React, {useState, useRef, useEffect} from 'react';
import styles from '../styles/DefaultPage.module.css';
import { useRouter } from 'next/router';
import cookie from "js-cookie";

function PageTwo({ output_data, plotname, }) {

  const [data] = useState(output_data);
  const svgRef = useRef();

  const router = useRouter();

  //forces page to refresh props on server
  const refreshData = (n) => {
    //alert(n);
    cookie.set("token", n, {expires: 1 / 24});
    window.location.reload();
    //router.replace(router.asPath);
  }

  //empties graph
  const clearData = () => {
    cookie.remove("token");
    window.location.reload();
  }

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
      <h1 className={styles.title}>Page 2 : Views vs Likes {plotname}</h1>
        <Link href='/'>
          <button className={styles.button}>
            <span>
              Return Home!
            </span>  
          </button>
        </Link>

      <br></br><br></br>

        <button className={styles.button} onClick={() => refreshData("0")}>
            <span>
                August 2020
            </span>
        </button>

        <button className={styles.button} onClick={() => refreshData("1")}>
            <span>
                September 2020
            </span>
        </button>

        <button className={styles.button} onClick={() => refreshData("2")}>
            <span>
                October 2020
            </span>
        </button>

        <button className={styles.button} onClick={() => refreshData("3")}>
            <span>
                November 2020
            </span>
        </button>

        <button className={styles.button} onClick={() => refreshData("4")}>
            <span>
                December 2020
            </span>
        </button>

      <br></br><br></br>
        
        <button className={styles.button} onClick={() => refreshData("5")}>
            <span>
                January 2021
            </span>
        </button>

        <button className={styles.button} onClick={() => refreshData("6")}>
            <span>
                February 2021
            </span>
        </button>
        
        <button className={styles.button} onClick={() => refreshData("7")}>
            <span>
                March 2021
            </span>
        </button>
        
        <button className={styles.button} onClick={() => refreshData("8")}>
            <span>
                April 2021
            </span>
        </button>
        
        <button className={styles.button} onClick={() => refreshData("9")}>
            <span>
                May 2021
            </span>
        </button>
        
        <button className={styles.button} onClick={() => refreshData("10")}>
            <span>
                June 2021
            </span>
        </button>
        
        <button className={styles.button} onClick={() => refreshData("11")}>
            <span>
                July 2021
            </span>
        </button>
        
        <button className={styles.button} onClick={() => refreshData("12")}>
            <span>
                August 2021
            </span>
        </button>
        
        <button className={styles.button} onClick={() => refreshData("13")}>
            <span>
                September 2021
            </span>
        </button>
        
        <button className={styles.button} onClick={() => refreshData("14")}>
            <span>
                October 2021
            </span>
        </button>
        
        <button className={styles.button} onClick={() => refreshData("15")}>
            <span>
                November 2021
            </span>
        </button>
        
        <button className={styles.button} onClick={() => refreshData("16")}>
            <span>
                December 2021
            </span>
        </button>

        <br></br><br></br>
        
        <button className={styles.button} onClick={() => refreshData("17")}>
            <span>
                January 2022
            </span>
        </button>
        
        <button className={styles.button} onClick={() => refreshData("18")}>
            <span>
                February 2022
            </span>
        </button>

      <br></br><br></br>
        
        <button className={styles.button} onClick={() => clearData()}>
            <span>
                Clear Data
            </span>
        </button>

      <br></br><br></br>

      <div>
        <svg ref={svgRef}/>
      </div>
      <br></br><br></br><br></br>
    </Fragment>
  );
}

export const getServerSideProps = async ( {req, res} ) => {

  //console.log(req.cookies.token);

  /*
    Note to self (Safeer - 4/7/2022): 
        -Rewrite this entire if-elseif block using a map [key: cookie#, value: url]
        -Clean and update data using an external tool
  */

  if (req.cookies.token == 0) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/aug_2020.json?alt=media&token=f7c52dc2-d5f5-408d-8550-f757f34a362f');
    var plotname = "(August 2020)";
  } else if (req.cookies.token == 1) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/sep_2020.json?alt=media&token=8b66c5b1-edd2-4ff9-a913-dfee1c7b7e52');
    var plotname = "(September 2020)";
  } else if (req.cookies.token == 2) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/oct_2020.json?alt=media&token=488a269c-b5aa-472c-8baf-be99b9f6df63');
    var plotname = "(October 2020)";
  } else if (req.cookies.token == 3) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/nov_2020.json?alt=media&token=ca96504e-98cb-4839-83f1-965dac6e27c6');
    var plotname = "(November 2020)";
  } else if (req.cookies.token == 4) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/dec_2020.json?alt=media&token=9abc03c5-5783-4597-afdd-8a2d3d49983e');
    var plotname = "(December 2020)";
  } else if (req.cookies.token == 5) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/jan_2021.json?alt=media&token=2629b33d-2567-4532-aacf-fd007ce9e57a');
    var plotname = "(January 2021)";
  } else if (req.cookies.token == 6) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/feb_2021.json?alt=media&token=d8615093-c047-4532-b3d0-f9b280a435bf');
    var plotname = "(February 2021)";
  } else if (req.cookies.token == 7) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/mar_2021.json?alt=media&token=7139caa6-d36c-4ef7-b9ec-b0ee51cafa4d');
    var plotname = "(March 2021)";
  } else if (req.cookies.token == 8) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/apr_2021.json?alt=media&token=0840a729-b8b6-41db-930d-a4d5aae70cc4');
    var plotname = "(April 2021)";
  } else if (req.cookies.token == 9) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/may_2021.json?alt=media&token=a78bfd35-4b2d-48fd-a132-5655ff9f044a');
    var plotname = "(May 2021)";
  } else if (req.cookies.token == 10) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/jun_2021.json?alt=media&token=a923ad2c-4ba4-482f-8982-3e9746d78ffa');
    var plotname = "(June 2021)";
  } else if (req.cookies.token == 11) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/jul_2021.json?alt=media&token=28c4aff7-18aa-4176-9df2-d70225097c55');
    var plotname = "(July 2021)";
  } else if (req.cookies.token == 12) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/aug_2021.json?alt=media&token=4d7e2c57-c1e4-4e50-9445-685708efba92');
    var plotname = "(August 2021)";
  } else if (req.cookies.token == 13) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/sep_2021.json?alt=media&token=189420f6-c48f-4ce0-8688-122f30d81c65');
    var plotname = "(September 2021)";
  } else if (req.cookies.token == 14) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/oct_2021.json?alt=media&token=2cd5f12f-e9db-48ba-aab7-478ec737a59f');
    var plotname = "(October 2021)";
  } else if (req.cookies.token == 15) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/nov_2021.json?alt=media&token=899af16a-a399-4b8f-96bb-672427a5ce6d');
    var plotname = "(November 2021)";
  } else if (req.cookies.token == 16) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/dec_2021.json?alt=media&token=8a952c48-dfbb-4384-a35d-b85c1fbade63');
    var plotname = "(December 2021)";
  } else if (req.cookies.token == 17) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/jan_2022.json?alt=media&token=c4403967-4994-4606-9cd3-64534952e671');
    var plotname = "(January 2022)";
  } else if (req.cookies.token == 18) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/feb_2022.json?alt=media&token=78c89db8-5ed5-4d66-be9e-3d1ed10d4589');
    var plotname = "(February 2022)";
  }
  
  else {
    var output_data = [[[[[]]]]]; //blank data is output to the client
    var plotname = ""
    return {props: {output_data, plotname,}};
  }

  const data = await res.json(); //unparsed data
  var output_data = [[[[[]]]]]; //array of (a,b,c,d,e) | a: view_count | b: likes | c: video_id | d: title | e: color

  for (var i = 0; i < data.length; i++) {
    output_data[i] = [data[i]["view_count"],data[i]["likes"],data[i]["video_id"],data[i]["title"]];
    output_data[i][4] = 0; //this variable will be used for color
  }

  return {props: {output_data, plotname,}} //return the output data and the request value
}

export default PageTwo;