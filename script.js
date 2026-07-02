let isMouseDown = false;
let inkColor = "#dc143c";

const changeColor = (event) => {
    // event.preventDefault()
    // if(isMouseDown || event.type === "mousedown") {
    //     event.target.style.backgroundColor = inkColor;
    // }
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

createGrid(parseInt(gridSize.value) || 16);

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
    const newSize = parseInt(gridSizeInput.value);
    createGrid(newSize);
})