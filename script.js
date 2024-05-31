// General Variables
const canvas = document.querySelector(".canvas");

// Resolution Modal
const modal = document.querySelector(".modal");

const closeModalBtn = document.querySelector("#closeModal");
const cancelBtn = document.querySelector("#cancelBtn");
const saveBtn = document.querySelector("#saveBtn");

// Confirm Clear Modal - To be implemented

// Buttons => Implement Toggle Grid View
const pencil = document.querySelector("#pencil");
const eraser = document.querySelector("#eraser");
const resize = document.querySelector("#resize");
const colorPicker = document.querySelector("#colorPicker");
const clear = document.querySelector("#clear");

// Drawing Styles Buttons (Filters)
const monoColor = document.querySelector("#monoColor");
const randomColors = document.querySelector("#random");
const addOpacity = document.querySelector("#addOpacity");

let sketching = false;
let erasing = false;
let monocoloring = false;
let randomizing = false;
let darkening = false;

let pencilColor = "#1a1a1a";

// Create Canvas Grid
function createGrid() {
    let inputValue = document.querySelector("#squaresPerSide").value;
    gridSquares(inputValue);
}

// Remove Canvas Grid
function removeGrid() {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.lastChild);
    }
}

// Generate Grid Squares
function gridSquares(squaresPerSide) {
    const width = `calc(var(--canvasWidth) / ${squaresPerSide})`;
    const height = width;
    const squares = Math.pow(squaresPerSide, 2);
    for (let n = 0; n < squares; n++) {
        createSquare(width, height);
    }
}

// Set Square Background Color
function paintSquare(e) {
    if (e.type === "mousedown") {
        sketching = true;
        e.target.style.background = pencilColor;
        if (randomizing) {
            pencilColor = getRandomColors();
        } else if (darkening) {
            createDarkening(e.target);
        }
    } else if (e.type === "mouseover" && sketching) {
        e.target.style.background = pencilColor;
        if (randomizing) {
            pencilColor = getRandomColors();
        } else if (darkening) {
            createDarkening(e.target);
        }
    } else {
        sketching = false;
    }
}

// Create Grid Square
function createSquare(squareWidth, squareHeight) {
    const square = document.createElement("div");
    square.style.width = squareWidth;
    square.style.height = squareHeight;

    canvas.appendChild(square);

    square.addEventListener("mousedown", (e) => paintSquare(e));
    square.addEventListener("mouseover", (e) => paintSquare(e));
    square.addEventListener("mouseup", (e) => paintSquare(e));
}

// Drawing Styles

// Mono Color
function getSingleColor() {
    pencilColor = colorPicker.value;
}

// Random Colors
function getRandomColors() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const random = `rgb(${red}, ${green}, ${blue})`;
    return random;
}

// Add Opacity
function createDarkening(transparentBg) {
    transparentBg.style.background = colorPicker.value;
    let opacity = Number(transparentBg.style.opacity);
    if (opacity < 1) {
        opacity += 0.1;
        transparentBg.style.opacity = opacity;
    }
}

// Toggle Buttons
function toggleSketching() {
    sketching = !sketching;
    pencil.classList.toggle("btn-active");
    pencilColor = sketching ? colorPicker.value : pencilColor;
    if (sketching) {
        if (monocoloring) {
            toggleSinigleColor();
        } else if (monocoloring && darkening) {
            toggleSinigleColor();
            toggleDarkening();
        } else if (randomizing) {
            toggleRandomColors();
        } else if (randomizing && darkening) {
            toggleRandomColors();
            toggleDarkening();
        } else if (darkening) {
            toggleDarkening();
        }
    }
}

function toggleEraser(eraseBg) {
    erasing = !erasing;
    eraser.classList.toggle("btn-active");
    pencilColor = erasing ? "" : colorPicker.value;
    //eraseBg.style.background = "";
    if (erasing) {
        if (randomizing) {
            toggleRandomColors();
        } else if (darkening) {
            toggleDarkening();
        } else if (monocoloring) {
            toggleSinigleColor();
        }
    }
}

// Toggle Styles
function toggleSinigleColor(s) {
    monocoloring = !monocoloring;
    monoColor.classList.toggle("filter-active");
    pencilColor = !monocoloring ? colorPicker.value : pencilColor;
    if (monocoloring && erasing) {
        toggleEraser();
    }
}

function toggleRandomColors() {
    randomizing = !randomizing;
    randomColors.classList.toggle("filter-active");
    pencilColor = !randomizing ? colorPicker.value : pencilColor;
    if (randomizing && erasing) {
        toggleEraser();
    }
}

function toggleDarkening() {
    darkening = !darkening;
    addOpacity.classList.toggle("filter-active");
    pencilColor = !darkening ? colorPicker.value : pencilColor;
    if (darkening && erasing) {
        toggleEraser();
    }
}

// Clear Drawing
function clearDrawing() {
    removeGrid();
    createGrid();
}

// Show Modal
function showModal() {
    modal.style.display = "block";
}

// Hide Modal
function hideModal() {
    modal.style.display = "none";
}

// Event Listeners
window.addEventListener("load", () => {createGrid()});
clear.addEventListener("click", () => {clearDrawing()});
pencil.addEventListener("click", () => {toggleSketching()});
eraser.addEventListener("click", () => {toggleEraser()});
monoColor.addEventListener("click", () => {toggleSinigleColor()});
randomColors.addEventListener("click", () => {toggleRandomColors()});
addOpacity.addEventListener("click", () => {toggleDarkening()});
resize.addEventListener("click", () => {showModal()});
closeModalBtn.addEventListener("click", () => {hideModal()});
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        hideModal();
    }
});

saveBtn.addEventListener("click", () => {
    removeGrid();
    hideModal();
    createGrid();
});

cancelBtn.addEventListener("click", () => {
    hideModal();
});