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
  array = [...new Set(array)]

  console.log(array)
  
  // use recursion to build the balance binary search tree
  // requires a sorted array
  const buildTree = (array, start = 0, end = array.length - 1) => {
    if (start > end) return null;
    const mid = Math.ceil((start + end) / 2);

    //escape if it's trying to access an out of range value.
    if (mid === array.length) return null
    let root = new Node(array[mid]);
    
    root.left = buildTree(array, start, mid - 1);
    root.right = buildTree(array, mid + 1, end);

    // console.log(root)
    // console.log(start)
    // console.log(end)
    // console.log(mid)

    return root;
  };

  const traverse = (root) => {
    if (root.left == null && root.right == null) return console.log(root)

    if (root.left != null) traverse(root.left)
    if (root.right != null) traverse(root.right)

    return console.log(root)
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
        return root.right
      }
      
      if (root.right === null) {
        return root.left
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

  return { root, insert, deleteItem, insert, getSuccessor, traverse };
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

const myTree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log('Created Tree. Printing tree:')
prettyPrint(myTree.root);

myTree.traverse(myTree.root)

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
