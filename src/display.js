const display = (() => {
    const arrayDisplay = document.getElementById('array-display');
    const arrayList = document.getElementById('delete-input');
    const consoleMock = document.getElementById('console');
    const balancedLine = document.getElementById('is-balanced');
    const levelOrderLine = document.getElementById('level-order');
    const inOrderLine = document.getElementById('in-order');
    const preOrderLine = document.getElementById('pre-order');
    const postOrderLine = document.getElementById('post-order');

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
        balancedLine.textContent = '';
        levelOrderLine.textContent = '';
        inOrderLine.textContent = '';
        preOrderLine.textContent = '';
        postOrderLine.textContent = '';
        consoleMock.innerHTML = '';
        const backup = console.log;
        const stats = buffer.treeStats();

        const log = (text) => {
            const body = document.createElement('code');
            body.innerHTML = text.replace(/\b(\d{3})\b/g, '<span>$1</span>');
            consoleMock.appendChild(body);
        }

        console.log = log;
        buffer.printTree();
        console.log = backup;
        balancedLine.textContent = stats.isBalanced;
        levelOrderLine.textContent = `[${stats.levelOrder}]`;
        inOrderLine.textContent = `[${stats.levelOrder}]`;
        preOrderLine.textContent = `[${stats.preOrder}]`;
        postOrderLine.textContent = `[${stats.postOrder}]`;
    }

    return {
        array,
        tree
    }
})();

export default display;