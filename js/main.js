const divContainer = document.querySelector(".container");
const selectLevelInput = document.querySelector("#level");
const btnPlay = document.querySelector("#play");
const btnReset = document.querySelector("#reset");

const lvEasy = 100; // livello difficile
const lvMedium = 81; // livello medio
const lvHard = 49; // livello facile

const widthHeightNumberBox = 32; // misura lato del singolo box dei numeri



btnPlay.addEventListener("click", play);

btnReset.addEventListener('click', function() { //ricarica della pagina
    location.reload();
})


function play() { // avvio gioco

    divContainer.innerHTML = ""; //reset container
    
    if (selectLevelInput.value == '1') { //generazione griglia di gioco
        grid(lvEasy);
    } else if (selectLevelInput.value == '2') {
        grid(lvMedium);
    } else {
        grid(lvHard);
    }
}



function grid(level) { //generatore della griglia, arg -> int
    
    let divNumberBox;

    for (let x = 1; x <= level; x++) {
        divNumberBox = document.createElement("div");
        divNumberBox.innerHTML = x;

        divContainer.append(divNumberBox);

        divNumberBox.style.width = widthHeightNumberBox + "px";
        divNumberBox.style.height = widthHeightNumberBox + "px";

        divContainer.style.width = widthHeightNumberBox * Math.sqrt(level) + "px";
        divContainer.style.height = widthHeightNumberBox * Math.sqrt(level) + "px";
    }

}
