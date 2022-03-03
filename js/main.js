const divContainer = document.querySelector(".container");
const selectLevelInput = document.querySelector("#level");
const btnPlay = document.querySelector("#play");
const btnReset = document.querySelector("#reset");

const lvEasy = 100; //livello difficile
const lvMedium = 81; //livello medio
const lvHard = 49; //livello facile

const bombsNumber = 16; //quantità bombe

const widthHeightNumberBox = 40; //misura lato del singolo box dei numeri



btnPlay.addEventListener("click", play);

btnReset.addEventListener('click', function() { //ricarica della pagina
    location.reload();
})




function play() { // avvio gioco

    divContainer.innerHTML = ""; //reset container
    
    if (selectLevelInput.value == '1') { //generazione griglia di gioco
        grid(lvEasy);
        console.log(bombsGenerator(lvEasy))
    } else if (selectLevelInput.value == '2') {
        grid(lvMedium);
        console.log(bombsGenerator(lvMedium));
    } else {
        grid(lvHard);
        console.log(bombsGenerator(lvHard));
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


function bombsGenerator(level) { //generazione casuale delle bombe

    const arrBombs = [];
    let bomb;

    for (let i = 0; i < bombsNumber; i++) {

        bomb = Math.floor(Math.random() * level) + 1;
        
        while (arrBombs.includes(bomb)) {
            bomb = Math.floor(Math.random() * level) + 1;
        }
        
        arrBombs.push(bomb);
    }

    return arrBombs;
}