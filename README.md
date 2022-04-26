# Project Name: YouTube Viz

## Summary of Project
In our project, we set out to work with YouTube Data and try to visualize the data from videos in meaningful ways. We do so through 3 different types of visualizations.

1.) Visualize Likes vs Views of a given set of videos over a 12 month period

2.) Perform Sentiment Analysis through the use of Word Cloud on comments of a given YouTube Video

3.) Visualize trending videos based on their categories and their respective view/ like count using a Bubble Chart

Unlike other Data Visualization projects out there, our team hoped to make our data visualization as dynamic as possible. Our visualization would pull from the YouTube API in real time rather than create a single image visualization (a snapshot in time) which most projects do. 
## Technical Architecture

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

![](https://github.com/CS222SP22/course-project-lk/blob/main/nextjs-project/Home%20Screen.png)

4.) There are 3 different visualizations that you can use. Views vs Likes Scatterplot, Word Cloud & Bubble Chart.

## Group Members and Roles:

1.) Safeer Ahmed - 

2.) Yi Shian Ho - Bubble chart & Sentiment Analysis Data Visualizations

3.) Sam Zhang - 

4.) Yun Wang - 
