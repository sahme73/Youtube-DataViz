import Link from 'next/link';
import { Fragment } from 'react';
import * as d3 from "d3";

function HomePage() {
  try {
    d3.selectAll("svg").remove();
  } catch (error) {
    console.log(error);
  }

  return (
    <Fragment>
      <h1>The Home Page</h1>
      <ul>
        <li>
          <Link href='/page_1'>
            Page 1
          </Link>
        </li>
        <li>
          <Link href='/page_2'>
            Page 2
          </Link>
        </li>
      </ul>
    </Fragment>
  );
}

export default HomePage;