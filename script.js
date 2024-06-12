let color = "yellow";
let mouseDown = false;
let dim = 30;
let isRainbow = false;

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

function setColor() {
    const colors = document.querySelectorAll('.colors > div');
    colors.forEach((colorElement) => {
        colorElement.addEventListener('click', (e) => {
            if (e.target.id == "rainbow"){
                isRainbow = true;
            } else {
                color = getComputedStyle(e.target).backgroundColor;
                isRainbow = false;
            }
            console.log(`Color set to: ${color}`);
        });
    })
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
                    if (isRainbow) {
                        const r = Math.round(Math.random() * 256);
                        const g = Math.round(Math.random() * 256);
                        const b = Math.round(Math.random() * 256);
                        color = `rgb(${r}, ${g}, ${b})`;
                    }
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
                if (isRainbow) {
                    const r = Math.round(Math.random() * 256);
                    const g = Math.round(Math.random() * 256);
                    const b = Math.round(Math.random() * 256);
                    color = `rgb(${r}, ${g}, ${b})`;
                }
                e.target.style.backgroundColor = color;
                e.target.originalColor = color;
            });
        }

        gridContainer.appendChild(gridRow);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.getElementsByClassName("grid-container")[0];
    
    document.body.onmousedown = () => (mouseDown = true);
    document.body.onmouseup = () => (mouseDown = false);
    setColor();
    createGrid(dim, gridContainer);
    
    function resetGrid() {
        while (gridContainer.firstChild) {
            gridContainer.removeChild(gridContainer.firstChild);
        }
        setColor();
        createGrid(dim, gridContainer);
        
    }
    
    const wipe = document.getElementById("wipe");
    wipe.addEventListener("click", (e) => {resetGrid()});
});