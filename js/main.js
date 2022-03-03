/* L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

BONUS:
1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste */



const divContainer = document.querySelector(".container");
const selectLevelInput = document.querySelector("#level");
const btnPlay = document.querySelector("#play");
const btnReset = document.querySelector("#reset");
const scoreMsg = document.querySelector('#score');

const lvEasy = 100; //livello facile
const lvMedium = 81; //livello medio
const lvHard = 49; //livello difficile

const bombsNumber = 4; //quantità bombe

const widthHeightNumberBox = 40; //misura lato del singolo box dei numeri



btnPlay.addEventListener("click", play);
btnReset.addEventListener('click', function(){
    location.reload();
});





function play() { // avvio gioco

    divContainer.innerHTML = ""; //reset container
    
    if (selectLevelInput.value == '1') { //generazione griglia di gioco in base al livello scelto
        grid(lvEasy);
    } else if (selectLevelInput.value == '2') {
        grid(lvMedium);
    } else {
        grid(lvHard);
    }
}



function grid(level) { //generazione della griglia e delle bombe, arg -> int
    
    let divNumberBox;
    const bombs = bombsGenerator(level); //generazione bombe
    const arrNOTBomb = [];
    
    console.log(bombs);

    for (let x = 1; x <= level; x++) { //generazione box con i numeri
        divNumberBox = document.createElement('div');
        divNumberBox.innerHTML = x;
        divContainer.append(divNumberBox);

        divNumberBox.style.width = widthHeightNumberBox + 'px';
        divNumberBox.style.height = widthHeightNumberBox + 'px';

        divContainer.style.width = widthHeightNumberBox * Math.sqrt(level) + 'px';
        divContainer.style.height = widthHeightNumberBox * Math.sqrt(level) + 'px';

        divNumberBox.addEventListener('click', checkBomb);
        
    }

    const allCells = document.querySelectorAll('main > .container > div'); //recupero tutte le celle

    function checkBomb() { //check delle bombe
        if (!bombs.includes(parseInt(this.innerHTML))) {
            
            this.classList.add('true');
            while (!arrNOTBomb.includes(this)) { //conteggio delle celle "non bombe" una sola volta, anche se l'utente clicca più volte sulla stessa
                arrNOTBomb.push(this);
            }
                            
        } else {
            this.classList.add('false'); //game over e calcolo punteggio
            gameOver();
        }
    }


    function gameOver() {
        for (let a = 0; a < allCells.length; a++) { //blocco il click sulle celle
            allCells[a].removeEventListener('click', checkBomb);
        }

        for (let i = 0; i < bombs.length; i++) { //rivelo le bombe rimanenti
            allCells[bombs[i] - 1].classList.add('false');
        }
        
        scoreMsg.innerHTML = `<p>BOOM!</p><p>Il tuo punteggio è</p><p>${arrNOTBomb.length}</p>`; //stampo il punteggio
    }       
}






function bombsGenerator(level) { //generatore casuale delle bombe, arg -> int

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
