let isMouseDown = false;
let inkColor = "#dc143c";
let brushSize = 1;
let newSize = 16;

const changeColor = (event) => {
    console.log("Triggered by event type:", event.type);
    event.preventDefault();
    if (!(isMouseDown || event.type === "mousedown")) {
        return 
    }
    if (brushSize === 1) {
         event.target.style.backgroundColor = inkColor;
    } else {
        // Split the id to get its row and column and asign them to const
        const targetCell = (event.target.id).split("-");
        const targetCellRow = parseInt(targetCell[1]);
        const targetCellCol = parseInt(targetCell[2]);

        let targets = [];
        for (let rowOffset = 0; rowOffset < brushSize; rowOffset++) {
            for (let colOffset = 0; colOffset < brushSize; colOffset++) {

                if (!(((targetCellRow - rowOffset) < 0) || ((targetCellCol - colOffset) < 0))) {
                    targets.push(`divBox-${targetCellRow - rowOffset}-${targetCellCol - colOffset}`);
                }
                if (!(((targetCellRow - rowOffset) < 0) || ((targetCellCol + colOffset) > (newSize || 16)))) {
                    targets.push(`divBox-${targetCellRow - rowOffset}-${targetCellCol + colOffset}`);
                }
                if (!(((targetCellRow + rowOffset) > (newSize || 16)) || ((targetCellCol - colOffset) < 0))) {
                    targets.push(`divBox-${targetCellRow + rowOffset}-${targetCellCol - colOffset}`);
                }
                if (!(((targetCellRow + rowOffset) > (newSize || 16)) || ((targetCellCol + colOffset) > (newSize || 16)))) {
                    targets.push(`divBox-${targetCellRow + rowOffset}-${targetCellCol + colOffset}`);
                }
                
            }
        }
        targets = [... new Set (targets)];
        targets.forEach(id => {
            const cell = document.getElementById(id);

            if (cell) {
                cell.style.backgroundColor = inkColor;
            }
        })
    }

}
const eraser = document.querySelector("#eraser");
const clear = document.querySelector("#clear");
const gridSizeInput = document.querySelector("#gridSizeInput");
const upgradeGridBtn = document.querySelector("#upgradeGridBtn");

// Code that generates the color picker
const sketchGrid = document.querySelector(".sketchGrid");
const colorPicker = new iro.ColorPicker("#pickerContainer", {
    width: 125,          // Width of the wheel in pixels
    color: inkColor,     // Starting color
    layout: [
        { 
            component: iro.ui.Wheel, // The round color circle
        },
        { 
            component: iro.ui.Slider, // A slider below it for brightness
        }
    ]
});

colorPicker.on('color:change', function(color) {
    // color.hexString automatically formats it as something like "#FF0000"
    inkColor = color.hexString; 
});

function createGrid(number) {
    sketchGrid.innerHTML = "";
    gridSizeInput.value = "";
    number = Math.min(100, number);
    for (let row = 0; row < number; row++) {
        const divRow = document.createElement("div"); divRow.classList.add("divRow");
        for (let box = 0; box < number; box++) {
            const divBox = document.createElement("div"); divBox.classList.add("divBox");

            divBox.id = `divBox-${row}-${box}`;

            divBox.addEventListener("mousedown", changeColor);
            divBox.addEventListener("mouseenter", changeColor);
            
            divRow.appendChild(divBox);
        }
        sketchGrid.appendChild(divRow);
    }
}

createGrid(16);

// Event Listener

window.addEventListener("mousedown", () => isMouseDown = true);
window.addEventListener("mouseup" ,() => isMouseDown = false);
eraser.addEventListener("click", () => inkColor = "white");
clear.addEventListener("click", () => {
    const divBoxes = document.querySelectorAll(".divBox");
    divBoxes.forEach(box => {
        box.style.backgroundColor = "white";
    })
});
upgradeGridBtn.addEventListener("click", () => {
    newSize = parseInt(gridSizeInput.value);
    createGrid(newSize);
})