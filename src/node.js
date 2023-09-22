export default class Node {
    constructor (value) {
        this.value = value;
        this.leftNode = null;
        this.rightNode = null;
    }

    linkLeft(node) {
        this.leftNode = node;
    }

    linkRight(node) {
        this.rightNode = node;
    }
};