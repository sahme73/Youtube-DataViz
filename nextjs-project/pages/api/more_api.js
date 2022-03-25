const { google } = require('googleapis');

var api_key = process.env.YOUTUBE_TOKEN;

/**
 * @summary A fetcher gives most popular videos
 * 
 * @param {*} v_CategoryId 
 * @param {*} regionCode 
 * @param {*} part 
 * @param {*} maxResults : default to 50
 * @param {*} res 
 * 
 * @returns 
 */
async function SearchVideoKeyword(v_CategoryId = '0', regionCode = 'US', part = 'snippet', maxResults = '50', res) {
    google.youtube('v3').search.list({
        key: api_key,
        part: part,
        chart: 'mostPopular',
        regionCode: regionCode,
        maxResults: maxResults,
        videoCategoryId: v_CategoryId,
    }).then((response) => {
        json = await response.json()
    }).catch((err) => console.log(err));

    return res.status(200).json(items);
}

/**
 * @summary Retrive comments of a videos, given by videoId
 * 
 * @param {*} part 
 * @param {*} order : relevance gives most popular one on the top
 * @param {*} searchTerm 
 * @param {*} videoId 
 * @param {*} res 
 * 
 * @returns 
 */
async function RetrieveCommentThreads (part = "id,snippet,replies", order = 'relevance', searchTerm = '', videoId, res) {
    google.youtube('v3').commentThreads.list({
        key: api_key,
        part: part,
        order: order,
        videoId: videoId,
        searchTerm: searchTerm,
    }).then((response) => {
        json = await response.json()
    }).catch((err) => console.log(err));

    return res.status(200).json(items);
}

export { SearchVideoKeyword, RetrieveCommentThreads };