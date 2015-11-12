/**
 * Created by mbahar on 11/4/15.
 */


function BST () {

    "use strict";
    this.root=null;

    this.search = function (value , options ) {

        // start from root
        var currentNode= this.root;
        var found=false;

        if (!currentNode)
            return false;

        while (currentNode) {

            // Break the loop when find the node in findNode mode
            // found the node in find mode
            if (options.mode == 'findNode')
                if (currentNode.value == value) {
                    found= currentNode;
                    break;
                }

            // skip to next branch
            // if available
                if (value > currentNode.value )

                    if (currentNode.right)
                        currentNode = currentNode.right;
                    else {
                            // no node found; node can be added to right
                            if (options.node == 'findLocation' )
                                return currentNode.right;

                            break;
                        }
                else

                    if (currentNode.left)
                        currentNode = currentNode.left;
                    else {

                            // no node found; node can be added to left
                            if (options.node == 'findLocation' )
                                return currentNode.left;

                            break;

                    }

        }

        return currentNode;

    };

    this.add = function (value) {

        var currentNode = this.search (value, {mode: 'findLocation'});

        var newNode= {
            value:value,
            left:null,
            right:null
        };

        // check for root availibility
        if (!this.root)
            this.root = newNode;
        // add to the correct position
        else
            if (value > currentNode.value)
                currentNode.right =newNode;
            else
                currentNode.left =newNode;

    };

    this.contains = function (value) {

        if (this.search(value,{mode: 'findNode'}))
            return true;
        else
            return false;

    };

    this.traverse = function (process) {

         function inOrder (node,level) {

             if (!node)
                return;

             if (node.left)
                 inOrder(node.left);

              process (node);

             if (node.right)
                 inOrder(node.right);

         }


        // run it recursive
        inOrder(this.root,1);

    };

    this.toArray = function () {

        var result=new Array();

        this.traverse(function (node) {
            result.push (node.value);
        });

        return result;
    }

    this.isBalanced = function () {

        var currentNode= this.root;

        var getHeight  = function (node){

            if (!node)
                return 0;

            var height=0;

            if (!node.left && !node.right)
                return 0;

            if (node.left || node.right)
                height ++;

            var height_left=  getHeight(node.left);
            var height_right=  getHeight(node.right);

            if (height_left == -1 || height_right == -1)
                return -1;

            if ( Math.abs( height_left - height_right ) > 1)
                return -1;


            return height + Math.max ( height_left , height_right);

        };


        var height_left=  getHeight(currentNode.left) ;
        var height_right=  getHeight( currentNode.right);

        if (height_left == -1 || height_right == -1)
            return false;

        if ( Math.abs( height_left - height_right ) > 1)
            return false;
        else
            return true;

    }

    this.isSubTree= function (masterBTS) {

        var myRoot= this.root;

        var check = function(btsRoot) {

            var matchTree = function (tree1_root,tree2_root) {

                // end of recursion
                if (tree1_root == null && tree2_root == null)
                    return true;

                if (tree1_root == null ||  tree2_root == null)
                    return false;

                if (tree1_root.value != tree2_root.value)
                    return false;

                matchTree(tree1_root.left, tree2_root.left);
                matchTree(tree1_root.right, tree2_root.right);

            };

            var searchRootInBST = function (node, process ) {

                var process = function (node) {

                    if(matchTree(node,myRoot) == false )
                        return false;
                    else
                        return true;

                };

                if (node) {

                    if (node.left)
                        searchRootInBST(node.left);

                    // find the root
                    if (node.value == myRoot.value) {
                        if (process (node))
                            return true;
                    }


                    if (node.right)
                        searchRootInBST(node.right);

                }


            };

            // kick-off recursion
            if (searchRootInBST (btsRoot))
                return true;
            else
                return false;



        };


        // traverse bts to match the root item
        return check (masterBTS.root);

    }

}

var myTree= new BST();
var myTree2= new BST();


myTree.add (5);
myTree.add (2);
myTree.add (30);



myTree2.add (5);
myTree2.add (2);
myTree2.add (30);


var start = new Date().getSeconds();
for (i =0; i <5  ; i++) {
 //myTree.add (parseInt ( Math.random()*i));
}

//console.log ('BST ',myTree.root);

console.log ('--');

console.log ('isSub tree:', myTree2.isSubTree(myTree));




