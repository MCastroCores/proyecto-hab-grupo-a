'use strict'

const cartas = document.querySelectorAll('.card');

const tablero = document.querySelector('.container');

console.log(cartas);

const cartasArray = Array.from(cartas);

console.log(cartasArray);

let j = 0;

function barajar (array) {
    for (let i = 0; i < array.length; i++){

        let j = Math.floor(Math.random()* (i+1)) 

        console.log(j);

        [array[i], array[j]] = [array[j], array[i]]

    }

}

barajar(cartasArray)

cartasArray.forEach(carta => {
    tablero.append(carta)
});

const cards = document.querySelectorAll(".card");
const result = document.querySelector('.result');

let firstCard = null
let numDeclicks = 0
let contador = 0;
let contadorFlipped = 0;

const finalizar = () => {
  if (contadorFlipped === 8){
    console.log('Has ganado');
  } else {
    console.log('no has ganado');
  }
}

const reveal = (e) => {
  if (numDeclicks < 2) {
    const currentCard = e.currentTarget;
    currentCard.classList.add("flipped");

  if (firstCard === null) {
    firstCard = currentCard;
    return;
  } else if (firstCard !== null)  {
    const firstCardValue = firstCard.firstElementChild.lastElementChild.textContent;
    const secondCardValue = currentCard.firstElementChild.lastElementChild.textContent;

    if (firstCardValue === secondCardValue) {
      console.log("coinciden");
      currentCard.removeEventListener('click', reveal);
      firstCard.removeEventListener('click', reveal);
      contador ++;
      result.textContent = contador;
      firstCard = null;
      contadorFlipped ++;
      console.log(contadorFlipped);
      finalizar();
      return contadorFlipped;

    } else {
      
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        currentCard.classList.remove("flipped");
        firstCard = null;
      }, 1000);
      contador ++;
      result.textContent = contador;
    }
  }
      numDeclicks++
      if (numDeclicks = 2){
        setTimeout(() => {
          numDeclicks = 0
    
        }, 1050);
    }
  }
};

for (const card of cards) {
  card.addEventListener("click", reveal);

}
function resetearJuego() {
  location.reload();
}
