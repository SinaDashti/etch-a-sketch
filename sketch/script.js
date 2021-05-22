let container = document.getElementById('container');
const resetButton = document.getElementById("myBtn");
const sizeButton = document.getElementById("sizeBtn");
let gridSize = 16;

let containerStyle = function(cnt, gSize) {
    cnt.style.gridTemplateRows = `repeat(${gSize}, 1fr)`;
    cnt.style.gridTemplateColumns = `repeat(${gSize}, 1fr)`;
}

const gridCreate = function(cnt, gSize, first = true) {
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

const removeAll = function(cnt) {
    while (cnt.firstChild) {
        cnt.removeChild(cnt.lastChild);
    }
}

const handleMousemove = (e) => {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
};


const doublClickAction = (e) => {
    e.target.style.backgroundColor = `hsl(0, 0%, 100%)`;
}


const resetAction = function() {
    container.childNodes.forEach(e => {
        e.style.backgroundColor = `hsl(0, 0%, 100%)`;
    });
}


const promptAction = function() {
    let answer = parseInt(prompt('Please choose an integer between bigger than 0 and less than 65'), 10);
    if (answer == null || isNaN(answer) || answer < 0) {
        alert('You should choose a postive integer!');
        return 16;
    } else if (answer >= 65) {
        alert('You should choose a number between 1 and 64!');
        return 16;
    } else return answer;
}

const changeSizeAction = function() {
    gridSize = promptAction();
    removeAll(container);
    containerStyle(container, gridSize);
    gridCreate(container, gridSize, false);
    addEventsToContainer(container);
}

const addEventsToContainer = function(cnt) {
    cnt.childNodes.forEach(element => {
        element.addEventListener('mouseover', handleMousemove);
        element.addEventListener('dblclick', doublClickAction);
    });
}

window.addEventListener("load", gridCreate(container, gridSize));
addEventsToContainer(container);
resetButton.addEventListener("click", resetAction);
sizeButton.addEventListener("click", changeSizeAction);