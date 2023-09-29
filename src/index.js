import 'normalize.css';
import './styles.css';
import Tree from './binarySearchTree.js'
import generateArray from './arrayGenerator.js'
import display from './display.js'

const arrayButton = document.getElementById('generator');
const buildButton = document.getElementById('build-tree');
const insertButton = document.getElementById('insert');
const deleteButton = document.getElementById('delete');
const findButton = document.getElementById('find');
const rebalanceButoon = document.getElementById('balance-tree');

const buffer = (() => {
    const bufferObject = {
        tree: undefined,
        checkArray: [],
        findNode: undefined
    }

    const readArray = () => {
        return bufferObject.checkArray;
    }

    const setArray = (object) => {
        bufferObject.tree = object;
        bufferObject.checkArray = [...object.data]
    }

    const printTree = (node) => {
        bufferObject.tree.print(node);
    }

    const treeStats = () => {

        const levelOrder = bufferObject.tree.levelOrder();
        const inOrder = bufferObject.tree.inorder();
        const preOrder = bufferObject.tree.preorder();
        const postOrder = bufferObject.tree.postorder();
        const isBalanced = bufferObject.tree.isBalanced();

        return {
            isBalanced,
            levelOrder,
            inOrder,
            preOrder,
            postOrder,
        }
    }

    const nodeStats = (value) => {
        const node = bufferObject.tree.find(value);
        const height = bufferObject.tree.height(node);
        const depth = bufferObject.tree.depth(node);

        return {
            height,
            depth
        }
    }

    const passFindNode = () => {
        return bufferObject.findNode;
    }

    const insertNumber = (number) => {
        bufferObject.tree.insert(number);
        bufferObject.checkArray.push(number)
    }

    const deleteNumber = (number) => {
        bufferObject.tree.delete(number);
        const index = bufferObject.checkArray.indexOf(number);
        bufferObject.checkArray.splice(index, 1);
    }

    const findNode = (value) => {
        const node = bufferObject.tree.find(value);
        if (node !== null) {
            bufferObject.findNode = node;
            display.find();
        }
        else display.promtNotFound();
    }

    const balanceTree = () => {
        bufferObject.tree.rebalance();
    }

    return {
        readArray,
        setArray,
        printTree,
        treeStats,
        nodeStats,
        insertNumber,
        deleteNumber,
        findNode,
        passFindNode,
        balanceTree
    }
})();

const handleRebalance = () => {
    const stats = buffer.treeStats();
    const isBalanced = stats.isBalanced;
    if (isBalanced === true) {
        display.errorPromtBalance()
        return
    } else {
        buffer.balanceTree();
        display.tree();
        display.promtBalance();
    }
}

const handleFind = () => {
    const input = document.getElementById('find-input');
    const number = parseInt(input.value, 10);
    if (input.value === '') {
        display.errorPromtFind();
        return
    } else {
        buffer.findNode(number);
    }
}

const handleDelete = () => {
    const input = document.getElementById('delete-input');
    const number = parseInt(input.value, 10);

    if (input.value === '0') {
        display.errorPromtDelete();
        return
    } else {
        buffer.deleteNumber(number);
        display.promptDelete(number);
        display.tree();
        display.array();
    }
}

const handleInsert = () => {
    const input = document.getElementById('insert-input');
    const data = buffer.readArray();
    const number = parseInt(input.value, 10);

    if (input.value === '') {
        display.errorPromtInsert();
        return;
    } else if (number < 100) {
        display.errorPromtTooSmall();
        return;
    } else if (number > 999) {
        display.errorPromtTooBig();
        return
    } else if (data.includes(number)) {
        display.errorPromtDuplicate();
        return
    } else {
        buffer.insertNumber(number);
        display.promtInsert(number);
        display.tree();
        display.array();
    }
}

const handleGenerator = () => {
    const array = generateArray();
    const tree = new Tree(array)
    buffer.setArray(tree);
    display.array();
    display.generatorPromtArray();
    buildButton.addEventListener('click', handleBuild);
}

const handleBuild = () => {
    display.tree();
    insertButton.addEventListener('click', handleInsert);
    deleteButton.addEventListener('click', handleDelete);
    findButton.addEventListener('click', handleFind);
    rebalanceButoon.addEventListener('click', handleRebalance);
}

display.fadeUI();

arrayButton.addEventListener('click', handleGenerator);

export default buffer;

