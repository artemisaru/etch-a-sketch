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

// Create Grid Square
function createSquare(squareWidth, squareHeight) {
    const square = document.createElement("div");
    square.style.width = squareWidth;
    square.style.height = squareHeight;

    canvas.appendChild(square);

    // Add different styles
    square.addEventListener("mouseover", () => {
        addShade(square);
    })
}

// Drawing Styles

// Mono Color
function singleColor(monoBg) {
    monoBg.style.background = colorPicker.value;
}

// Random Color
function randomColor(randomBg) {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const random = `rgb(${red}, ${green}, ${blue})`;
    randomBg.style.background = random;
}

// Add Shade
function addShade(transparentBg) {
    transparentBg.style.background = colorPicker.value;
    let opacity = Number(transparentBg.style.opacity);
    if (opacity < 1) {
        opacity += 0.1;
        transparentBg.style.opacity = opacity;
    }
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