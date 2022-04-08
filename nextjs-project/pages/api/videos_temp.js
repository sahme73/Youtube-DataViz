import React from "react";
import useSWR from "swr";

const key = process.env.YOUTUBE_TOKEN // use your own API key

const videosEndpoint = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key=" + key

const getData = (...args) => fetch(...args).then((response) => response.json());

function VideosApp(){
    const { data: videos, error } = useSWR(videosEndpoint, getData)

    if (error) return <div>failed to load</div>
    if (!videos) return <div>loading</div>
    return (
        <div>
            {videos && videos.map((video) => (
                <div key={video.id}>{video.snippet.title}</div>
            ))}
        </div>
    );
};

export default VideosApp;