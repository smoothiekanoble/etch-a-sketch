let color = "yellow";
let mouseDown = false;
let dim = 16;

function darkenColor(color) {
    // Parse the RGB color string
    const rgb = color.match(/\d+/g).map(Number);

    // Define the amount to darken
    const amount = 30;

    // Darken each RGB component
    const r = Math.max(rgb[0] - amount, 0);
    const g = Math.max(rgb[1] - amount, 0);
    const b = Math.max(rgb[2] - amount, 0);

    return `rgb(${r}, ${g}, ${b})`;
}

function createGrid(dim, gridContainer) {
    for (let i = 0; i < dim; i++) {
        let gridRow = document.createElement("div");
        gridRow.style.display = "flex";
        gridRow.style.flex = "auto";
        for (let j = 0; j < dim; j++) {
            let grid = document.createElement("div");
            grid.style.border = "1px solid black";
            gridRow.appendChild(grid);
            grid.style.flex = "auto";

            grid.style.backgroundColor = "rgb(255, 255, 255)";
            grid.originalColor = grid.style.backgroundColor;

            grid.addEventListener("mouseover", (e) => {
                if (!mouseDown) {
                    e.target.style.backgroundColor = darkenColor(getComputedStyle(e.target).backgroundColor);
                } else {
                    e.target.style.backgroundColor = color;
                    e.target.originalColor = color;
                }
            });

            grid.addEventListener("mouseout", (e) => {
                if (!mouseDown) {
                    e.target.style.backgroundColor = e.target.originalColor;
                }
            });

            grid.addEventListener("mousedown", (e) => {
                e.target.style.backgroundColor = color;
                e.target.originalColor = color;
            });
        }

        gridContainer.appendChild(gridRow);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    let gridContainer = document.getElementsByClassName("grid-container")[0];
    
    document.body.onmousedown = () => (mouseDown = true);
    document.body.onmouseup = () => (mouseDown = false);

    createGrid(dim, gridContainer);



    function resetGrid() {
        while (gridContainer.firstChild) {
            gridContainer.removeChild(gridContainer.firstChild);
        }
        createGrid(dim, gridContainer);
    }
    
    const wipe = document.getElementById("wipe");
    wipe.addEventListener("click", (e) => {resetGrid()});
});