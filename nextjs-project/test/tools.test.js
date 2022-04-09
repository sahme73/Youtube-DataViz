
const tools = require('../resource/tools');

describe("wordFreq", () => {
  test('Empty list test', () => {
    var list = [];
    var result = {};
    expect(tools.wordFreq(list)).toEqual(result);
  });

  test('Simple test', () => {
      var list = ['pounce', 'let', 'great', 'let'];
      var result = {'pounce': 1, 'let': 2, 'great': 1}
      expect(tools.wordFreq(list)).toEqual(result);
  });

  test('Elaborate Test', () => {
    var list = [];
    for (let index = 0; index < 20; index++) {
      list.push("great")
    }
    for (let index = 0; index < 5; index++) {
      list.push("list")
    }
    for (let index = 0; index < 15; index++) {
      list.push("pounce")
    }
    var result = {'great': 20, 'list': 5, 'pounce': 15}
    expect(tools.wordFreq(list)).toEqual(result);
  });
})

describe("structureData", () => {
  test('Empty Object test', () => {
    var map = {};
    var result = []
    expect(tools.structureData(map)).toEqual(result);
  });

  test('Simple test', () => {
      var map = {'pounce': 2, 'let': 1};
      var result = [{"word": "pounce", "size": 2}, {"word": "let", "size": 1}]
      expect(tools.structureData(map)).toEqual(result);
  });

  test('Elaborate Test', () => {
    var map = {'great': 18, 'let': 2, "reach": 20, "love": 25};
    var result = [{"word": "great", "size": 18}, {"word": "let", "size": 2}, {"word": "reach", "size": 20}, {"word": "love", "size": 25}]
    expect(tools.structureData(map)).toEqual(result);
  });
})

describe("processVideoCategories", () => {
  test('Empty Object test', () => {
    var categories = {};
    var result = {}
    expect(tools.processVideoCategories(categories)).toEqual(result);
  });

  test('Simple test', () => {
      var categories = {
        "items": [
          {"id": "0", "snippet": {"title": "First Title"}}
        ]
      };
      var result = {"0": "First Title"}
      expect(tools.processVideoCategories(categories)).toEqual(result);
  });

  test('Elaborate Test', () => {
    var categories = {
      "items": [
        {"id": "1", "snippet": {"title": "First Title"}}, 
        {"id": "2", "snippet": {"title": "Second Title"}},
        {"id": "3", "snippet": {"title": "Third Title"}}
      ]
    };
    var result = {"1": "First Title", "2": "Second Title", "3": "Third Title"}
    expect(tools.processVideoCategories(categories)).toEqual(result);
  });
})

describe("processVideos", () => {
  test('Empty Object test', () => {
    var videos = [];
    var result = [];
    expect(tools.processVideos(videos)).toEqual(result);
  });

  test('Simple test', () => {
      var videos = [
          {"snippet": {"categoryId": "3", "title": "Video 1"}, 
           "statistics": {"viewCount": 1000, "likeCount": 100}
          }
        ];
      var result = [{"id": "3", "title": "Video 1", "viewCount": 1000, "likeCount": 100}]
      expect(tools.processVideos(videos)).toEqual(result);
  });

  test('Elaborate Test', () => {
    var videos = [
        {"snippet": {"categoryId": "3", "title": "Video 1"}, 
         "statistics": {"viewCount": 1000, "likeCount": 100}
        }, 
        {"snippet": {"categoryId": "0", "title": "Video 2"}, 
         "statistics": {"viewCount": 356, "likeCount": 200}
        }, 
        {"snippet": {"categoryId": "2", "title": "Video 3"}, 
         "statistics": {"viewCount": 20000, "likeCount": 4556}
        }
      ];
    var result = [{"id": "3", "title": "Video 1", "viewCount": 1000, "likeCount": 100},
                  {"id": "0", "title": "Video 2", "viewCount": 356, "likeCount": 200},
                  {"id": "2", "title": "Video 3", "viewCount": 20000, "likeCount": 4556}]
    expect(tools.processVideos(videos)).toEqual(result);
  });
})
