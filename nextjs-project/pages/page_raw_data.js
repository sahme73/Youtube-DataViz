/*
import jsCookie from 'js-cookie';
import { Fragment } from 'react';
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function PageTemp() {

  const data_array = new Array(13);

  //match the current token with the correct fetch and tag
  if (jsCookie.get("token0") == 1) {
    var { data, error } = useSWR('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-01.json?alt=media&token=e48affb5-a75a-4734-a3fc-49933250ecdf', fetcher)
    var tag = "January 2021";
  }
  if (jsCookie.get("token1") == 1) {
    var { data, error } = useSWR('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-02.json?alt=media&token=50ce7e9e-c666-469b-831a-beeb039fd304', fetcher)
    var tag = "February 2021";
  }
  if (jsCookie.get("token2") == 1) {
    var { data, error } = useSWR('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-03.json?alt=media&token=2064475e-7a61-49a6-acfb-f3bb6ebcdc55', fetcher)
    var tag = "March 2021";
  }
  if (jsCookie.get("token3") == 1) {
    var { data, error } = useSWR('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-04.json?alt=media&token=68c45667-4144-4bae-9355-9b8fab44d280', fetcher)
    var tag = "April 2021";
  }
  if (jsCookie.get("token4") == 1) {
    var { data, error } = useSWR('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-05.json?alt=media&token=8f55fb24-71a3-4d28-945a-60ecdd416aa1', fetcher)
    var tag = "May 2021";
  }
  if (jsCookie.get("token5") == 1) {
    var { data, error } = useSWR('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-06.json?alt=media&token=5e8947c6-d9ab-468f-ad61-69e06209cf04', fetcher)
    var tag = "June 2021";
  }
  if (jsCookie.get("token6") == 1) {
    var { data, error } = useSWR('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-07.json?alt=media&token=6fcfcd82-3d60-4080-a60d-f2a80a8de7a1', fetcher)
    var tag = "July 2021";
  }
  if (jsCookie.get("token7") == 1) {
    var { data, error } = useSWR('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-08.json?alt=media&token=aa17738c-8ddb-47e2-aba4-c0657abfd6ac', fetcher)
    var tag = "August 2021";
  }
  if (jsCookie.get("token8") == 1) {
    var { data, error } = useSWR('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-09.json?alt=media&token=b04b7df4-f063-4903-b959-a4cf66804885', fetcher)
    var tag = "September 2021";
  }
  if (jsCookie.get("token9") == 1) {
    var { data, error } = useSWR('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-10.json?alt=media&token=c59c7100-e81b-458d-96ba-7f764d7d147e', fetcher)
    var tag = "October 2021";
  }
  if (jsCookie.get("token10") == 1) {
    var { data, error } = useSWR('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-11.json?alt=media&token=a7877a45-9958-42a6-8635-7ede136dee2f', fetcher)
    var tag = "November 2021";
  }
  if (jsCookie.get("token11") == 1) {
    var { data, error } = useSWR('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2021-12.json?alt=media&token=495bc17c-8174-4c2a-87a5-148ddfb09093', fetcher)
    var tag = "December 2021";
  }
  if (jsCookie.get("token12") == 1) {
    var { data, error } = useSWR('https://firebasestorage.googleapis.com/v0/b/cs-222-sp-2022.appspot.com/o/2022-01.json?alt=media&token=321d19ff-55a0-44bc-835e-9355f27ff836', fetcher)
    var tag = "January 2022";
  }
  if (jsCookie.get("token0") == undefined && jsCookie.get("token1") == undefined && jsCookie.get("token2") == undefined && jsCookie.get("token3") == undefined && 
      jsCookie.get("token4") == undefined && jsCookie.get("token5") == undefined && jsCookie.get("token6") == undefined && jsCookie.get("token7") == undefined && 
      jsCookie.get("token8") == undefined && jsCookie.get("token9") == undefined && jsCookie.get("token10") == undefined && jsCookie.get("token11") == undefined && 
      jsCookie.get("token12") == undefined) {
    return <div>Failed to load! [NO DATA SELECTED]</div>
  }

  //for debugging: log any errors prior to notifying the user
  if (error) console.log(error);

  //indicate the user of the loading process
  if (error) return <div>Failed to load! [FIREBASE SERVER ERROR]</div>
  if (!data) return <div>Loading...</div>

  //store the video entries in an array
  const items = [];

  for (const [idx, val] of data.entries()) {
    const link = 'https://youtu.be/' + data[idx].video_id;
    items.push(
      <Fragment key = {idx}>
        <h3>
          <a href={link}>
            {val.title}
          </a>
        </h3>
        <p>
          Views: {val.view_count}, Likes: {val.likes}
        </p>
      </Fragment>
    )
  }
  
  //render page
  return (
    <Fragment>

      <h1> {tag} </h1>

      <div>
        {items}
      </div>
      
    </Fragment>
  );
}

export default PageTemp;
*/

function PageTemp() {
  return <div>Blank</div>
}

export default PageTemp