// General Variables
const canvas = document.querySelector(".canvas");

const modal = document.querySelector(".modal");
const resizeBtn = document.querySelector("#resize");
const closeModalBtn = document.querySelector("#closeModal");
const cancelBtn = document.querySelector("#cancelBtn");
const saveBtn = document.querySelector("#saveBtn");

const colorPicker = document.querySelector("#colorPicker");

// Create Canvas Grid
function createGrid() {
    let inputValue = document.querySelector("#squaresPerSide").value;
    canvasGrid(inputValue);
}

// Remove Canvas Grid
function removeGrid() {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.lastChild);
    }
}

// Generate Grid Squares
function canvasGrid(squaresPerSide) {
    const width = `calc(var(--canvasWidth) / ${squaresPerSide})`;
    const height = width;
    const squares = Math.pow(squaresPerSide, 2);
    for (let n = 0; n < squares; n++) {
        canvasCell(width, height);
    }
}

// Create Grid Square
function canvasCell(squareWidth, squareHeight) {
    const square = document.createElement("div");
    square.style.width = squareWidth;
    square.style.height = squareHeight;

    canvas.appendChild(square);

    // Add different styles
    square.addEventListener("mouseover", () => {
        for (let a = 10; a <= 100; a++) {
            let colour = `rgba(0, 0, 0, ${a/100})`;
            square.style.background = colour;    
        } 
    })
}

// Drawing Styles

// Mono Color
function monoColor() {
    colorPicker.addEventListener("input", (e) => {
        let color = e.target.value;
        return color;
    })
}

// Random Color
function randomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const random = `rgb(${red}, ${green}, ${blue})`;
    return random;
}

// Add Shade
function addShade() {
    let shadePercentage = 0;
    let intValue = 0;
    let shadeHex = 0;
    while (shadePercentage < 100) {
        shadePercentage += 10;
        intValue = Math.round(shadePercentage / 100 * 255);
        shadeHex = intValue.toString(16);
        console.log(shadeHex)
    }
}
addShade();

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
resizeBtn.addEventListener("click", () => {showModal()});
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