const globalDiv = document.createElement('div');
globalDiv.classList.add('global-div');

const header =  document.createElement('header');

const container = document.createElement('div');
container.classList.add('container');

const btnsMain = document.createElement('div');
btnsMain.classList.add('btns-main');

const newGameButton = document.createElement('button');
newGameButton.classList.add('btn-primary', 'body-medium');
newGameButton.textContent = 'New Game';

const leaderboardButton = document.createElement('button');
leaderboardButton.classList.add('btn-secondary', 'body-medium');
leaderboardButton.textContent = 'Leaderboard';

const title = document.createElement('h1');
title.classList.add('heading-1');

const titleLink = document.createElement('a');
titleLink.textContent = 'Memory game';
titleLink.href = '/memory.html';

const gameStatics = document.createElement('div');
gameStatics.classList.add('game-statics');

const movesStat = document.createElement('div');
movesStat.classList.add('game-stat');

const movesIcon = document.createElement('img');
movesIcon.src = './assets/icons/Repeat Button.svg';
movesIcon.alt = 'repeat icon';

const movesInfo = document.createElement('div');
movesInfo.classList.add('game-stat-info');

const movesTitle = document.createElement('span');
movesTitle.classList.add('game-stat-title', 'counter-label');
movesTitle.textContent = 'moves made';

const movesValue = document.createElement('span');
movesValue.classList.add('game-stat-value', 'counter-value');
movesValue.textContent = '0';

const pairsStat = document.createElement('div');
pairsStat.classList.add('game-stat');

const pairsIcon = document.createElement('img');
pairsIcon.src = './assets/icons/Star.svg';
pairsIcon.alt = '';

const pairsInfo = document.createElement('div');
pairsInfo.classList.add('game-stat-info');

const pairsTitle = document.createElement('span');
pairsTitle.classList.add('game-stat-title', 'counter-label');
pairsTitle.textContent = 'pairs found';

const pairsValue = document.createElement('span');
pairsValue.classList.add('game-stat-value', 'counter-value');
pairsValue.textContent = '0 / 8';


const main = document.createElement('main')

const gameBoard = document.createElement('div');
gameBoard.classList.add('game-board')

globalDiv.append(header);
header.append(container);

btnsMain.append(newGameButton, leaderboardButton);
container.append(btnsMain);

title.append(titleLink);
container.append(title);

gameStatics.append()
container.append(gameStatics);

movesInfo.append(movesTitle, movesValue);
movesStat.append(movesIcon, movesInfo);
gameStatics.append(movesStat);

pairsInfo.append(pairsTitle, pairsValue);
pairsStat.append(pairsIcon, pairsInfo);
gameStatics.append(pairsStat);

globalDiv.append(main);
main.append(gameBoard);


document.body.append(globalDiv);

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

function shuffle(array) {
    return array.sort(()=> Math.random() - 0.5)
}

const cardPairs = shuffle([...cards, ...cards])

// const gameBoard = document.querySelector('.game-board');

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;

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

        if (lockBoard) {
            return
        }

        if (card.classList.contains('matched')) {
            return
        }

        if (card === firstCard || card === secondCard) {
            return
        }

        card.classList.add('flipped');
        
        if (firstCard === null) {
            firstCard = card;
        } else if (secondCard === null) {
            secondCard = card;
            moves++;
            // console.log(moves);
            const firstImage = firstCard.querySelector('img').src;
            const secondImage = secondCard.querySelector('img').src;
            // console.log(firstImage);
            // console.log(secondImage);
            
            if (firstImage === secondImage) {
                console.log('Match!');

                firstCard.classList.add('matched');
                secondCard.classList.add('matched');

                firstCard = null;
                secondCard = null;
            } else {
                console.log('Not a match!');
                lockBoard = true;

                setTimeout(() => {
                    firstCard.classList.remove('flipped');
                    secondCard.classList.remove('flipped');

                    firstCard = null;
                    secondCard = null;
                    lockBoard = false;
                }, 1000);
            }
        }
    })

    gameBoard.append(card);
}

cardPairs.forEach(cardImage => {
    createCard(cardImage);
})







