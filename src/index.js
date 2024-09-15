import "./styles.css";
import { Node, Tree, prettyPrint } from "./node";

function driverScript() {
  let array = [];
  for (let i = 0; i < 100; i++) {
    array.push(getRandomInt(1, 100));
  }
  // create the Tree
  const myTree = Tree(array);
  prettyPrint(myTree.root);
  // verify the tree is balanced
  console.log(myTree.isBalanced());

  // add values > 100 and unbalance tree
  for (let i = 0; i < 20; i++) {
    myTree.insert(myTree.root, getRandomInt(100, 200));
  }

  prettyPrint(myTree.root);

  // verify the tree is unbalanced
  console.log(myTree.isBalanced());

  myTree.rebalance();

  // verify the tree is balanced
  console.log(myTree.isBalanced());

  // myTree.breadthTraverse(consoleLog);
  // myTree.preOrder(consoleLog);
  // myTree.postOrder(consoleLog);
  // myTree.inOrder(consoleLog);
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
