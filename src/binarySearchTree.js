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

        root.linkLeft(this.build(array, start, mid -1));
        root.linkRight(this.build(array, mid +1, end));

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
}