export default async (req, res) => { // simple fetcher that fetches all popular videos from the YouTube API's mostPopular chart
    var key = process.env.YOUTUBE_KEY // use your own API key
    let response = await fetch('https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key='+key)
    let json = await response.json()
    let items = json.items // extract information
    let nextPageToken = json.nextPageToken
    while (nextPageToken) {
        response = await fetch('https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&pageToken='+nextPageToken+'&regionCode=US&key='+key)
        json = await response.json()
        items = items.concat(json.items)
        nextPageToken = json.nextPageToken
    }
    return res.status(200).json(items) // return a raw json file
}


/* -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- *
 * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- * -- */
const { google } = require('googleapis');

/**
 * @summary A fetcher gives most popular videos with the given keyword in US region
 * 
 * @notice Also a practice for fetching with googleapis module
 * 
 * @param {*} keyword 
 */
export async function SearchKeyword(keyword, res) {
    google.youtube('v3').search.list({
        key: process.env.YOUTUBE_TOKEN,
        part: 'snipet',
        q: keyword,
        chart: 'mostPopular',
        regionCode: 'US',
        maxResults: '50',
    }).then((response) => {
        // const { data } = response;
        // data.items.array.forEach(element => {
        //     // do something
        //     // record each itmes
        //     console.log(`Title: ${item.snippet,title}\nDescription:${item.snippet.description}\n`);
        // });
        json = await response.json()
    }).catch((err) => console.log(err));

    return res.status(200).json(items);
 }