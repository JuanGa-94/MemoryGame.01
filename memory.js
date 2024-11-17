const images = [
  'imagenes/img1.jpg', 'imagenes/img1.jpg',
  'imagenes/img2.jpg', 'imagenes/img2.jpg',
  'imagenes/img3.jpg', 'imagenes/img3.jpg',
  'imagenes/img4.jpg', 'imagenes/img4.jpg',
  'imagenes/img5.jpg', 'imagenes/img5.jpg',
  'imagenes/img6.jpg', 'imagenes/img6.jpg',
  'imagenes/img7.jpg', 'imagenes/img7.jpg',
  'imagenes/img8.jpg', 'imagenes/img8.jpg',
];

let firstCard = null;
let secondCard = null;
let matchedCards = 0;
const totalCards = 16;
const board = document.getElementById('gameBoard');

// Función para mezclar las imágenes
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];  // Intercambia los elementos
  }
}

// Función para crear las tarjetas
function createCards() {
  shuffle(images);  // Mezcla las imágenes
  
  images.forEach((img, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;

    // Número de orden que se mostrará al principio
    const number = document.createElement('div');
    number.classList.add('number');
    number.textContent = index + 1;  // Los números son del 1 al 16
    card.appendChild(number);

    const image = document.createElement('img');
    image.src = img;
    card.appendChild(image);

    // Agregamos la tarjeta al tablero
    board.appendChild(card);

    // Evento para voltear la tarjeta al hacer clic
    card.addEventListener('click', () => flipCard(card));
  });
}

// Función que maneja el giro de las tarjetas
function flipCard(card) {
  if (card.classList.contains('flipped') || secondCard || matchedCards === totalCards) {
    return;  // Si ya está volteada o ya hay dos tarjetas volteadas, no hacer nada
  }

  card.classList.add('flipped');
  firstCard = firstCard || card;

  // Ocultamos el número y mostramos la imagen
  card.querySelector('.number').style.display = 'none';

  if (firstCard !== card) {
    secondCard = card;

    // Si las imágenes coinciden
    if (firstCard.querySelector('img').src === secondCard.querySelector('img').src) {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      matchedCards += 2;

      firstCard = null;
      secondCard = null;
    } else {
      // Si no coinciden, las volteamos después de 1 segundo
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.querySelector('.number').style.display = 'block';  // Mostramos el número de nuevo
        secondCard.querySelector('.number').style.display = 'block'; // Mostramos el número de nuevo
        firstCard = null;
        secondCard = null;
      }, 1000);
    }
  }
}

// Crear las tarjetas cuando se cargue la página
createCards();
