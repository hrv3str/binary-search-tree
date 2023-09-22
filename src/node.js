export default class Node {
    constructor (value) {
        this.data = value;
        this.left = null;
        this.right = null;
    }

    linkLeft(node) {
        this.left = node;
    }

    linkRight(node) {
        this.right = node;
    }
};