export default async (req, res) => {
    var key = process.env.YOUTUBE_KEY
    const response = await fetch('https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key='+key)
    const json = await response.json()
    res.status(200).json(json)
}