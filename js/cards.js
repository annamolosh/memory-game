const cards = [
    'Bat.svg',
    'Dodo.svg',
    'Honeybee.svg',
    'Leopard.svg',
    'Orangutan.svg',
    'Otter.svg',
    'Seal.svg',
    'Sloth.svg'
]

const cardPairs = [...cards, ...cards]

const gameBoard = document.querySelector('.game-board');

let firstCard = null;
let secondCard = null;

function createCard(cardImage) {

    const card = document.createElement('div');
    card.classList.add('card');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');

    const question = document.createElement('span');
    question.textContent = '?';

    const image = document.createElement('img');
    image.src = `./assets/icons/${cardImage}`;
    image.alt = cardImage.replace('.svg', '');

    cardFront.append(question);
    cardBack.append(image);

    cardInner.append(cardFront, cardBack);
    card.append(cardInner);

    card.addEventListener('click', () => {
    card.classList.add('flipped');

    if (firstCard === null) {
        firstCard = card;
    } else if (secondCard === null) {
        secondCard = card;
    }
    })

    gameBoard.append(card);
}

cardPairs.forEach(cardImage => {
    createCard(cardImage);
})







