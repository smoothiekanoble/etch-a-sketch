let color = "black";
let mouseDown = false;
let dim = 30;
let isRainbow = false;
let isBorder = true;

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
                console.log(color);
                isRainbow = false;
            }
            console.log(`Color set to: ${color}`);
        });
    })
}

function toggleBorder(){
    const grids = document.querySelectorAll(".grid-container div div");
    grids.forEach((grid) => {
        if (grid.style.border === "1px solid black"){
            grid.style.border = "0px";
            isBorder = false;
        } else { 
            grid.style.border = "1px solid black";
            isBorder = true;
        }
    });
}

function createGrid(dim, gridContainer) {
    for (let i = 0; i < dim; i++) {
        let gridRow = document.createElement("div");
        gridRow.style.display = "flex";
        gridRow.style.flex = "auto";
        for (let j = 0; j < dim; j++) {
            let grid = document.createElement("div");
            if (isBorder)
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
    function setDimension() {
        const gridSize = document.getElementById('grid-size');
        const submit = document.getElementById('submit');
        submit.addEventListener('click', (e) => {
            let input = gridSize.value;
            let val = parseInt(input);
            if (!isNaN(val) && val > 0 && val < 101) {
                dim = val;
                resetGrid();
                console.log(dim);
            } else 
                alert("Please enter a valid number between 0 and 100");
        });
        gridSize.addEventListener("keydown", (e) => {
            e.key === "Enter" && submit.click();
        })
        
    }
    const wipe = document.getElementById("wipe");
    wipe.addEventListener("click", (e) => {resetGrid()});

    setDimension();
    const toggle = document.getElementById('borders');
    toggle.addEventListener("click", toggleBorder);
});