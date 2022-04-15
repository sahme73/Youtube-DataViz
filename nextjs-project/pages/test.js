// require('dotenv').config();

function App() {
    const key = process.env.YOUTUBE_TOKEN
    console.log(key)
    return (<div><p>{key}</p></div>)
}

export default App