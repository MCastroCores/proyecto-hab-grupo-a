'use strict'

//* Constantes del HTML
const cards = document.querySelectorAll(".card");
let firstCard = null;
let numDeclicks = 0;

//* Constantes del JUEGO 
const tablero = document.querySelector('.tablero');
const celdas = document.querySelectorAll('.carta');

//* Constantes del FINAL
const result = document.querySelector('.result');
let contador = 0;
let contadorFlipped = 0;

// *Constantes Barajar

const cartasArray = Array.from(celdas);
let j = 0;

//*Funcion Barajar 

function barajar (array) {
      for (let i = 0; i < array.length; i++){
            let j = Math.floor(Math.random()* (i+1)) 
        console.log(j);
        [array[i], array[j]] = [array[j], array[i]]
    }
      array.forEach(carta => {
            tablero.append(carta)
        });
};


//* Función Mostrar Cartas

function mostrarCartas() {
  cards.forEach(card => {
    card.classList.add("flipped");
    
  });
  setTimeout(() => {
    cards.forEach(card => {
      card.classList.remove("flipped")
    });
  }, 6000);
};




  // * Función Felicitar
  function felicitar() {
    const congrats = document.createElement('p');
    congrats.classList.add("felicitar");
    congrats.textContent = "WELL DONE!";
    tablero.append(congrats);
    setTimeout(() => {
      congrats.remove();
    }, 1000);
  };
  
  // *Funcion HAS GANADO
  function finalJuego() {
    const hasGanadoModal = document.createElement('div');    
    hasGanadoModal.classList.add("fondo");
    hasGanadoModal.innerHTML = `
    <div class="finalJuego">YOU WON!</div>
    `;
    tablero.append(hasGanadoModal);
  }

  // * Funcion Fin de Juego
  
  const finalizar = () => {
    if (contadorFlipped === 8){
      finalJuego();
    } else {
      felicitar();
    };
  };

  // * Boton Reset
  
  const btnReset = document.querySelector(".reset");
  btnReset.addEventListener('click', () => {
    // location.reload();
    iniciarJuego();
    // hasGanadoModal.classList.add();
  });
  
  // * Función Juego
  const reveal = (e) => {
    if (numDeclicks < 2) {
    const currentCard = e.currentTarget;
     if (currentCard.classList.contains("flipped")) {
      return;
    }
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

// ? AQUÍ ORDENAMOS CODIGO EN FUNCIÓN DE SUS PASOS

function iniciarJuego() {
  barajar(cartasArray);
  const start = setTimeout(() => {
    mostrarCartas(cards);
    // * Constantes Cuenta Atrás
    let cronometro = 5;
     let intervalo = document.querySelector(".cuentaatras")
     let seccioninicio = document.querySelector(".iniciocontador")
    
    //  * Función Cuenta Atrás
     let iniciojuego = setInterval(() => {
       intervalo.textContent = cronometro;
       seccioninicio.classList.remove("invisible")
       cronometro--;
       if(cronometro === -1){
         clearInterval(iniciojuego);
         seccioninicio.classList.add("invisible");
        };
      }, 1000); 
  }, 500);
}

iniciarJuego();

// * Bucle Cartas
for (const card of cards) {
  card.addEventListener("click", reveal);  
}

//*