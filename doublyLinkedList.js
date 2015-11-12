/**
 * Created by mbahar on 11/4/15.
 */


function linkedinList () {
    "use strict";
    this.head=null;


    this.push = function (value) {

        // check if it is the head
        if (!this.head) {
            this.head={ value: value, next : null, previous:null } ;
        }else {

            var head = this.head;
            var current=head;
            var previous=head;
            // find the tail
            // cascaded

            while (current && current.next) {
                previous=current;
                current = current.next;
            }

            // add new node to tail
            current.next = { value: value, next : null, previous:current } ;

        }

        console.log ('------ Added > ' + value );

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

    // reverse the doubly linked list without using extra space
    this.reverse = function () {

        // start tracking from the head
        var current = this.head;

        // walk the LL
        var index=0;
        while (current) {

            var tmpNext= current.next;

            current.next=current.previous;
            current.previous=tmpNext;

            // set last node as head
            if (!tmpNext)
                this.head = current;

            current=tmpNext;

        }

    }

    this.delNth = function  () {




    }


}


var mylist= new linkedinList();

mylist.push ('apple');
mylist.push ('joy');
mylist.push ('banana');
mylist.push ('xyz');

mylist.pop ('joy');

 console.log (mylist.head);
 console.log ('-------------   will be reversed --------------');


mylist.reverse();

console.log (mylist.head);



