// Practice
import React, {Component} from 'react'
import { Fragment } from 'react';
import { render } from 'react-dom';

require('dotenv').config();
const { google } = require('googleapis');

function TestYouTubePage() {
    // try {
    //   d3.selectAll("svg").remove();
    // } catch (error) {
    //   console.log(error);
    // }

    return (
        <Fragment>
            <h1>YouTube Test Page</h1>
                <body>
                    <input id='keyword' placeholder='keyowrd to search'></input>
                    <button onclick></button>
                </body>

        </Fragment>
    );
}
  
export default TestYouTubePage;






/* -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- *
 * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- */