# YouTube Viz

## Summary of Project
In our project, we set out to work with YouTube Data and try to visualize the data from videos in meaningful ways. We do so through 3 different types of visualizations.

1.) Visualize Likes vs Views of a given set of videos over a 12 month period through a scatterplot

2.) Perform Sentiment Analysis through the use of Word Cloud on comments of a given YouTube Video

3.) Visualize trending videos based on their categories and their respective view/ like count using a Bubble Chart

Unlike other Data Visualization projects out there, our team hoped to make our data visualization as dynamic as possible. Our visualization would pull from the YouTube API in real time rather than create a single image visualization (a snapshot in time) which most projects do. 
## Technical Architecture

Our web application works with the Next.js framework. It can be divided into 2 parts, Frontend and Backend. The 3 different data visualizations utilize slightly different Backend structure depending on the data visualization due to the different needs/ size of data that each visualization is working with. 

For the Likes vs Views Scatterplot, below is the architecture that it uses

![Architecture 1](https://github.com/CS222SP22/course-project-lk/blob/main/nextjs-project/Architecture1.png)

For the Scatter Plot Visualization, data was stored on Firebase cloud storage. It was then fetched and parsed from Firebase on the server running Node.js. Finally, data is then passed into function for visualization using D3.js.

For the Bubble chart (Trending videos) and Word Cloud (Sentiment Analysis), below is the architecture it uses:

![Architecture 2](https://github.com/CS222SP22/course-project-lk/blob/main/nextjs-project/TechnicalArchitecture2.png)

It is worth noting the differences between the Backend set-up between the 2 sets of data visualization. For the bubble chart and word cloud, they utilize data provided from the YouTube API while the scatterplot uses data given directly from a json file, that was not taken from Kaggle (due to the size of the file itself). This difference is largely due to the availability of the given data. Data used for the scatterplot required data to be given by Month which is not available from the YouTube API.

Overall, the Frontend set-up was largely the same with React.js as the framework used on top of the D3.js Library which was used for the visualization.

## Installation Instructions

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started (For Developers):

1.) Download Node.js from their website (The project is compiling w/ version v17.4.0)

2.) Clone the repository (https://github.com/CS222SP22/course-project-lk.git) to your local machine.

3.) Using any command line (Powershell, CMD, etc.) CD to the "nextjs-project" folder

4.) Run the command: "npm install" (this command will install all necessary dependencies for the project)

### Getting your YouTube API Key

1.) Follow the instructions found here (https://developers.google.com/youtube/v3/getting-started)

2.) Obtain your API Key by clicking on the "Copy Button" as seen in the red box below

![Obtain API Key](https://github.com/CS222SP22/course-project-lk/blob/main/nextjs-project/API%20Key%20Example.png)

3.) Create a file called `env.development.local` in the `nextjs-project` folder and add the following code inside `env.development.local`:

```bash
YOUTUBE_KEY=<YOUR API KEY>
```

### Instruction for using Data Visualizations

1.) First, ensure that you complete the above instructions for [obtaining your YouTube API Key](#getting-your-youtube-api-key). If not, the following steps will crash the web application.

2.) Second, you should be able to run the command: "npm run dev" (example below) to locally host the current webpage

Run the development server:

```bash
npm run dev
# or
yarn dev
```

3.) Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You will see the below home page:

![Home Page](https://github.com/CS222SP22/course-project-lk/blob/main/nextjs-project/Home%20Screen.png)

4.) There are 3 different visualizations that you can use. Views vs Likes Scatterplot, Word Cloud & Bubble Chart. 

For the Word Cloud visualization that visualizes common words and performs a sentiment analysis on a given video, the web application accepts a given video id for a video on YouTube and visualizes common words. Enter the Video ID in the input field (in red box):

![Word Cloud](https://github.com/CS222SP22/course-project-lk/blob/main/nextjs-project/Word%20Cloud.png)

You may obtain a video id by going to looking at a YouTube Video's URL. Below is an example of a video id format and how you can obtain it from a YouTube URL:

```bash
https://www.youtube.com/watch?v=<video id>
```

## Group Members and Roles:

1.) Safeer Ahmed - Views vs Likes Scatter Plot Visualization & CSS Designer

2.) Yi Shian Ho - Bubble chart & Sentiment Analysis Data Visualizations

3.) Sam Zhang - Most popular videos and comment threads fetcher based on YouTube API

4.) Yun Wang - Assisted in creating node.js code for data fetchers with Sam
