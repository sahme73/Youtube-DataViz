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