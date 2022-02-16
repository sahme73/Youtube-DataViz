import * as d3 from 'd3';

export default function handler(req, res) {
  /*var fs = require('fs');

  res.status(200).json(d3.csvParse(fs.readFileSync('public/US_youtube_trending_data.csv')
  .toString()))*/
  res.status(200).json({ hello: "World" })
}