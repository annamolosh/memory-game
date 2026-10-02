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

const gameBoard = document.querySelector('.game-board');

let firstCard = null;
let secondCard = null;
let lockBoard = false;

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
            const firstImage = firstCard.querySelector('img').src;
            const secondImage = secondCard.querySelector('img').src;
            console.log(firstImage);
            console.log(secondImage);
            
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







