import * as idk from 'csv-parser'
    
const csv = require('csv-parser')
const fs = require('fs')
const results = [];

fs.createReadStream('public/data.csv')
.pipe(csv({}))
.on('data', (data) => results.push(data))
.on('end', () => {
    console.log(results);
});