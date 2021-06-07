let container = document.getElementById('container');
let mode = Array.from(document.getElementsByName('mode'));
let containerSize = document.getElementById('size');
const resetButton = document.getElementById("resetBtn");
const sizeButton = document.getElementById("sizeBtn");
let gridSize = 16;

let containerStyle = function (cnt, gSize) {
    cnt.style.gridTemplateRows = `repeat(${gSize}, 1fr)`;
    cnt.style.gridTemplateColumns = `repeat(${gSize}, 1fr)`;
}

const gridCreate = function (cnt, gSize, first = true) {
    for (let i = 0; i < gSize * gSize; i++) {
        let squeare = document.createElement('div');
        cnt.appendChild(squeare);
        squeare.setAttribute('id', `${i}`);
        squeare.setAttribute('class', 'sqr');
        currentSqueare = document.getElementById(`${i}`);
        if (!first) {
            currentSqueare.style.width = `${(500 / gSize)}px`;
            currentSqueare.style.height = `${(500 / gSize)}px`;
        }

    }
}

const removeAll = function (cnt) {
    while (cnt.firstChild) {
        cnt.removeChild(cnt.lastChild);
    }
}


const valueOff = function (e) {
    if (e.key == 'Control') {
        container.setAttribute('value', 'off');
        document.getElementById('freeze').checked = true;
    }
    else if (e.key == 'Shift') {
        // container.getAttribute('value') == 'on' && 
        if (container.getAttribute('value') == 'on' && container.getAttribute('data-delete') == 'off') {
            container.setAttribute('data-delete', 'on');
            document.getElementById('erase').checked = true;
        }
    };
}

const valueOn = function (e) {
    document.getElementById('sketch').checked = true;
    if (e.key == 'Control') {
        container.setAttribute('value', 'on');
    }
    else if (e.key == 'Shift') {
        if (container.getAttribute('value') == 'on' && container.getAttribute('data-delete') == 'on') {
            container.setAttribute('data-delete', 'off');
        }
    };
}


const handleMousemove = (e) => {
    if (container.getAttribute('value') == 'on') {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
    }
    if (container.getAttribute('data-delete') == 'on') {
        e.target.style.backgroundColor = `hsl(0, 0%, 100%)`;
    }
};


const doublClickAction = (e) => {
    e.target.style.backgroundColor = `hsl(0, 0%, 100%)`;
}


const resetAction = function () {
    container.childNodes.forEach(e => {
        e.style.backgroundColor = `hsl(0, 0%, 100%)`;
    });
    document.getElementById('sketch').checked = true;
}


const selectMode = function (e) {
    if (e.target.value == 'sketch') {
        container.setAttribute('data-delete', 'off');
        container.setAttribute('value', 'on')
    }
    if (e.target.value == 'erase') {
        container.setAttribute('data-delete', 'on');
    }
    if (e.target.value == 'freeze') {
        container.setAttribute('value', 'off');
        container.setAttribute('data-delete', 'off');
    }

}


const promptAction = function () {
    let answer = parseInt(prompt('Please choose an integer between bigger than 0 and less than 65'), 10);
    if (answer == null || isNaN(answer) || answer < 0) {
        alert('You should choose a postive integer!');
        return 16;
    } else if (answer >= 65) {
        alert('You should choose a number between 1 and 64!');
        return 16;
    } else return answer;
}

const newRestart = function (size) {
    removeAll(container);
    containerStyle(container, size);
    gridCreate(container, size, false);
    addEventsToContainer(container);
    document.getElementById('rangeSize').innerText = `${size} x ${size}`;
    document.getElementById('size').value = `${size}`;
    document.getElementById('sketch').checked = true;
}

const changeSizeAction = function () {
    gridSize = promptAction();
    newRestart(gridSize);
}

const addEventsToContainer = function (cnt) {
    cnt.childNodes.forEach(element => {
        element.addEventListener('mouseover', handleMousemove);
        element.addEventListener('dblclick', doublClickAction);
    });
}

window.addEventListener("load", gridCreate(container, gridSize));
document.onkeydown = valueOff;
document.onkeyup = valueOn;
addEventsToContainer(container);
resetButton.addEventListener("click", resetAction);
sizeButton.addEventListener("click", changeSizeAction);

mode.forEach(element => {
    element.addEventListener('click', selectMode)
});

containerSize.addEventListener('change', (e) => {
    removeAll(container);
    newRestart(e.target.value);
})