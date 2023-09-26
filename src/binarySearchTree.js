import Node from './node.js';
export default class Tree {
    constructor(array) {
        this.source = [...array];
        this.data = this.processInput();
        this.root = this.build(this.data, 0, this.data.length -1);
    }

    build (array, start = 0, end = array.length -1) {
        if (start > end) return null;

        const mid = Math.floor((start + end) / 2);
        const root = new Node(array[mid]);

        root.left = (this.build(array, start, mid -1));
        root.right = (this.build(array, mid +1, end));

        return root;
    }

    processInput() {
        const array = this.source;

        const removeDuplicates = () => {
            const output = [];
            const checkList = {};

            array.forEach(item => {
                if (!checkList[item]) {
                    checkList[item] = true;
                    output.push(item);
                }
            });

            return output;
        }

        return removeDuplicates(array).sort((a, b) => a - b);
    };

    print(node = this.root, prefix = '', isLeft = true) {
        if (node === null) return;

        if (node.right !== null) {
            this.print(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

        if (node.left !== null) {
            this.print(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

    insert(value) {
        let pointer = this.root;
        let previous = null;

        while (pointer !== null) {
            previous = pointer;

            if (value < pointer.data) pointer = pointer.left;
            else pointer = pointer.right;
        }

        if (previous.data > value) previous.left = new Node(value);
        else previous.right = new Node(value);
    }

    delete(value) {
        const findMin = (node) => {
            while (node.left !== null) node = node.left;
            return node.data;
        }

        const deleteNode = (node, value) => {
            if (node === null) return null;

            if (value < node.data) node.left = deleteNode(node.left, value);
            else if (value > node.data) node.right = deleteNode(node.right, value);
            else {
                if (node.left === null) return node.right;
                if (node.right === null) return node.left;

                const minValue = findMin(node.right);
                node.data = minValue;
                node.right = deleteNode(node.right, minValue);
            }

            return node;
        }

        this.root = deleteNode(this.root, value);
    };

    find (value) {
        const findNode = (node, value) => {
            if (node === null || node.data === value) return node;

            if (value < node.data) return findNode(node.left, value);
            else return findNode(node.right, value);
        }

        return findNode(this.root, value);
    };

    levelOrder (callback = null) {
        const result = [];
        if (this.root === null) return result;

        const queue = [];
        queue.push(this.root);

        while (queue.length > 0) {
            const node = queue.shift();
            if (callback) callback(node.data);
            else result.push(node.data);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        if (result.length > 0) return result;
    };

    inorder (_target = this.root, callback = null) {
        const result = [];
        
        const traverse = (node) => {
            if (node === null) return;
            traverse(node.left);
            if (callback === null) result.push(node.data);
            else callback(node.data);
            traverse(node.right);
        }

        traverse(_target);
        if (result.length > 0) return result;
    }

    preorder (_target = this.root, callback = null) {
        const result = [];

        const traverse = (node) => {
            if (callback === null) result.push(node.data);
            else callback(node.data);
            traverse(node.left);
            traverse(node.right);
        }

        traverse(_target);
        if (result.length > 0) return result;
    }

    postorder (_target = this.root, callback = null) {
        const result = [];

        const traverse = (node) => {
            traverse(node.left);
            traverse(node.right);
            if (callback === null) result.push(node.data);
            else callback(node.data);
        }

        traverse(_target);
        if (result.length > 0) return result;
    }

    height(node) {
        if (node === null) return -1

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node) {
        if (node === null) return -1;

        let pointer = this.root;
        let depth = 0;

        while (pointer !== node) {
            if (node.data < pointer.data) pointer = pointer.left;
            else pointer = pointer.right;
            depth++;
        }

        return depth;
    }

    isBalanced() {
        const checkBalance = (node) => {
            if (node === null) return true;
            const leftHeight = this.height(node.left);
            const rightHeight = this.height(node.right);

            if((leftHeight - rightHeight) > 1) return false;
            return checkBalance(node.left)
                && checkBalance(node.right);
        }
        
        return checkBalance(this.root);
    }
}