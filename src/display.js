import buffer from './index.js'

const display = (() => {
    const arrayDisplay = document.getElementById('array-display');
    const arrayList = document.getElementById('delete-input');
    const consoleMock = document.getElementById('console');
    const balancedLine = document.getElementById('is-balanced');
    const levelOrderLine = document.getElementById('level-order');
    const inOrderLine = document.getElementById('in-order');
    const preOrderLine = document.getElementById('pre-order');
    const postOrderLine = document.getElementById('post-order');
    const buttons = document.querySelectorAll('button');
    const inputs = document.querySelectorAll('input');
    const selects = document.querySelectorAll('select');
    const labels = document.querySelectorAll('div.label');
    const textOutput = document.getElementById('text-output');
    const buildButton = document.getElementById('build-tree');

    const printOutput = (arg) => {
        if (typeof arg === 'string') {
            const body = document.createElement('div');
            body.textContent = arg;
            textOutput.appendChild(body);
            body.scrollIntoView({ behaviour: 'smooth'});
        } else {
            textOutput.appendChild(arg);
            arg.scrollIntoView({ behaviour: 'smooth'})
        }
    }

    const mergeLists = (...nodelists) => {
        const result = [];
        nodelists.forEach(nodelist => {
            for (let i = 0; i < nodelist.length; i++) {
                if (nodelist[i].id === 'generator') continue;
                result.push(nodelist[i]);
            };
        });
        return result;
    }

    const fadeables = mergeLists (buttons, inputs, selects, labels);

    const fadeUI = () => {
        fadeables.forEach(item => {
            item.classList.add('fade');
        })
    }

    const unFadeUI = () => {
        fadeables.forEach(item => {
            item.classList.add('un-fade');
            if(item.classList.contains('fade')) {
                item.classList.remove('fade');
            };
        })
    }

    const unFadeBuild = () => {
        buildButton.classList.add('un-fade');
        buildButton.classList.remove('fade');
    }

    const errorPromtDelete = () => {
        printOutput('!!Error: choose a number to delete from the list');
    }

    const errorPromtFind = () => {
        printOutput('!!Error: print a number to find node');
    }

    const errorPromtBalance = () => {
        printOutput('!!Error: tree is already balanced');
    }

    const errorPromtInsert = () => {
        printOutput('!!Error: print number for insertion');
    }

    const errorPromtTooSmall = () => {
        printOutput('!!Error: printed number is too small. It must be 100 or greater');
    }

    const errorPromtTooBig = () => {
        printOutput('!!Error: printed number is too big. It must be 999 or less');
    }

    const errorPromtDuplicate = () => {
        printOutput('!!Error: tree alredy contains the printed number. Try another');
    }

    const generatorPromtArray = () => {
        unFadeBuild()
        printOutput('--array generated. You can now build BST');
    }

    const promtInsert = (number) => {
        printOutput(`-- inserted number ${number}`);
    }

    const promptDelete = (number) => {
        printOutput(`-- deleted number ${number}`);
    }

    const promtNotFound = () => {
        printOutput(`-- no nodes with this value found`);
    }

    const promtBalance = () => {
        printOutput(`-- tree is re-balanced`);
    }
    
    const array = () => {
        const input = buffer.readArray();
        arrayDisplay.innerHTML = null;
        arrayList.innerHTML = `
            <option value=0>select number</option>
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
        });
    }

    const find = () => {
        const node = buffer.passFindNode();
        const numberSpans = document.querySelectorAll('span');
        const stats = buffer.nodeStats(node.data);
        const findSpan = () => {
            const result = [];
            Array.from(numberSpans).forEach(span => {
                if (span.textContent == node.data) {
                    result.push(span);
                }
            })
            return result[0];
        }

        const highlight = findSpan();
        highlight.classList.add("highlight");

        const removeHighlights = () => {
            highlight.removeEventListener('transitionend' ,removeHighlights);

            const dim = () => {
                highlight.classList.remove("highlight")
            };

            setTimeout(dim, 1000);
        }
        printOutput(`--found node ${node.data}: height is ${stats.height}, depth is ${stats.depth}`);

        highlight.addEventListener('transitionend' ,removeHighlights);
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
        printOutput('--tree is built');
        unFadeUI();
    }

    return {
        array,
        tree,
        fadeUI,
        errorPromtInsert,
        errorPromtTooBig,
        errorPromtTooSmall,
        errorPromtDuplicate,
        generatorPromtArray,
        errorPromtDelete,
        promtInsert,
        promptDelete,
        find,
        promtNotFound,
        errorPromtFind,
        errorPromtBalance,
        promtBalance
    }
})();

export default display;