import useSWR from "swr";

//get api key
const key = process.env.YOUTUBE_KEY;

//endpoint for api call
const commentsEndpoint = "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=";

const getComments = async (videoId) => {
    const response = await fetch (commentsEndpoint+videoId+'&key='+key);
    return await response.json();
}

// function that returns top 50 most popular videos
function getCommentThread(videoId = 'O0gbfvJDsv4'){
    //parse url
    const url = commentsEndpoint+videoId+'&key='+key
    // useSWR hook to fetch data
    const {data: comments, error } = useSWR(url, () => getComments(videoId));

    if (!comments) return <p>Loading...</p>
    if (error) return <p>Error loading data</p>

    // return data
    return (
        <div>
            {JSON.stringify(comments.items)}
        </div>
    );
    // return data.items;
};

export default getCommentThread;