import 'normalize.css';
import './styles.css';
import Tree from './binarySearchTree.js'
import generateArray from './arrayGenerator.js'
import display from './display.js'

const arrayButton = document.getElementById('generator');
const buildButton = document.getElementById('build-tree');

const buffer = (() => {
    const bufferObject = {
        tree: undefined,
    }

    const readArray = () => {
        return bufferObject.tree.data;
    }

    const setArray = (object) => {
        bufferObject.tree = object;
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

    return {
        readArray,
        setArray,
        printTree,
        treeStats
    }
})();

const handleGenerator = () => {
    const array = generateArray();
    const tree = new Tree(array)
    buffer.setArray(tree);
    display.array();
}

const handleBuild = () => {
    display.tree();
}

display.fadeUI();

arrayButton.addEventListener('click', handleGenerator);
buildButton.addEventListener('click', handleBuild);

export default buffer;

