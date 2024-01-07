'use stric'

// !Flip card logic

const cards = document.querySelectorAll(".card");

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


let firstCard = null

const reveal = (e) => {
  const currentCard = e.currentTarget;
  currentCard.classList.add("flipped");

 

  if (firstCard === null) {
    firstCard = currentCard
  } else if (firstCard !== null)  {
    const firstCardValue = firstCard.firstElementChild.lastElementChild.textContent;
    const secondCardValue = currentCard.firstElementChild.lastElementChild.textContent;

    if (firstCardValue === secondCardValue) {
      console.log("coinciden");
      currentCard.removeEventListener('click', reveal);
      firstCard.removeEventListener('click', reveal);

      firstCard = null;

      return;

    } else {
      
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        currentCard.classList.remove("flipped");
        firstCard = null;
      }, 1000);

    }

  }
};

for (const card of cards) {
  card.addEventListener("click", reveal);

}

/* Falta:
1) Contador
2) Distribución cartas aleatoria
3) Reset del juego
4) await evento para siguiente intento */