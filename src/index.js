import 'normalize.css';
import './styles.css';
import Tree from './binarySearchTree.js'
import generateArray from './arrayGenerator.js'
import display from './display.js'

const arrayButton = document.getElementById('generator');
const buildButton = document.getElementById('build-tree');
const insertButton = document.getElementById('insert');

const buffer = (() => {
    const bufferObject = {
        tree: undefined,
        checkArray: [],
    }

    const readArray = () => {
        return bufferObject.checkArray;
    }

    const setArray = (object) => {
        bufferObject.tree = object;
        bufferObject.checkArray = [...object.data]
    }

    const printTree = () => {
        bufferObject.tree.print();
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

    const insertNumber = (number) => {
        bufferObject.tree.insert(number);
        bufferObject.checkArray.push(number)
    }

    return {
        readArray,
        setArray,
        printTree,
        treeStats,
        insertNumber
    }
})();

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
}

display.fadeUI();
console.log(display)

arrayButton.addEventListener('click', handleGenerator);

export default buffer;

