/**
 * Created by mbahar on 11/4/15.
 */


function stackCluster (stackLimit) {

    "use strict";
    this.stackLimit= stackLimit;
    this.stackCluster = new Array();


    this.createStack = function () {

        this.stackCluster.push (new Array());
        return this.stackCluster[this.stackCluster.length-1];

    };

    this.findStack = function () {

        var activeStack=false;

        // check last stack's capacity
        if (this.stackLimit > this.stackCluster[this.stackCluster.length-1].length  )
            activeStack=  this.stackCluster[this.stackCluster.length-1];

        if (!activeStack)
            activeStack= this.createStack();


        return activeStack;

    };

    this.push = function (value) {

        this.findStack().push(value);
        if (value==33)
            console.log();
    };

    this.pop = function () {

        return this.stackCluster[this.stackCluster.length-1].pop();

    };

    // constructor
    // create the first stack
    this.createStack ();

}


var myStack= new stackCluster(15);

myStack.push (1);
myStack.push (11);
myStack.push (111);


for (var i=15; i<1030; i++)
    myStack.push (i);


myStack.pop ();

console.log (myStack.stackCluster);
