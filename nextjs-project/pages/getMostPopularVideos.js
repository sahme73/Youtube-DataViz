import useSWR from "swr";

//get api key
const key = process.env.YOUTUBE_KEY

//endpoint for api call
const videosEndpoint = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key="

const getVideos = async () => {
    const response = await fetch (videosEndpoint+key);
    return await response.json();
}

// function that returns top 50 most popular videos
function GetMostPopularVideos(){

    // useSWR hook to fetch data
    const {data: videos, error } = useSWR(videosEndpoint+key, getVideos)

    if (!videos) return <p>Loading...</p>
    if (error) return <p>Error loading data</p>

    // return data
    return (
        <div>
            {JSON.stringify(videos.items)}
        </div>
    );
    // return data.items;
};

export default GetMostPopularVideos;