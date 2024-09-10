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

    // console.log(root)
    // console.log(start)
    // console.log(end)
    // console.log(mid)

    return root;
  };

  const breadthTraverse = (callbackFn) => {
    if (typeof callbackFn !== "function") {
      throw new Error("No callback function provided.");
    }

    // create a first in first out queue
    let queueFIFO = [];

    function discoverNodes(callbackFn) {
      if (root === null) return;
      queueFIFO.push(root);

      while (queueFIFO.length > 0) {
        let current = queueFIFO[0];
        callbackFn(queueFIFO[0]);
        if (current.left !== null) queueFIFO.push(current.left);
        if (current.right !== null) queueFIFO.push(current.right);
        queueFIFO.shift();
      }
    }
    discoverNodes(callbackFn);
  };

  const inOrder = (root, callbackFn) => {
    if (typeof callbackFn !== "function") {
      throw new Error("No callback function provided.");
    }

    if (root == null) return;

    inOrder(root.left, callbackFn);
    callbackFn(root);
    inOrder(root.right, callbackFn);
  };

  const preOrder = (root, callbackFn) => {
    if (typeof callbackFn !== "function") {
      throw new Error("No callback function provided.");
    }

    if (root == null) return;

    callbackFn(root);
    preOrder(root.left, callbackFn);
    preOrder(root.right, callbackFn);
  };

  const postOrder = (root, callbackFn) => {
    if (typeof callbackFn !== "function") {
      throw new Error("No callback function provided.");
    }
    if (root.left == null && root.right == null) return callbackFn(root);

    if (root.left != null) postOrder(root.left, callbackFn);
    if (root.right != null) postOrder(root.right, callbackFn);

    return callbackFn(root);
  };

  // return the maximum height of the provided node.
  const height = (root, heightArray, rootHeight = 0) => {
    // escape case: if node has no children, print height
    if (root === null) return heightArray.push(rootHeight);
    rootHeight++;
    height(root.left, heightArray, rootHeight);
    height(root.right, heightArray, rootHeight);
    
  };

  const getHeight = (root) => {
    let heightArray = []
    height(root, heightArray)

    heightArray.sort(compareNumbers)

    return heightArray[heightArray.length - 1]
  };

  const isBalanced = (root) => {
    let heightArray = []
    height(root, heightArray)

    heightArray.sort(compareNumbers)

    let difference = heightArray[heightArray.length - 1] - heightArray[0]

    if (difference > 1) return false
    return true
    
  };

  const getDepth = (queryNum) => {
    let depth
    function depthFunc(root, queryNum, height = 0) {
      if (root === null) return
      if (root.data === queryNum) return depth = height
      depthFunc(root.left, queryNum, height+1)
      depthFunc(root.right, queryNum, height+1)
    }
    depthFunc(root,queryNum)
    if (Number.isInteger(depth)) return console.log(`Depth of value ${queryNum} is ${depth}.`)
    console.log('value not found')
  }

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

  // use return value of the BBST function for root
  let root = buildTree(array);

  return {
    root,
    insert,
    deleteItem,
    insert,
    getSuccessor,
    breadthTraverse,
    inOrder,
    preOrder,
    getHeight,
    getDepth,
    isBalanced
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

// const myTree = Tree([1,2,1,1,1])

// const myTree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
const myTree = Tree([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
]);

// myTree.insert(myTree.root, 18)
// myTree.insert(myTree.root, 19)
// myTree.insert(myTree.root, 20)
// myTree.insert(myTree.root, 21)
// myTree.insert(myTree.root, 22)
// myTree.insert(myTree.root, 23)


console.log("Created Tree. Printing tree:");
prettyPrint(myTree.root);

const consoleLog = (data) => {
  console.log(data);
};

// myTree.getHeight(myTree.root)
// myTree.getDepth(24) // output

console.log(myTree.isBalanced(myTree.root))

// myTree.breadthTraverse(consoleLog)

// myTree.preOrder(myTree.root, consoleLog);

// console.log(returnBiggestNumber.returnTheBiggestNumber())

// returnBiggestNumber.checkBiggestNumber(3)

// console.log(returnBiggestNumber.returnTheBiggestNumber())

// returnBiggestNumber.checkBiggestNumber(2)

// console.log(returnBiggestNumber.returnTheBiggestNumber())

// returnBiggestNumber.resetBiggestNumber()

// console.log(returnBiggestNumber.returnTheBiggestNumber())


// let array = [myTree.height(myTree.root)]
// console.log(array)

// console.log("Inserting 40")
// myTree.insert(myTree.root, 40)
// prettyPrint(myTree.root);

// console.log("Inserting 30")
// myTree.insert(myTree.root, 30)
// prettyPrint(myTree.root);

// console.log("Inserting 6344")
// myTree.insert(myTree.root, 6344)
// prettyPrint(myTree.root);

// console.log("Deleting 8")
// myTree.deleteItem(myTree.root, 8)
// prettyPrint(myTree.root);

//console.log('bahinga')
