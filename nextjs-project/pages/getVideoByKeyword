
   
import React, {useEffect, useState} from "react";
// require('dotenv').config();
// import useSWR from "swr";

//'AIzaSyC9woSZMjGt2yS_o_TlpQyIhOuNwwRxJyU' // use your own API key
// console.log(key)


// const getData = (...args) => fetch(...args).then((response) => response.json());

/**
 * @summary A fetcher gives most popular videos
 * 
 * @param {q} The q parameter specifies the query term to search for
 * 
 * @returns 
 */
 function SearchVideoKeyword(q = '') {
    const key = process.env.YOUTUBE_KEY
    const videosEndpoint = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=" + q + "&key="
    // console.log(videosEndpoint)
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
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



    google.youtube('v3').search.list({
        key: api_key,
        part: part,
        chart: 'mostPopular',
        regionCode: regionCode,
        maxResults: maxResults,
        videoCategoryId: v_CategoryId,
    }).then(async (response) => {
        json = await response.json()
    }).catch((err) => console.log(err));

    return res.status(200).json(items);
}

export default SearchVideoKeyword;
