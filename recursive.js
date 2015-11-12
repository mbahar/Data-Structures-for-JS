
// O(2 exp n)
function sum (n) {
    "use strict";
    if (n <=0)
        return 1;

    return sum (n-1) + sum (n-1);
}


console.log (sum (10));