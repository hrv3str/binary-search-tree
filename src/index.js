import 'normalize.css';
import './styles.css';
import Tree from './binarySearchTree.js'
import generateArray from './arrayGenerator.js'

const arrayButton = document.getElementById('generator');

const buffer = (() => {
    const bufferObject = {
        tree: undefined,
    }

    const readArray = () => {
        return bufferObject.tree.source;
    }

    const setArray = (object) => {
        bufferObject.tree = object;
    }

    return {
        readArray,
        setArray
    }
})();

const display = (() => {
    const arrayDisplay = document.getElementById('array-display');
    const arrayList = document.getElementById('delete-input');
    const consoleMock = document.getElementById('console');

    const array = () => {
        const input = buffer.readArray();
        arrayDisplay.innerHTML = null;
        arrayList.innerHTML = `
            <option value=''>select number</option>
        `;
        input.forEach(number => {
            const plate = document.createElement('div');
            plate.classList.add('number-plate')
            const listItem = document.createElement('option');
            plate.textContent=number;
            listItem.textContent=number;
            listItem.value=number;
            arrayDisplay.appendChild(plate);
            arrayList.appendChild(listItem);
        })
    }

    const tree = () => {
        const log = (message) => {
            
        }
    }
    return {
        array,
        tree
    }
})();

const handleGenerator = () => {
    const array = generateArray();
    const tree = new Tree(array)
    buffer.setArray(tree);
    display.array();
}

arrayButton.addEventListener('click', handleGenerator);

