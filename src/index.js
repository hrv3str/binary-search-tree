import 'normalize.css';
import './styles.css';
import Tree from './binarySearchTree.js'
import generateArray from './arrayGenerator.js'

const array = generateArray();

console.log('Testing BST generation:')

const tree = new Tree(array);

console.log(`BST source: [${tree.source}]`);
console.log('BST structure:')
tree.print();
console.log('----');
console.log('Testing BST .insert():')
console.log('initial tree:');
tree.print()
tree.insert(666);
console.log('insert "666":');
tree.print();
tree.insert(665);
console.log('insert "665":');
tree.print();
tree.insert(667);
console.log('insert "667":');
tree.print();
tree.insert(664);
console.log('insert "664":');
tree.print();
console.log('----');
console.log('Testing BST .delete():');
console.log('initial tree:');
tree.print();
tree.delete(664);
console.log('delete "664":');
tree.print();
tree.delete(666);
console.log('delete "666":');
tree.print();
console.log('----');
console.log('Testing BST .find():');
console.log('initial tree:');
tree.print();
const findResult = tree.find(667);
console.log(`find "667": ${findResult.data}`);
