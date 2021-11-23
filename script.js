let cells;
let pen = 'black';
let container = document.querySelector('.container');
const body = document.querySelector('body');
const slider = document.getElementById("gridSize");
const output = document.getElementById('label');
const colorChoice = document.getElementById('colorChoice');
output.textContent = slider.value;
let gridSize = 16;

//Creates the grid
function makeGrid(gridSize) {
    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    for (i = 0; i < gridSize*gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-opacity', 0.2);
        container.appendChild(cell);
    }
}

//resets the grid
function resetGrid() {
    cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        container.removeChild(cell);
    })
    makeGrid(gridSize);
    addColor(penType);
}

//Updates the label attached to the slider 
slider.oninput = function () {
    label.textContent = this.value;
    gridSize = this.value;
    resetGrid();
}

//makes the original grid and starts the event listener at the beginning
makeGrid(gridSize);
penType = 'black';

function addColor(pen) {
    switch (pen) {
        case 'black':
            penType = 'black';
            break;
        case 'random':
            penType = 'random';
            break;
        case 'darken':
            penType = 'darken';
            break;
        case 'color':
            penType = 'color';
            break;
    }
}

//Changes the color based on which penType is selected
container.addEventListener('mouseover', () => {
    cells = document.querySelectorAll('.cell');
    if (penType == 'darken') {
        cells.forEach((cell) => {
            const opacity = parseFloat(cell.getAttribute('data-opacity'));
                const newOpacity = opacity + 0.1;
            cell.addEventListener('mouseover', () => {
                cell.style.backgroundColor = `rgba(0, 0, 0, ${newOpacity})`;
                cell.setAttribute('data-opacity', newOpacity);
            })
        })
    } else {
        cells.forEach((cell) => {
            cell.setAttribute('data-opacity', 0.2);
            if (penType == 'black') {
                cell.addEventListener('mouseover', () => {
                    cell.style.backgroundColor = 'black';
                })
            } else if (penType == 'random') {
                const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
                const r = randomBetween(0, 255);
                const g = randomBetween(0, 255);
                const b = randomBetween(0, 255);
                cell.addEventListener('mouseover', () => {
                    cell.style.backgroundColor = `rgb(${r},${g}, ${b})`;
                })
            } else if (penType == 'color') {
                pen = 'color';
                cell.addEventListener('mouseover', () => {
                    cell.style.backgroundColor = colorChoice.value;
                })
            }
        })
    }

})


        
