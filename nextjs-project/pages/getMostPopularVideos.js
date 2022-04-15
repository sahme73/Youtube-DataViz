import React, {useEffect, useState} from "react";
// require('dotenv').config();
// import useSWR from "swr";

//'AIzaSyC9woSZMjGt2yS_o_TlpQyIhOuNwwRxJyU' // use your own API key
// console.log(key)


// const getData = (...args) => fetch(...args).then((response) => response.json());

function VideosApp(){
    // const [key, setKey] = useState(null)
    // console.log(key)
    // return (<div>{key}</div>)
    const key = process.env.YOUTUBE_KEY//'AIzaSyC9woSZMjGt2yS_o_TlpQyIhOuNwwRxJyU'// process.env.YOUTUBE_TOKEN does not work
    const videosEndpoint = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key="
    // console.log(videosEndpoint)
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        // setKey(process.env.YOUTUBE_TOKEN)
        fetch(videosEndpoint + key)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No data</p>
    // console.log(data)
    return (
        <div>
            {JSON.stringify(data.items)}
        </div>
    );
};

export default VideosApp;