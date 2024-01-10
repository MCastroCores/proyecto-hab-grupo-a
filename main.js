'use strict'
// TODO. AQUÍ EMPIEZAN LAS CONSTANTES
//* Constantes del HTML
const cards = document.querySelectorAll(".card");
let firstCard = null;
let numDeclicks = 0;

//* Constantes del JUEGO 
const tablero = document.querySelector('.tablero');
const celdas = document.querySelectorAll('.carta');
const tries = document.querySelector('.tries');
const player = document.querySelector('.player');
const ranking = document.querySelector('.rank');

//* Constantes del FINAL
const result = document.querySelector('.result');
let contador = 0;
let contadorFlipped = 0;

// *Constantes Barajar

const cartasArray = Array.from(celdas);
let j = 0;

// TODO. AQUÍ EMPIEZAN LAS FUNCIONES
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
    btnReset.textContent = 'Prueba otra vez';

    console.log(player.firstElementChild.textContent);   

    let rankPlayer = player.firstElementChild.textContent;

    let rankResult = result.textContent;

    saveRanking(rankPlayer, rankResult);
  }
  


function saveRanking(rankPlayer, rankResult) {

  
  
  const savedScores = JSON.parse(localStorage.getItem('scores')) || [];

  savedScores.push({rankPlayer, rankResult});

  savedScores.sort((a, b) => {b.rankResult - a.rankResult});

  localStorage.setItem('scores', JSON.stringify(savedScores));
  
}

function getRanking() {
  
  const savedScores = JSON.parse(localStorage.getItem('scores')) || [];
  
  console.log(savedScores);

  const player1 = document.querySelector('.top-players');
  
  player1.innerHTML =`
  <p>${savedScores[0].rankPlayer}:${savedScores[0].rankResult}</p>
  <p>${savedScores[1].rankPlayer}:${savedScores[1].rankResult}</p>
  <p>${savedScores[2].rankPlayer}:${savedScores[2].rankResult}</p>
  `

  return savedScores;

}




  // * Funcion Fin de Juego
  
  const finalizar = () => {
    if (contadorFlipped === 8){
      finalJuego();
    } else {
      felicitar();
    };
  };

  //* Función RESET

function reset() {
    contador = 0;
    result.textContent = 0;
    firstCard = null;
    iniciarJuego();
    for (const card of cards) {
      card.classList.remove('flipped');
      card.addEventListener("click", reveal); 
    }
    if (contadorFlipped === 8) {
      const hasGanadoModalDuplicado = document.querySelector('.fondo');
      hasGanadoModalDuplicado.remove();
      
    }
    contadorFlipped = 0;

    getRanking();

  }

  // * Boton Reset
  
  const btnReset = document.querySelector(".reset");
  btnReset.addEventListener('click', () => {
    reset();
    btnReset.classList.add('invisible');
         player.classList.add('invisible');
         tries.classList.add('invisible');
         result.classList.add('invisible');
         ranking.classList.add('invisible');
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

//! CÓDIGO PARA EJECUTAR EL PROMPT DEL PRINCIPIO

const btn = document.querySelector('.btnStart');

const form = document.forms[0]

const pObligatorio = document.querySelector('.obligatorio');

function validateName(input) {
  if (input.value === '') {
    pObligatorio.textContent = 'Campo Obligatorio *'
    pObligatorio.classList.add('invalid');
    return null; 
  } else if (input.value.length < 3) {
    pObligatorio.textContent = 'Name too short *'
    pObligatorio.classList.add('invalid');
    return null; 
  } else if (input.value.length > 12){
    pObligatorio.textContent = 'Name too long *'
    pObligatorio.classList.add('invalid');
    return null; 
  } else {
    pObligatorio.textContent = '';
    return input.value;
  }
}

function createUserName(userName) {
  const newUser = document.createElement('p');
  newUser.textContent = userName.toUpperCase();
  newUser.style.margin = '15px';
  return newUser;
}
  

form.addEventListener('submit', (event) => {
  
  event.preventDefault();
  const userName = validateName(form.name);
  
  if (userName === null) {
    return;
  } 
  
  const newUser = createUserName(userName);
  player.appendChild(newUser)
  form.classList.add('invisible')
  
  reset();

  getRanking();

  
  
});



// TODO. AQUÍ EMPIEZAN LA PILA DE EJECUCIÓN
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
         btnReset.classList.remove('invisible');
         player.classList.remove('invisible');
         tries.classList.remove('invisible');
         result.classList.remove('invisible');
         ranking.classList.remove('invisible');
        };
      }, 1000); 
    }, 500);
  }
  

  // * Bucle Cartas
  for (const card of cards) {
    card.addEventListener("click", reveal);  
  }
  
  //
