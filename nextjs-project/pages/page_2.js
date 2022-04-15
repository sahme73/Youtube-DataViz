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
      .attr('x', (w - spacing + 58)/2)
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
        
        svg.style('cursor', 'pointer');

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
        
        console.log("Target: " + event.currentTarget);
        d3.select(event.currentTarget)
            .style("fill", "green");
        svg.style('cursor', 'pointer');

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
        console.log("Target: " + event.currentTarget);
        d3.select(event.currentTarget)
            .style("fill", "blue");

        var link_string = "https://youtu.be/" + d[2]; //the link of the point's video

        //router.push(link_string);
        window.open(
          link_string, "_blank");

      })
      .on('mouseout', function(event, d) {

        svg.style('cursor', 'crosshair');

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
                January 2021
            </span>
        </button>

        <button className={styles.button} onClick={() => refreshData("1")}>
            <span>
                February 2021
            </span>
        </button>
        
        <button className={styles.button} onClick={() => refreshData("2")}>
            <span>
                March 2021
            </span>
        </button>
        
        <button className={styles.button} onClick={() => refreshData("3")}>
            <span>
                April 2021
            </span>
        </button>
        
        <button className={styles.button} onClick={() => refreshData("4")}>
            <span>
                May 2021
            </span>
        </button>
        
        <button className={styles.button} onClick={() => refreshData("5")}>
            <span>
                June 2021
            </span>
        </button>
        
        <button className={styles.button} onClick={() => refreshData("6")}>
            <span>
                July 2021
            </span>
        </button>
        
        <button className={styles.button} onClick={() => refreshData("7")}>
            <span>
                August 2021
            </span>
        </button>
        
        <button className={styles.button} onClick={() => refreshData("8")}>
            <span>
                September 2021
            </span>
        </button>
        
        <button className={styles.button} onClick={() => refreshData("9")}>
            <span>
                October 2021
            </span>
        </button>
        
        <button className={styles.button} onClick={() => refreshData("10")}>
            <span>
                November 2021
            </span>
        </button>
        
        <button className={styles.button} onClick={() => refreshData("11")}>
            <span>
                December 2021
            </span>
        </button>
        
        <button className={styles.button} onClick={() => refreshData("12")}>
            <span>
                January 2022
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

      <br></br>

        <button className={styles.button} onClick={() => {window.open("/page_raw_data", "_blank");}}>
            <span>
                Raw Data
            </span>
        </button>

      <br></br><br></br><br></br>
    </Fragment>
  );
}

export const getServerSideProps = async ( {req, res} ) => {

  //console.log(req.cookies.token);

  /*
    Note to self (Safeer - 4/7/2022): 
        -Rewrite this entire if-elseif block using a map [key: cookie#, value: url] (Unnecessary)
        -Clean and update data using an external tool (Completed)
  */

  if (req.cookies.token == 0) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-01.json?alt=media&token=e48affb5-a75a-4734-a3fc-49933250ecdf');
    var plotname = "(January 2021)";
  } else if (req.cookies.token == 1) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-02.json?alt=media&token=50ce7e9e-c666-469b-831a-beeb039fd304');
    var plotname = "(February 2021)";
  } else if (req.cookies.token == 2) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-03.json?alt=media&token=2064475e-7a61-49a6-acfb-f3bb6ebcdc55');
    var plotname = "(March 2021)";
  } else if (req.cookies.token == 3) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-04.json?alt=media&token=68c45667-4144-4bae-9355-9b8fab44d280');
    var plotname = "(April 2021)";
  } else if (req.cookies.token == 4) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-05.json?alt=media&token=8f55fb24-71a3-4d28-945a-60ecdd416aa1');
    var plotname = "(May 2021)";
  } else if (req.cookies.token == 5) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-06.json?alt=media&token=5e8947c6-d9ab-468f-ad61-69e06209cf04');
    var plotname = "(June 2021)";
  } else if (req.cookies.token == 6) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-07.json?alt=media&token=6fcfcd82-3d60-4080-a60d-f2a80a8de7a1');
    var plotname = "(July 2021)";
  } else if (req.cookies.token == 7) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-08.json?alt=media&token=aa17738c-8ddb-47e2-aba4-c0657abfd6ac');
    var plotname = "(August 2021)";
  } else if (req.cookies.token == 8) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-09.json?alt=media&token=b04b7df4-f063-4903-b959-a4cf66804885');
    var plotname = "(September 2021)";
  } else if (req.cookies.token == 9) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-10.json?alt=media&token=c59c7100-e81b-458d-96ba-7f764d7d147e');
    var plotname = "(October 2021)";
  } else if (req.cookies.token == 10) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-11.json?alt=media&token=a7877a45-9958-42a6-8635-7ede136dee2f');
    var plotname = "(November 2021)";
  } else if (req.cookies.token == 11) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-12.json?alt=media&token=495bc17c-8174-4c2a-87a5-148ddfb09093');
    var plotname = "(December 2021)";
  } else if (req.cookies.token == 12) {
    var res = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2022-01.json?alt=media&token=321d19ff-55a0-44bc-835e-9355f27ff836');
    var plotname = "(January 2022)";
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