// General Variables
const canvas = document.querySelector(".canvas");
const cellPerSide = 16;
const cellNumber = Math.pow(cellPerSide, 2);

const modal = document.querySelector(".modal");
const resizeBtn = document.querySelector("#resize");
const closeModalBtn =  document.querySelector("#closeModal");

// Canvas Grid
for (let i = 0; i < cellNumber; i++) {
    const canvasCell = document.createElement("div");
    canvasCell.setAttribute("class", "canvas-cell");

    canvas.appendChild(canvasCell);

    canvasCell.addEventListener("mouseover", () => {
        canvasCell.style.background = "#141414";
    });
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
resizeBtn.addEventListener("click", () => {showModal()});
closeModalBtn.addEventListener("click", () => {hideModal()});
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        hideModal();
    }
});