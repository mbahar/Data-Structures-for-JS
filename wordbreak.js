/**
 * @param {string} s
 * @param {set<string>} wordDict
 *   Note: wordDict is a Set object, see:
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {

    var numOfCharactersMatched=0;

    for (var item in wordDict) {

        if ( s.search ( wordDict[item] ) != -1)
            numOfCharactersMatched= numOfCharactersMatched + wordDict[item].length;

    }

    if (numOfCharactersMatched == s.length)
        return true;

    return false;


};

console.log (wordBreak ("leetcode", ["leet","code"]));

