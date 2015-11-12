
function replace (str,insertStr) {
    "use strict";

    var  toTheRight='',
        newTextRight='';

    for (var i=str.length -1 ; i >=0; i --) {
        if (str.substr(i,1)== ' ') {
             toTheRight=str.substr(i+1);
             newTextRight= insertStr + toTheRight;
             str = str.substr(0,i) + newTextRight;
        }
    }


    return str;

}

function encodeStr (str) {
    "use strict";

    var createEndodedStr = function (arr) {

        var str='';

        for (var item in arr) {
            str= str + item + arr[item];
        }

        return str;

    };

    var createFrequencies = function (str) {

        var charFrequencies=new Array ();

        for (var i=0; i < str.length ; i++) {

            if (typeof  (charFrequencies[str[i]]) == 'undefined')
                charFrequencies[str[i]]=1;
            else
                charFrequencies[str[i]]++;
        }

        return charFrequencies;

    };

    var encodedStr= createEndodedStr(createFrequencies(str));

    if (encodedStr.length > str.length)
        return str;

    return encodedStr;

}

console.log(encodeStr ('aabbccddddddeeeeeff'));
