// Practice
import React, {Component} from 'react'
import { Fragment } from 'react';
import { render } from 'react-dom';
import { searchTerm, RetrieveCommentThreads } from './more_api'

require('dotenv').config();
const { google } = require('googleapis');

function TestYouTubePage() {

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