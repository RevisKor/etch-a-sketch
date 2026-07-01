const sketchContainer = document.querySelector(".sketchContainer");
function createGrid(number) {
    for (let row = 0; row < number; row++) {
        const divRow = document.createElement("div"); divRow.classList.add("divRow")
        for (let box = 0; box < number; box++) {
            const divBox = document.createElement("div"); divBox.classList.add("divBox")
            divRow.appendChild(divBox)
        }
        sketchContainer.appendChild(divRow);
    }
}

createGrid(16);