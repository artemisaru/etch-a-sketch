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

let sketch = false;
let sketching = true;
let erasing = false;
let monocoloring = true;
let randomizing = false;
let darkening = false;

// Remove Canvas Grid
function removeGrid() {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.lastChild);
    }
}

// Set Grid Size
function setGridSize() {
    let inputValue = document.querySelector("#squaresPerSide").value;
    createGrid(inputValue);
}

// Create Grid 
function createGrid(squaresPerSide) {
    const width = `calc(var(--canvasWidth) / ${squaresPerSide})`;
    const height = width;
    const squares = Math.pow(squaresPerSide, 2);
    for (let n = 0; n < squares; n++) {
        createSquare(width, height);
    }
}

// Create Grid Square
function createSquare(squareWidth, squareHeight) {
    const square = document.createElement("div");
    square.style.width = squareWidth;
    square.style.height = squareHeight;

    canvas.appendChild(square);

    square.addEventListener("mousedown", (e) => setSquareBackground(e));
    square.addEventListener("mouseover", (e) => setSquareBackground(e));
    square.addEventListener("mouseup", (e) => setSquareBackground(e));

    square.addEventListener("dragstart", (e) => e.preventDefault());
}

// Set Square Background
function setSquareBackground(e) {
    if (e.type === "mousedown") {
        sketch = true;
        paintOrErase(e.target);
    } else if (e.type === "mouseover" && sketch) {
        paintOrErase(e.target);
    } else {
        sketch = false;
    }
}

//  Paint or Erase
function paintOrErase(square) {
    if (sketching) {
        getSquareBackground(square);
    } else if (erasing) {
        eraseColor(square); 
    }
}

// Get Background Color
function getSquareBackground(square) {
    if (monocoloring && !randomizing && !darkening) {
        square.style.opacity = 1;
        setSingleColor(square);
    } else if (randomizing && !monocoloring && !darkening) {
        square.style.opacity = 1;
        setRandomColors(square); 
    } else if (darkening || darkening && monocoloring || darkening && randomizing) {
        setDarkeningEffect(square);
    }
}

// Drawing Styles

// Set Single Color
function setSingleColor(square) {
    square.style.background = colorPicker.value;
}

// Set Random Colors
function setRandomColors(square) {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const random = `rgb(${red}, ${green}, ${blue})`;
    square.style.background = random;
}

// Add Opacity Effect
function setDarkeningEffect(square) {
    let transparentBg = square.style.background;
    if (monocoloring) {
        transparentBg = setSingleColor(square);
    } else if (randomizing) {
        transparentBg = setRandomColors(square);
    }
    //let opacity = 0;
    let opacity = Number(square.style.opacity);
    if (opacity < 1) {
        opacity += 0.1;
        square.style.opacity = opacity;
    }
}

// Erase Paint
function eraseColor(square) {
    if (darkening) {
        square.style.opacity = 0;
    }
    square.style.background = "";
}

// Toggle Buttons
function toggleSketching() {
    sketching = !sketching;
    sketching ? pencil.classList.add("btn-active") : pencil.classList.remove("btn-active");
    if (sketching && erasing) {
        toggleEraser();
    }
}

function toggleEraser() {
    erasing = !erasing;
    erasing ? eraser.classList.add("btn-active") : eraser.classList.remove("btn-active");
    if (erasing) {
        if (sketching) {toggleSketching()}
    }
}

// Toggle Styles
function toggleSinigleColor() {
    monocoloring = !monocoloring;
    monocoloring ? monoColor.classList.add("filter-active") : monoColor.classList.remove("filter-active");
    if (monocoloring && randomizing) {
        toggleRandomColors();
    }
}

function toggleRandomColors() {
    randomizing = !randomizing;
    randomizing ? randomColors.classList.add("filter-active") : randomColors.classList.remove("filter-active");
    if (randomizing && monocoloring) {
        toggleSinigleColor();
    }
}

function toggleDarkening() {
    darkening = !darkening;
    darkening ? addOpacity.classList.add("filter-active") : addOpacity.classList.remove("filter-active");
    if (darkening && erasing) {
        toggleEraser();
    }
}

// Clear Drawing
function clearDrawing() {
    removeGrid();
    setGridSize();
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
window.addEventListener("load", () => {setGridSize()});
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
    setGridSize();
});

cancelBtn.addEventListener("click", () => {
    hideModal();
});