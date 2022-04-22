import Link from 'next/link';
import { Fragment } from 'react';
import * as d3 from 'd3';
import React, {useState, useRef, useEffect} from 'react';
import styles from '../styles/DefaultPage.module.css';
import cookie from "js-cookie";

function ButtonColorManager(map) {
  let output = new Array(13).fill({ backgroundColor: 'grey' });

  for (let i = 0; i < output.length; i++) {
    const token_id = "token" + i;
    const val = map.get(i);
    if (cookie.get(token_id) == 1)
      output[i] = {backgroundColor: val};
  }

  return output;
}

function PageTwo({ output_data, plotname, }) {

  const point_color_map = new Map(); point_color_map.set(0, '#ff0000');
  point_color_map.set(1, '#ff9900'); point_color_map.set(2, '#ffcc00'); point_color_map.set(3, '#009933'); point_color_map.set(4, '#0000ff');
  point_color_map.set(5, '#ff33cc'); point_color_map.set(6, '#660066'); point_color_map.set(7, '#801a00'); point_color_map.set(8, '#994d00');
  point_color_map.set(9, '#003300'); point_color_map.set(10, '#000099'); point_color_map.set(11, '#00ffff'); point_color_map.set(12, '#ff9999');

  const [button_colors, set_button_colors] = useState(new Array(13).fill({ backgroundColor: '#4979ff' }));
  useEffect(() => set_button_colors(ButtonColorManager(point_color_map)), []);

  const [data] = useState(output_data);
  const svgRef = useRef();

  //forces page to refresh props on server
  const refreshData = (n) => {
    const token_id = "token" + n;

    if (cookie.get(token_id) == 1) {
      cookie.set(token_id, 0, {expires: 1 / 24, sameSite: 'None', secure: true});
      //alert("removing: " + n);
    } else {
      cookie.set(token_id, 1, {expires: 1 / 24, sameSite: 'None', secure: true});
    }

    window.location.reload();
  }

  //empties graph
  const clearData = () => {

    for (let i = 0; i < button_colors.length; i++) {
      const token_id = "token" + i;
      
      //cookie.set(token_id, 0, {expires: 1 / 24, sameSite: 'None', secure: true});
      cookie.remove(token_id);
    }

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
        .style('fill', d => {
          return point_color_map.get(d[4]);
        })
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
          //console.log("Scale factor: " + e.transform.k);
          //console.log("Radius of point: " + Math.pow(radius, (-1 * (e.transform.k / 10))));
        
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
        
        //console.log("Target: " + event.currentTarget);
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

        //console.log('clicking');
        //console.log("Target: " + event.currentTarget);
        d3.select(event.currentTarget)
            .style("fill", "black");

        var link_string = "https://youtu.be/" + d[2]; //the link of the point's video

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
        
        <button className={styles.button} style={button_colors[0]} onClick={() => refreshData("0")}>
            <span>
                January 2021
            </span>
        </button>

        <button className={styles.button} style={button_colors[1]} onClick={() => refreshData("1")}>
            <span>
                February 2021
            </span>
        </button>
        
        <button className={styles.button} style={button_colors[2]} onClick={() => refreshData("2")}>
            <span>
                March 2021
            </span>
        </button>
        
        <button className={styles.button} style={button_colors[3]} onClick={() => refreshData("3")}>
            <span>
                April 2021
            </span>
        </button>
        
        <button className={styles.button} style={button_colors[4]} onClick={() => refreshData("4")}>
            <span>
                May 2021
            </span>
        </button>
        
        <button className={styles.button} style={button_colors[5]} onClick={() => refreshData("5")}>
            <span>
                June 2021
            </span>
        </button>
        
        <button className={styles.button} style={button_colors[6]} onClick={() => refreshData("6")}>
            <span>
                July 2021
            </span>
        </button>
        
        <button className={styles.button} style={button_colors[7]} onClick={() => refreshData("7")}>
            <span>
                August 2021
            </span>
        </button>
        
        <button className={styles.button} style={button_colors[8]} onClick={() => refreshData("8")}>
            <span>
                September 2021
            </span>
        </button>
        
        <button className={styles.button} style={button_colors[9]} onClick={() => refreshData("9")}>
            <span>
                October 2021
            </span>
        </button>
        
        <button className={styles.button} style={button_colors[10]} onClick={() => refreshData("10")}>
            <span>
                November 2021
            </span>
        </button>
        
        <button className={styles.button} style={button_colors[11]} onClick={() => refreshData("11")}>
            <span>
                December 2021
            </span>
        </button>
        
        <button className={styles.button} style={button_colors[12]} onClick={() => refreshData("12")}>
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

  const res_array = new Array(13);
  var plotname = "";

  if (req.cookies.token0 == 1) {
    res_array[0] = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-01.json?alt=media&token=e48affb5-a75a-4734-a3fc-49933250ecdf');
    plotname += "(January 2021) ";
  }
  if (req.cookies.token1 == 1) {
    res_array[1] = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-02.json?alt=media&token=50ce7e9e-c666-469b-831a-beeb039fd304');
    plotname += "(February 2021) ";
  }
  if (req.cookies.token2 == 1) {
    res_array[2] = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-03.json?alt=media&token=2064475e-7a61-49a6-acfb-f3bb6ebcdc55');
    plotname += "(March 2021) ";
  }
  if (req.cookies.token3 == 1) {
    res_array[3] = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-04.json?alt=media&token=68c45667-4144-4bae-9355-9b8fab44d280');
    plotname += "(April 2021) ";
  }
  if (req.cookies.token4 == 1) {
    res_array[4] = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-05.json?alt=media&token=8f55fb24-71a3-4d28-945a-60ecdd416aa1');
    plotname += "(May 2021) ";
  }
  if (req.cookies.token5 == 1) {
    res_array[5] = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-06.json?alt=media&token=5e8947c6-d9ab-468f-ad61-69e06209cf04');
    plotname += "(June 2021) ";
  }
  if (req.cookies.token6 == 1) {
    res_array[6] = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-07.json?alt=media&token=6fcfcd82-3d60-4080-a60d-f2a80a8de7a1');
    plotname += "(July 2021) ";
  }
  if (req.cookies.token7 == 1) {
    res_array[7] = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-08.json?alt=media&token=aa17738c-8ddb-47e2-aba4-c0657abfd6ac');
    plotname += "(August 2021) ";
  }
  if (req.cookies.token8 == 1) {
    res_array[8] = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-09.json?alt=media&token=b04b7df4-f063-4903-b959-a4cf66804885');
    plotname += "(September 2021) ";
  }
  if (req.cookies.token9 == 1) {
    res_array[9] = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-10.json?alt=media&token=c59c7100-e81b-458d-96ba-7f764d7d147e');
    plotname += "(October 2021) ";
  }
  if (req.cookies.token10 == 1) {
    res_array[10] = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-11.json?alt=media&token=a7877a45-9958-42a6-8635-7ede136dee2f');
    plotname += "(November 2021) ";
  }
  if (req.cookies.token11 == 1) {
    res_array[11] = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-12.json?alt=media&token=495bc17c-8174-4c2a-87a5-148ddfb09093');
    plotname += "(December 2021) ";
  }
  if (req.cookies.token12 == 1) {
    res_array[12] = await fetch('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2022-01.json?alt=media&token=321d19ff-55a0-44bc-835e-9355f27ff836');
    plotname += "(January 2022) ";
  }
  
  if (req.cookies.token0 != 1 && req.cookies.token1 != 1 && req.cookies.token2 != 1 && req.cookies.token3 != 1 && req.cookies.token4 != 1 && req.cookies.token5 != 1
    && req.cookies.token6 != 1 && req.cookies.token7 != 1 && req.cookies.token8 != 1 && req.cookies.token9 != 1 && req.cookies.token10 != 1 && req.cookies.token11 != 1
    && req.cookies.token12 != 1 ) {
    var output_data = [[[[[]]]]]; //blank data is output to the client
    return {props: {output_data, plotname,}};
  }

  var data_array = new Array(13);
  for (let j = 0; j < data_array.length; j++) {
    if (res_array[j] != undefined)
      data_array[j] = await res_array[j].json();
  }

  var output_data = [[[[[]]]]]; //array of (a0,b1,c2,d3,e4) | a0: view_count | b1: likes | c2: video_id | d3: title | e4: color

  for (var k = 0; k < data_array.length; k++) {
    if (res_array[k] != undefined) {
      for (var i = 0; i < data_array[k].length; i++) {
        output_data.push([data_array[k][i]["view_count"],data_array[k][i]["likes"],data_array[k][i]["video_id"],data_array[k][i]["title"],k]);
      }
    }
  }

  return {props: {output_data, plotname,}} //return the output data with the subsequent plot name
}

export default PageTwo;