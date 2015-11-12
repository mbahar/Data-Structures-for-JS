/**
 * @constructor
 */
var LRUCache = function(capacity) {

    "use strict";


    var LRUCache=this;

    // The expiration que for the cache is a doubly-linked list
    this.expireQue={

        // This is the head of doubly-linked list
        // The item on the head will be expired first
        head:null,

        // We keep a reference to the tail; for enabling append operation in  O(1) time
        // Will be updated every time the tail changes
        tail:null,

        // Will add a new ket to expiration que
        // Remember we are adding to the tail (not head)
        insert: function (key) {

            // Insert the key to the expiration que
            // we are adding to the tail

            // we are at the head
            if (!this.head)
            {

                var newNode = {
                    key : key,
                    next: null,
                    previous :null
                };

                this.head =  newNode;
                this.tail=newNode;

                return;

            // we are in the middle of at the tail;
            } else {

                var newNode= {
                    key : key,
                    next: null,
                    previous :this.tail
                };

                // add to tail
                this.tail.next = newNode;
                this.tail=newNode;

            }

        },

        // Will expire the head  and will return expired key
        pop: function () {

            // Expire the item on the head by popping up the head
            // The new head is the NEXT of old head

            var keyToExpire=this.head.key;

            this.head.next.previous=null;
            this.head = this.head.next;

            console.log ('Expired:', keyToExpire);
            return keyToExpire;

        },

        // Will refresh the cache item by shifting the item in the list towards the tail
        // Remember; the closer an item to the tail, the later it will be expired
        refresh: function (node) {

            // shift the node (3) to right
            // 1-2-(3)->4-5
            // 1-2-4-(3)->5

            if (!node)
                return;


            // THE NODE IS ON THE HEAD
            if (! node.previous)  {
                // so, head will change
                // next item will be new head, node will be the first next
                if (node.next) {
                    this.head = node.next;
                    this.head.next=node;
                    this.head.next.next=null;
                    this.head.previous=null;
                    this.tail=node;
                    return;
                }

            }

            // NODE IS ON THE MIDDLE
            if (node.previous && node.next) {

                node.previous.next = node.next;
                node.next.next=node;
                node.next.previous=node.previous;

                // item after next (5)
                if (node.next.next) {
                    node.next.next.previous=node;
                }

                // node (3)
                if (node.next.next)
                    node.next=node.next.next;

                node.previous=node.next;
            }


            // NODE IS ON THE TAIL
            // next item (4)
            if (!node.next) {
                // we are good, do nothing
                this.tail=node;
                return;
            }

        },

        // Will return the que as an array
        getArray : function () {

            var node= this.head;
            var arr = [];

            while (node) {
                arr.push (node.key);
                node = node.next;
            }

            return arr;

        },

        // Will validate the doubly-linked list if all nodes are pointing to correct nodes and
        // there is no loops in the list
        validate: function () {

            var node= this.head;
            var arr = [];

            var nextNode=node.next;
            var previousNode = node.previous;


            while (node) {

                if (nextNode && node.next !== nextNode)
                    return false;

                if (previousNode && node.previous !== previousNode)
                    return false;

                // jump to next
                node = node.next;

                nextNode=node.next;
                previousNode = node.previous;

            }

            return arr;

        }



    };

    // Cache data is an associate array
    this.cache=new Array();

    // The capacity of the cache
    // If the capacity is acceded we will expire items from the cache
    this.capacity=capacity,

    // Will check if the cache is full
    this.isOverflow = function () {

        if (Object.keys(LRUCache.cache).length >  LRUCache.capacity )
            return true;
        else
            return false;

    }

};

/**
 * @param {number} key
 * @returns {number}
 */
LRUCache.prototype.get = function(key) {

    var self=this;

    if (!key)
        return -1;

    var cacheHit = function (key) {
        "use strict";

        var currentNode=self.expireQue.head;

        while (currentNode) {

            // 1-2-(3)-4-5 will be 1-2-4-(3)-5
            if (currentNode.key == key) {
                console.log ('Refreshing:', key,'. old head: ', self.expireQue.getArray(), ', total cache items:', Object.keys(self.cache).length);
                self.expireQue.refresh(currentNode);
                console.log ('New Head:',self.expireQue.getArray());
            }

            currentNode=currentNode.next;

        }


    };

    var getValue = function (callback) {

        cacheHit(key);

        var value =self.cache[key];

        if (!value)
            return -1 ;


        callback(key);
        return value;

    };

    var value = getValue(function (key) {
        "use strict";
        cacheHit(key);
    });

    return value;

};

/**
 * @param {number} key
 * @param {number} value
 * @returns {void}
 */
LRUCache.prototype.set = function(key, value) {

    var self=this;

    if (!value || !key)
        return -1;

    var setCache = function () {
        "use strict";

        self.cache[key]= value;
        self.expireQue.insert(key);

    };


    if (this.isOverflow())
        // Delete a key from cache
        delete self.cache[self.expireQue.pop()];

    setCache();


};

var cache= new LRUCache (5);

cache.set ('1a','val');

cache.set ('apple','val');

 cache.get('1a');

cache.set ('3a','3');

cache.get('1a');

cache.set ('4a','45');
cache.get('1a');

cache.set ('5a','55');
cache.get('1a');

cache.set ('6a','66');
cache.get('1a');

cache.set ('7a','77');
cache.get('1a');


cache.set ('9a','99');
cache.get('1a');

cache.set ('10a','100');

console.log('--------------------------------------------');

console.log(cache.expireQue.head);
console.log('-----------');
console.log(cache.cache);
