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

const modal = document.createElement('div');
modal.classList.add('modal');

const modalContent = document.createElement('div');
modalContent.classList.add('modal-content');

modal.append(modalContent);
globalDiv.append(modal);

const modalIcon = document.createElement('img');
modalIcon.classList.add('modal-icon');
modalIcon.src = './assets/icons/Trophy.svg';
modalIcon.alt = 'Trophy';

const modalTitle = document.createElement('h2');
modalTitle.classList.add('heading-2');
modalTitle.textContent = 'You win!';

const modalMoves = document.createElement('p');
modalMoves.classList.add('body');

const closeButton = document.createElement('button');
closeButton.classList.add('modal-close', 'btn-primary', 'body-medium');
closeButton.textContent = 'Close';
closeButton.addEventListener('click', closeModal);

modalContent.append(modalIcon, modalTitle, modalMoves, closeButton);

const gameBoard = document.createElement('div');
gameBoard.classList.add('game-board')

globalDiv.append(header);
header.append(container);

btnsMain.append(newGameButton, leaderboardButton);
container.append(btnsMain);

title.append(titleLink);
container.append(title);

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

// const gameBoard = document.querySelector('.game-board');

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let pairsFound = 0;
let flipTimeout = null;
// let winMessage = null;

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

            movesValue.textContent = moves;

            // console.log(moves);

            const firstImage = firstCard.querySelector('img').src;
            const secondImage = secondCard.querySelector('img').src;
            
            // console.log(firstImage);
            // console.log(secondImage);
            
            if (firstImage === secondImage) {
                console.log('Match!');

                firstCard.classList.add('matched');
                secondCard.classList.add('matched');

                pairsFound++;
                pairsValue.textContent = `${pairsFound} / 8` ;

                checkWin();

                firstCard = null;
                secondCard = null;
            } else {
                // console.log('Not a match!');
                lockBoard = true;

                flipTimeout = setTimeout(() => {
                    firstCard.classList.remove('flipped');
                    secondCard.classList.remove('flipped');

                    firstCard = null;
                    secondCard = null;
                    lockBoard = false;

                    flipTimeout = null;
                }, 1000);
            }
        }
    })

    gameBoard.append(card);
}

function resetGame() {
    while (gameBoard.firstChild) {
        gameBoard.firstChild.remove();

    }

    clearTimeout(flipTimeout);
    flipTimeout = null;

    moves = 0;
    pairsFound = 0;

    movesValue.textContent = '0';
    pairsValue.textContent = '0 / 8';

    firstCard = null;
    secondCard = null;
    lockBoard = false;

    // if (winMessage) {
    //     winMessage.remove ()
    //     winMessage = null
    // }

    closeModal();
}

function startGame() {
    const cardPairs = shuffle([...cards, ...cards])

    cardPairs.forEach(cardImage => {
        createCard(cardImage);
    })
}

// function checkWin() {

//     console.log('checkWin:', pairsFound);

//     if (pairsFound === 8) {
//         console.log('YOU WIN');
//         const winMessage = document.createElement('div');
//         winMessage.textContent = 'You win!';
//         globalDiv.append(winMessage);
//     } 
// }

// function checkWin() {
//     if (pairsFound === 8) {
//         winMessage = document.createElement('div');
//         winMessage.classList.add('win-message');
//         winMessage.textContent = 'You win!';

//         globalDiv.append(winMessage);
//     }
// }

function checkWin() {
    if (pairsFound === 8) {
        saveResult();
        showWinModal();
    }
}

function showWinModal() {

    while (modalContent.firstChild) {
        modalContent.firstChild.remove();
    }

    modalContent.append(modalIcon, modalTitle, modalMoves, closeButton);
    modalMoves.textContent = `Moves: ${moves}`;
    openModal();

}

function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function showLeaderboardModal() {
    while (modalContent.firstChild) {
        modalContent.firstChild.remove();

    }

    const modalTitle = document.createElement('h2');
    modalTitle.classList.add('heading-2');
    modalTitle.textContent = 'Leaderboard';

    const results = JSON.parse(localStorage.getItem('memoryResults')) || [];
    results.sort((a, b) => a.moves - b.moves);

    if (results.length === 0) {

        const noResults = document.createElement('p');
        noResults.classList.add('body');
        noResults.textContent = 'No results';
        modalContent.append(modalTitle, noResults);

    } else {

        results.slice(0, 10).forEach((result, index) => {

            const resultItem = document.createElement('p');
            resultItem.classList.add('body');
            resultItem.textContent = `${index + 1}. Moves: ${result.moves}`;
            modalContent.append(resultItem);

        });

    }

    const closeButton = document.createElement('button');
    closeButton.classList.add('modal-close', 'btn-primary', 'body-medium');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', closeModal);
    modalContent.append(closeButton);

    openModal();

}

function saveResult() {
    // const results = JSON.parse(localStorage.getItem('memoryResults')) || [];
    // results.push({moves: moves})
    // localStorage.setItem('memoryResults', JSON.stringify(results))

    const results = JSON.parse(localStorage.getItem('memoryResults')) || [];

    const isDuplicate = results.some(result => result.moves === moves);

    if (!isDuplicate) {
        results.push({ moves: moves });
    }

    localStorage.setItem('memoryResults', JSON.stringify(results));
}

leaderboardButton.addEventListener('click', showLeaderboardModal);

startGame();

newGameButton.addEventListener('click', () => {
    resetGame();
    startGame();
})











