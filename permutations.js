
// O(2 exp n)
function perm (str) {
    "use strict";

    var permutations=[];

    var reverse= function (str) {

        var reversedStr='';

        for (var i=str.length; i > -1 ; i -- ) {
            reversedStr = reversedStr +  str.substr(i,1);
        }

        return reversedStr;

    };

    var isExist = function (value) {

        for (var item in permutations)
            if (permutations[item] == value)
                return true;

        return false;

    };

    var createPerm = function (str) {

        for (var i=0; i < str.length ; i ++ ) {
            for (var z=i+1; z < str.length; z ++) {

                if (!isExist( str.substr(i,z)))
                    permutations.push (str.substr(i,z));

                if (!isExist(reverse ( str.substr(i,z))))
                    permutations.push (reverse ( str.substr(i,z)));

            }
        }

        return permutations;

    };


    return createPerm (str);



}


console.log (perm ('pressworld'));