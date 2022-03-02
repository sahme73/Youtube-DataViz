
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


