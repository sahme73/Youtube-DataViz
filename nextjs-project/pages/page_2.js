import Link from 'next/link';
import { Fragment } from 'react';
import * as d3 from "d3";
import react from 'react';

function PageTwo({ output }) {

  //output is the array of video objects
  //each variable of the object can be accessed
  let index = output[5];
  console.log(index["video_id"]);
  console.log(index["view_count"]);
  console.log(index["likes"]);

  return (
    <Fragment>
      <h1>
        Page 2
      </h1>
      <p>
        {JSON.stringify(index)}
      </p>
      <br></br>
      <Link href='/'>
        Return home!
      </Link>
    </Fragment>
  );

}

export async function getStaticProps() {

  // TO-DO: Create an interface for picking months, Visualize the data sets

  // shortened data:
  //const res = await fetch('https://projectdatasetfor222.s3.us-east-2.amazonaws.com/split_data/aug_2020%20-%20Copy.json?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCR9Utw27OUSxf3LgQoqAXbVq3FTpMphgzjvsXnW0D2vgIgHoKU9OAXFyeiLAk4GsjS%2Fy2IzpWR6ism4bXjxYVTzuQq7QIIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw3MzUyOTA2Mzk1ODMiDIw3zgr%2FwAoEdQw5oCrBAttkSgBeKbQRlZQ2jq%2FDROwt7ZM6fSJFJsEz231l0MHnz2IXfcsPWhbpIGjVCAfwkM67B%2FfFgoDacr6odqjNGLPJYm6ydXmecL0pvVmRC6swId0AqdzO%2Fe69jdNh7gXSNeVr2e7CbsKfOamhHZwx7GG3DwHftOp5OhprOETdsHBcWQ7y7CvgDNdeWDOo%2BDp2H9iYS%2FdtI3ckVGjYd1%2F1uucs0LFnC84M8RfUhAHMnqHAIOYQNk90hefle9jx9R7RyvXMsvEpm41JQzdY9ptJ8XWqPg8OdEiGDWA8DymGWPBwhjyJWRxPzW1iOoZ%2BSDZkLnT5BnQCheMb9dI%2Few646V3hTTwBQJHBs7h5DRz017O3Ps%2Frm8SCJ2kw7p2QsDCFxhyj9SlUDV4zOefvSunBTQoj8hIbpafzgqbnovSK5m7HVDDf54KQBjqzArkzLdXdsFRGqCoATTMvNvR9i8deyKfVP%2FQD4Jr%2B8ulWZIjRUIAdYLbcuioL1AE98phJ9ZFyYwCso0WNwpJWul4okSiqUya7GhW6hRNFgLdd%2BiI%2FejiBgVqzH8YFgq0USGswO6c%2Bivms%2F5oQO8p58H3Jh8yE3VHWXlP5XEEkte2FOLgAhg7QIH07u86RSCDctK1Ued8T9k%2BYOtmdRqR8d6FR0%2Ba7LkYwKN5TIJS%2BBVeABFoJrAIjqOsyvCjCtQWQjJG%2FSbKSIxtxbBVJHtxX4ba0lqOK4irnx4GnFi%2B24M2wp9Qd%2FaRcqmoVRd5RqLnVaTBM9%2FEQX%2FE6sLuM1JtCobMEaDlLB2FKlOdiGgINBJe0QRz4%2FWQrLPSIbLXLH2YrmnXDwXQnRFk4z0jAvVsCEi96kak%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220207T080211Z&X-Amz-SignedHeaders=host&X-Amz-Expires=21599&X-Amz-Credential=ASIA2WMV4YTPYROLI5PN%2F20220207%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Signature=ba60f48b0458d2a86f56ff7a3a32395133a6d42c26db99e553f5bcde455f6932')

  // full data:
  const res = await fetch('https://projectdatasetfor222.s3.us-east-2.amazonaws.com/split_data/aug_2020.json?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCR9Utw27OUSxf3LgQoqAXbVq3FTpMphgzjvsXnW0D2vgIgHoKU9OAXFyeiLAk4GsjS%2Fy2IzpWR6ism4bXjxYVTzuQq7QIIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw3MzUyOTA2Mzk1ODMiDIw3zgr%2FwAoEdQw5oCrBAttkSgBeKbQRlZQ2jq%2FDROwt7ZM6fSJFJsEz231l0MHnz2IXfcsPWhbpIGjVCAfwkM67B%2FfFgoDacr6odqjNGLPJYm6ydXmecL0pvVmRC6swId0AqdzO%2Fe69jdNh7gXSNeVr2e7CbsKfOamhHZwx7GG3DwHftOp5OhprOETdsHBcWQ7y7CvgDNdeWDOo%2BDp2H9iYS%2FdtI3ckVGjYd1%2F1uucs0LFnC84M8RfUhAHMnqHAIOYQNk90hefle9jx9R7RyvXMsvEpm41JQzdY9ptJ8XWqPg8OdEiGDWA8DymGWPBwhjyJWRxPzW1iOoZ%2BSDZkLnT5BnQCheMb9dI%2Few646V3hTTwBQJHBs7h5DRz017O3Ps%2Frm8SCJ2kw7p2QsDCFxhyj9SlUDV4zOefvSunBTQoj8hIbpafzgqbnovSK5m7HVDDf54KQBjqzArkzLdXdsFRGqCoATTMvNvR9i8deyKfVP%2FQD4Jr%2B8ulWZIjRUIAdYLbcuioL1AE98phJ9ZFyYwCso0WNwpJWul4okSiqUya7GhW6hRNFgLdd%2BiI%2FejiBgVqzH8YFgq0USGswO6c%2Bivms%2F5oQO8p58H3Jh8yE3VHWXlP5XEEkte2FOLgAhg7QIH07u86RSCDctK1Ued8T9k%2BYOtmdRqR8d6FR0%2Ba7LkYwKN5TIJS%2BBVeABFoJrAIjqOsyvCjCtQWQjJG%2FSbKSIxtxbBVJHtxX4ba0lqOK4irnx4GnFi%2B24M2wp9Qd%2FaRcqmoVRd5RqLnVaTBM9%2FEQX%2FE6sLuM1JtCobMEaDlLB2FKlOdiGgINBJe0QRz4%2FWQrLPSIbLXLH2YrmnXDwXQnRFk4z0jAvVsCEi96kak%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220207T081527Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Credential=ASIA2WMV4YTPYROLI5PN%2F20220207%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Signature=0f7dc6a211c54609bc02684d5101495e585c9f60ac6a2e064a71cb05678df998');

  const data = await res.json();

  const output = JSON.parse(JSON.stringify(data));

  return {props: {output},}
}
  
export default PageTwo;