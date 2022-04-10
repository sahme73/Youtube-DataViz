// Top 100 most popular videos are extracted from the YouTube API
// Processed to make an array of JS Objects for D3.js input
function processVideos(videos) {
  let final_videos = [];

  if (videos == null) {
    return final_videos;
  }
  for (let index = 0; index < videos.length; index++) {
    try {
      let curr_obj = {};
      curr_obj["id"] = videos[index]["snippet"]["categoryId"];
      curr_obj["title"] = videos[index]["snippet"]["title"];
      curr_obj["viewCount"] = videos[index]["statistics"]["viewCount"];
      curr_obj["likeCount"] = videos[index]["statistics"]["likeCount"];
      if (typeof curr_obj["likeCount"] !== 'undefined' && curr_obj["viewCount"] !== 'undefined') {
        console.log(curr_obj);
        final_videos.push(curr_obj);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return final_videos;
}

// Video Categories are extracted from YouTube API and 
// processed to form a dictionary
function processVideoCategories(categories) {
  let temp = categories["items"];
  let final_categories = {};

  if (temp == null) {
    return final_categories;
  }

  for (let index = 0; index < temp.length; index++) {
    let curr_id = temp[index]["id"];
    let curr_title = temp[index]["snippet"]["title"];
    final_categories[curr_id] = curr_title;
  }

  return final_categories;
}


// Processes texts and performs data preparation to be passed into
// Partially taken from https://observablehq.com/@d3/word-cloud
// Remove Emojis

function wordCloudProcessor(items) {
  var full_text = "";
  for (let index = 0; index < items.length; index++) {
    full_text = full_text + items[index]["snippet"]["topLevelComment"]["snippet"]["textOriginal"] + " ";
  }
  var stopwords = new Set("I,i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall".split(","));
  var words = full_text.split(/[\s.]+/g)
  .map(w => w.replace(/^[“‘"\-—()\[\]{}]+/g, ""))
  .map(w => w.replace(/[;:.!?()\[\]{},"'’”\-—]+$/g, ""))
  .map(w => w.replace(/['’]s$/g, ""))
  .map(w => w.substring(0, 30))
  .map(w => w.toLowerCase())
  .map(w => w.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, ''))
  .filter(w => w && !stopwords.has(w))
  return structureData(wordFreq(words));
}

// Obtain Word frequency as a Map
function wordFreq(list) {
  var freqMap = {};
  list.forEach(function(w) {
      if (!freqMap[w]) {
          freqMap[w] = 0;
      }
      freqMap[w] += 1;
  });

  return freqMap;
}

// Function to Structure data into {"word": _____, "size": _____}
function structureData(map) {
  var final_list = []
  for (const key in map) {
    let curr = {"word": key, "size": map[key]};
    final_list.push(curr)
  }
  return final_list;
}

exports.wordCloudProcessor = wordCloudProcessor;
exports.wordFreq = wordFreq;
exports.structureData = structureData;
exports.processVideoCategories = processVideoCategories;
exports.processVideos = processVideos;
