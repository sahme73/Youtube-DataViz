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
      <h1>The Home Page - YouTube Analysis</h1>
      <ul>
        <li>
          <Link href='/page_1'>
            Page 1 - D3 Bar Graph Test
          </Link>
        </li>
        <li>
          <Link href='/page_2'>
            Page 2 - Views vs Likes (Aug 2020)
          </Link>
        </li>

        <li>
          <Link href='/page_3'>
            Page 3 - Word Cloud
          </Link>
        </li>
      </ul>
    </Fragment>
  );
}

export default HomePage;