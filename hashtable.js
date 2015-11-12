/**
 * Created by mbahar on 11/3/15.
 */


"use strict";

function hashTable (obj) {

    this.length=0;
    this.item={};


    for (var itemIndex in obj)
        if (obj.hasOwnProperty(itemIndex)) {
            this.item[itemIndex]=obj[itemIndex];
            this.length ++;
        }


}

var myTable  = new hashTable ({one: 1, two: 2, three: 3, "i'm no 4": 4});

console.log (myTable);

