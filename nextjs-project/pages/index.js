import styles from '../styles/HomePage.module.css';
import Link from 'next/link';
import { Fragment } from 'react';
import * as d3 from "d3";

function HomePage() {

  // removes any svg graphs from homepage -- prevents infinite graph generation
  try {
    d3.selectAll("svg").remove();
  } catch (error) {
    //console.log(error);
  }

  return (
    <Fragment>
      <h1 className={styles.title}>YouTube Analysis</h1>
      <ul className={styles.list}>
        <li>
          <button className={styles.button}>
            <span>
              <Link href='/page_1'>
                D3 Bar Graph Example
              </Link>
            </span>  
          </button>
        </li>
        <li>
          <button className={styles.button}>
            <span>
              <Link href='/page_2'>
                Views vs Likes (August 2020)
              </Link>
            </span>  
          </button>
        </li>
        <li>
          <button className={styles.button}>
            <span>
              <Link href='/page_3'>
                Word Cloud
              </Link>
            </span>  
          </button>
        </li>
        <li>
          <button className={styles.button}>
            <span>
              <Link href='/page_4'>
                Bubble Chart
              </Link>
            </span>  
          </button>
        </li>
      </ul>
    </Fragment>
  );
}

export default HomePage;