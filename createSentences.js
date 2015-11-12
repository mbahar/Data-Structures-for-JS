/**
 * @param {string} s
 * @param {set<string>} wordDict
 *   Note: wordDict is a Set object, see:
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 * @return {string[]}
 */
var wordBreak = function(s, wordDict) {

    var checkWordWithDict = function (word) {

        for (var item in wordDict) {
            if (wordDict[item] == word)
                return true;
        }

        return false;

    };


    var createWords = function () {

        var word='';
        var words=[];

        for (var i=0; i < s.length ; i ++)
            for (var j=0; j < s.length-i + 1; j ++) {
                word=s.substr (i,j);
                 if (checkWordWithDict (word))
                    words.push ({
                        word: word ,
                        start:i,
                        end:j}
                    );
            }

         return words;

    };

    var createSentences = function (words) {

        var sentences=[];
        var cursor=0;
        var spacePosition=[];

        var completeSentence = function (sentenceLeftPart, cursorPosition) {

            var find_next_word=false;

            console.log(sentenceLeftPart,cursorPosition);

            if (cursorPosition >=  s.length) {
                sentences.push (sentenceLeftPart);

                // end of recursion
                return;
            }

            for (var item in words) {
                if (words[item].start == cursorPosition ) {
                    find_next_word=true;
                    var temp_sentence=sentenceLeftPart + words[item].word + ' ';
                    var new_cursor=words[item].end;
                    completeSentence (temp_sentence, new_cursor) ;
                }
            }

            if (!find_next_word)
                return;

        };


        completeSentence ('',  0);
        return sentences;

     };

    return createSentences(createWords());

};


console.log (wordBreak("catsanddog", ["cat","cats","and","sand","dog"]));