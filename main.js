'use strict'

// !Flip card logic

// console.log(cards);
// console.log(cards[0]);
// console.log(cards[0]);
// console.log(cards[0].firstElementChild.lastElementChild.textContent);

// const reveal = (e) => {
//   const currentCard = e.currentTarget;
//   currentCard.classList.add("flipped");

//   setTimeout(() => {
//     currentCard.classList.remove("flipped");
//   }, 1000);
// };

// for (const card of cards) {
//   card.addEventListener("click", reveal);
// }



// ! Aquí empieza nuestra lógica

// const content = document.querySelector('.content');
// console.log(card);

// const cartasArray = Array.from(card);
// console.log(cardArray);

// let j = 0;
// function barajar (array) {
//     for (let i = 0; i < array.length; i++){
//         let j = Math.floor(Math.random()* (i+1)) 
//         console.log(j);
//         [array[i], array[j]] = [array[j], array[i]]
//     }
// }

// barajar(cartasArray)
// cartasArray.forEach(card => {
//     content.append(card)
// });

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
 // Recargar la página
/* Falta:
1) Contador
2) Distribución cartas aleatoria
3) Reset del juego
4) await evento para siguiente intento */