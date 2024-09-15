function Node(data) {
  let left = null;
  let right = null;
  return { data, left, right };
}

function Tree(array) {
  // sort the given array
  const compareNumbers = (a, b) => {
    return a - b;
  };

  // sort the provided array
  array = array.sort(compareNumbers);

  //remove duplicate values
  array = [...new Set(array)];

  // use recursion to build the balance binary search tree
  // requires a sorted array
  const buildTree = (array, start = 0, end = array.length - 1) => {
    if (start > end) return null;
    const mid = Math.ceil((start + end) / 2);

    //escape if it's trying to access an out of range value.
    if (mid === array.length) return null;
    let root = new Node(array[mid]);

    root.left = buildTree(array, start, mid - 1);
    root.right = buildTree(array, mid + 1, end);

    return root;
  };

  // use return value of the BBST function for root
  let root = buildTree(array);

  const breadthTraverse = function(callbackFn) {
    if (typeof callbackFn !== "function") {
      throw new Error("No callback function provided.");
    }

    // create a first in first out queue
    let queueFIFO = [];

    function discoverNodes(callbackFn, root) {
      if (root === null) return;
      // initialize the queue
      queueFIFO.push(root);

      while (queueFIFO.length > 0) {
        // make the first item in queue the current value
        let current = queueFIFO[0];
        // execute the callback on the current value
        callbackFn(queueFIFO[0]);
        // enqueue the child nodes
        if (current.left !== null) queueFIFO.push(current.left);
        if (current.right !== null) queueFIFO.push(current.right);
        // dequeue first item
        queueFIFO.shift();
      }
    }
    discoverNodes(callbackFn, this.root);
  };

  const inOrder = function (callbackFn, node = this.root) {
    if (typeof callbackFn !== "function") {
      throw new Error("No callback function provided.");
    }

    if (node == null) return;

    inOrder(callbackFn, node.left);
    callbackFn(node);
    inOrder(callbackFn, node.right);
  };

  const preOrder = function (callbackFn, node = this.root) {
    if (typeof callbackFn !== "function") {
      throw new Error("No callback function provided.");
    }

    if (node  == null) return;

    callbackFn(node);
    preOrder(callbackFn, node.left);
    preOrder(callbackFn, node.right);
  };

  const postOrder = function (callbackFn, node = this.root) {
    if (typeof callbackFn !== "function") {
      throw new Error("No callback function provided.");
    }

    if (node  == null) return;

    postOrder(callbackFn, node.left);
    postOrder(callbackFn, node.right);
    callbackFn(node);
  };

  // return the maximum height of the provided node.
  const height = (root, heightArray, rootHeight = 0) => {
    // escape case: if node has no children, print height
    if (root === null) {
      return heightArray.push(rootHeight);
    }
    height(root.left, heightArray, rootHeight + 1);
    height(root.right, heightArray, rootHeight + 1);
  };

  const getHeight = function () {
    let heightArray = [];
    height(this.root, heightArray);

    heightArray.sort(compareNumbers);

    return heightArray[heightArray.length - 1];
  };

  const isBalanced = function () {
    let heightArray = [];
    // generate array containing heights of all the tree's heights
    height(this.root, heightArray);

    heightArray.sort(compareNumbers);

    let difference = heightArray[heightArray.length - 1] - heightArray[0];

    if (difference > 1) return false;
    return true;
  };

  const rebalance = function () {
    // create empty array
    let newRootArray = [];
    function pushToNewArray(num) {
      newRootArray.push(num.data);
    }
    // traverse through current tree and push each value
    preOrder(pushToNewArray, this.root);

    this.root = null

    // newRootArray.forEach( number => {
    //   deleteItem(this.root, number)
    // })
    
    // reassign root to a tree built from the new values.
    this.root = buildTree(newRootArray);
  };

  const getDepth = (queryNum) => {
    let depth;
    function depthFunc(root, queryNum, height = 0) {
      if (root === null) return;
      // value of the node matches queried number,
      // assign depth to the value of height
      if (root.data === queryNum) return (depth = height);
      depthFunc(root.left, queryNum, height + 1);
      depthFunc(root.right, queryNum, height + 1);
    }
    depthFunc(root, queryNum);
    // if depth has been assigned a numerical value
    // return it
    if (Number.isInteger(depth)) {
      return console.log(`Depth of value ${queryNum} is ${depth}.`);
    } else {
      console.log("value not found");
    }
  };

  const insert = (root, value) => {
    // if insert is run on a null node
    // return a new node using the value
    if (root === null) return new Node(value);

    // if the node matches the value, end the insertion
    if (root.data === value) return root;

    if (value < root.data) {
      root.left = insert(root.left, value);
    } else if (value > root.data) {
      root.right = insert(root.right, value);
    }

    return root;
  };

  const getSuccessor = (current) => {
    current = current.right;
    while ((current !== null) & (current.left !== null)) {
      current = current.left;
    }
    return current;
  };

  const deleteItem = (root, value) => {
    //escape case::
    if (root === null) return root;

    if (value < root.data) {
      root.left = deleteItem(root.left, value);
    } else if (value > root.data) {
      root.right = deleteItem(root.right, value);
    } else {
      if (root.left === null) {
        return root.right;
      }

      if (root.right === null) {
        return root.left;
      }

      //when both children are present
      const successor = getSuccessor(root);
      root.data = successor.data;
      root.right = deleteItem(root.right, successor.data);
    }
    return root;
  };

  return {
    buildTree,
    root,
    insert,
    deleteItem,
    insert,
    getSuccessor,
    breadthTraverse,
    inOrder,
    preOrder,
    postOrder,
    getHeight,
    getDepth,
    isBalanced,
    rebalance,
  };
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function driverScript() {
  let array = [];
  for (let i = 0; i < 100; i++) {
    array.push(getRandomInt(1, 100));
  }
  // create the Tree
  const myTree = Tree(array);
  prettyPrint(myTree.root);
  // verify the tree is balanced
  console.log(`Is the tree balanced? This statement is: ${myTree.isBalanced()}`);

  // add values > 100 and unbalance tree
  for (let i = 0; i < 20; i++) {
    myTree.insert(myTree.root, getRandomInt(100, 200));
  }

  prettyPrint(myTree.root);

  console.log(`Tree height is ${myTree.getHeight()}`)
  // verify the tree is unbalanced
  console.log(`Is the tree balanced? This statement is: ${myTree.isBalanced()}`);
  

  console.log(`Rebalancing tree...`)
  myTree.rebalance();
  prettyPrint(myTree.root)
  console.log(`Tree height is ${myTree.getHeight()}`)

  // verify the tree is balanced
  console.log(`Is the tree balanced? This statement is: ${myTree.isBalanced()}`);

  console.log('level order')
  myTree.breadthTraverse(consoleLog);

  console.log('pre order')
  myTree.preOrder(consoleLog);

  console.log('post order')
  myTree.postOrder(consoleLog);

  console.log('in order')
  myTree.inOrder(consoleLog);

}

function consoleLog(input) {
  console.log(input);
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

driverScript();
