/**
 * Created by mbahar on 11/4/15.
 */


function linkedinList () {
    "use strict";
    this.head=null;

    this.push = function (value) {

        var newNode = { value: value, next : null };

        // check if it is the head
        if (!this.head) {
            this.head=newNode;
        }else {

            var current = this.head;

            // find the tail
            // cascaded
            while (current.next) {
                current = current.next;
            }

            // add new node to tail
            current.next = newNode;

        }

    };

    this.pop = function (value) {

        // staring position for the cursor
        var currentNode= this.head;

        // case 1 - item is the head
        if (currentNode.value == value) {

            this.head = currentNode.next;

        } else {

            // initial for the cursor
            var previous = currentNode;

            // rebuild the list so tha
            while (currentNode.next) {

                if (currentNode.value == value) {
                    // skip the current
                    previous.next = currentNode.next;
                    break;
                }

                // move cursor
                previous = currentNode;

                // jump to next node
                currentNode = currentNode.next;

            }

            // check for last item
            if (currentNode.value == value) {
                currentNode.next = value;
            }
        }

    };

    this.reverse = function () {

        var current = this.head;
        var nodes=new Array();

        // walk the LL
        while (current) {
            nodes.unshift({ value : current.value , next: null});
            current=current.next;
        }

        // re-build the list
        //head

        this.head=null;

        nodes.forEach(function (node) {
            this.push(node.value);
        },this);

        console.log (this.head);


    }

    this.getNthEnd = function (n) {

        var head = this.head;
        var index=1;
        var nthNode;

        while (head) {

            if (n == index)
                nthNode=head;
            else if (index-n>1){
                nthNode=head;

            }


            // jump to next
            head=head.next;
            index++;

        }


        return nthNode;

    }

    this.delNth = function (n) {

        // initial
        var currentNode = this.head;
        var previousNode=null;

        var index=1;
        var nthNode;

        // scan nodes
        while (currentNode) {

            // we are deleting the head
            if (index ==  n )
                nthNode = this.head;

            // shifting nthNode while index > n
            if ( index > n  ){
                previousNode=nthNode;
                nthNode = nthNode.next;
            }

            // jump to next
             currentNode=currentNode.next;

            index++;

        }

        if(!previousNode)
            this.head = this.head.next;
        else{
            previousNode.next = nthNode.next;
        }


        return nthNode;

    }


    this.findCollision = function () {

        var current=this.head;
        var slowPointer=this.head;
        var fastPointer=this.head;

        while (fastPointer != null && slowPointer.next !=null) {

            slowPointer=slowPointer.next;
            fastPointer=fastPointer.next.next;

            // collision
            if ( slowPointer == fastPointer)
                break;
        }

        // noo loop
        if (this.head && slowPointer != fastPointer)
            return false;

        slowPointer=this.head;

        // come back to collution pointe by N steps
        // they are equally far from collution point
        while (slowPointer) {
            slowPointer=slowPointer.next;
            fastPointer=fastPointer.next; // circular

            if (slowPointer == fastPointer)
                return slowPointer;
        }

        return false;


    };

    this.createLoop = function (n) {

        var current=this.head;
        var index=1;
        var loopHead, tail;


        while (current.next) {

            if (n==index)
                loopHead=current;

            // next node
            index++;
            current=current.next;
        }

        tail=current;

        // create loop
        tail.next=loopHead;

    }
}


var mylist= new linkedinList();

mylist.push ('apple');
mylist.push ('joy');
mylist.push ('banana');
mylist.push ('xyz');
mylist.push ('abc');
mylist.push ('eeeeee');

for (var i=0 ; i < 50000; i++)
    mylist.push (i);


mylist.createLoop(10000);


console.log ('Collision at:', mylist.findCollision());



