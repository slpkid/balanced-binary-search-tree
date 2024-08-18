function Node(data) {
  let left = null;
  let right = null;
  return { data, left, right };
}

function Tree(array) {

    const compareNumbers = (a,b) => {return a - b}

    array = array.sort(compareNumbers)

    // console.log(array)
    
    const buildTree = (array, start = 0, end = array.length) => {
        if (start > end) return null
        const mid = (start + end) / 2
        let root = new Node(array[mid])

        root.left = buildTree(array, start, mid-1)
        root.right = buildTree(array, mid+1, end)
        return root
        
    }     

    let root = buildTree(array);

    return { root };
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

const myTree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
prettyPrint(myTree.root)
//console.log('bahinga')