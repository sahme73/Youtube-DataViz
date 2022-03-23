export default async function RetrieveCommentThreads(videoId, res) { // simple fetcher that fetches all comments and replies of a given video
    var key = process.env.YOUTUBE_TOKEN // use your own API key
    let response = await fetch('https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId='+videoId+'&key='+key)
    let json = await response.json()
    let items = json.items // extract information
    let nextPageToken = json.nextPageToken
    while (nextPageToken) {
        response = await fetch('https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&pageToken='+nextPageToken+'&videoId='+videoId+'&key='+key)
        json = await response.json()
        items = items.concat(json.items)
        nextPageToken = json.nextPageToken
    }
    return res.status(200).json(items) // return a raw json file
}
