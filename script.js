let container = document.getElementById('container');
let mode = Array.from(document.getElementsByName('mode'));
let containerSize = document.getElementById('size');
let colorPicker = document.getElementById('favcolor');
let randomPicker = document.getElementById('default');
let rangeSize = document.getElementById('rangeSize');
let rangeInput = document.getElementById('size');
let sketchButton = document.getElementById('sketch');
let eraseButton = document.getElementById('erase');
let freezeButton = document.getElementById('freeze');
let resetButton = document.getElementById("resetBtn");
let sizeButton = document.getElementById("sizeBtn");
let gridSize = 16;


let containerStyle = (cnt, gSize) => {
    cnt.style.gridTemplateRows = `repeat(${gSize}, 1fr)`;
    cnt.style.gridTemplateColumns = `repeat(${gSize}, 1fr)`;
}

const gridCreate = (cnt, gSize, first = true) => {
    for (let i = 0; i < gSize * gSize; i++) {
        let square = document.createElement('div');
        cnt.appendChild(square);
        square.setAttribute('id', `${i}`);
        square.setAttribute('class', 'sqr');
        currentSquare = document.getElementById(`${i}`);
        if (!first) {
            currentSquare.style.width = `${(500 / gSize)}px`;
            currentSquare.style.height = `${(500 / gSize)}px`;
        }

    }
}

const removeAll = cnt => {
    while (cnt.firstChild) {
        cnt.removeChild(cnt.lastChild);
    }
}


const valueOff = e => {
    if (e.key == 'Control') {
        container.setAttribute('value', 'off');
        freezeButton.checked = true;
    } else if (e.key == 'Shift') {
        if (container.getAttribute('value') == 'on' && container.getAttribute('data-delete') == 'off') {
            container.setAttribute('data-delete', 'on');
            eraseButton.checked = true;
        }
    };
}

const valueOn = e => {
    sketchButton.checked = true;
    if (e.key == 'Control') {
        container.setAttribute('value', 'on');
    } else if (e.key == 'Shift') {
        if (container.getAttribute('value') == 'on' && container.getAttribute('data-delete') == 'on') {
            container.setAttribute('data-delete', 'off');
        }
    };
}


const handleMousemove = e => {
    if (container.getAttribute('data-delete') == 'on') {
        e.target.style.backgroundColor = `hsl(0, 0%, 100%)`;
    } else {
        if (container.getAttribute('value') == 'on' && container.getAttribute('data-random') == 'on') {
            let r = Math.floor(Math.random() * 255);
            let g = Math.floor(Math.random() * 255);
            let b = Math.floor(Math.random() * 255);
            e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
        }
        if (container.getAttribute('value') == 'on' && container.getAttribute('data-random') == 'off') {
            e.target.style.backgroundColor = colorPicker.getAttribute('value');
        }
    }

};


const doublClickAction = e => {
    e.target.style.backgroundColor = `hsl(0, 0%, 100%)`;
}


const resetAction = () => {
    container.childNodes.forEach(e => {
        e.style.backgroundColor = `hsl(0, 0%, 100%)`;
    });
    sketchButton.checked = true;
}


const selectMode = (e) => {
    if (e.target.value == 'sketch') {
        container.setAttribute('data-delete', 'off');
        container.setAttribute('value', 'on');
    }
    if (e.target.value == 'erase') {
        container.setAttribute('data-delete', 'on');
    }
    if (e.target.value == 'freeze') {
        container.setAttribute('value', 'off');
        container.setAttribute('data-delete', 'off');
    }

}


const promptAction = () => {
    let answer = parseInt(prompt('Please choose an integer between bigger than 0 and less than 65'), 10);
    if (answer == null || isNaN(answer) || answer <= 0 || answer >= 65) {
        alert('You should choose a postive integer between 1 and 64!');
    } else return answer;
}

const updateUI = (size) => {
    container.setAttribute('data-random', 'on');
    rangeSize.innerText = `${size} x ${size}`;
    rangeInput.value = `${size}`;
    sketchButton.checked = true;
    randomPicker.checked = true;
}

const newRestart = (size) => {
    if (size) {
        removeAll(container);
        containerStyle(container, size);
        gridCreate(container, size, false);
        addEventsToContainer(container);
        updateUI(size);
    }
}

const changeSizeAction = () => {
    gridSize = promptAction();
    newRestart(gridSize);
}

const setDataRandom = e => {
    if (e.target.checked) container.setAttribute('data-random', 'on');
    else container.setAttribute('data-random', 'off');
}

const colorPickerAction = e => {
    colorPicker.setAttribute('value', e.target.value);
    container.setAttribute('data-random', 'off');
    randomPicker.checked = false;
}

const addEventsToContainer = (cnt) => {
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
    element.addEventListener('click', selectMode);
    element.addEventListener('change', selectMode);
});

containerSize.addEventListener('change', e => {
    removeAll(container);
    newRestart(e.target.value);
})

colorPicker.addEventListener('change', colorPickerAction);
randomPicker.addEventListener('change', setDataRandom);
