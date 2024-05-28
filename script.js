// General Variables
const canvas = document.querySelector(".canvas");

const modal = document.querySelector(".modal");
const resizeBtn = document.querySelector("#resize");
const closeModalBtn = document.querySelector("#closeModal");
const cancelBtn = document.querySelector("#cancelBtn");
const saveBtn = document.querySelector("#saveBtn");

// Set Canvas Grid Size
function createGrid() {
    let inputValue = document.querySelector("#squaresPerSide").value;
    canvasGrid(inputValue);
}

// Remove Canvas Grid
function removeGrid() {
    let leftOvers = canvas.firstChild;
    while (leftOvers) {
        canvas.removeChild(leftOvers);
    }
}

// Create Canvas Grid
function canvasGrid(squaresPerSide) {
    const width = `calc(var(--canvasWidth) / ${squaresPerSide})`;
    const height = width;
    const squares = Math.pow(squaresPerSide, 2);
    for (let n = 0; n < squares; n++) {
        canvasCell(width, height);
    }
}

// Remove Canvas Grid
function removeGrid() {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.lastChild);
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
        square.style.background = "#1a1a1a";
    })
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