class Card {
  constructor() {
    const troopOptions = ['Spearmen', 'Cavalry', 'Archers']
    const randTroop = Math.floor(Math.random() * troopOptions.length)
    const randPower = Math.floor(Math.random() * 10 + 1)

    this.card = null
    this.troop = troopOptions[randTroop]
    this.power = randPower
  }

  createCard(parentElem) {
    this.card = document.createElement('div')
    this.card.classList.add('card')

    const name = document.createElement('p')
    name.classList.add('troop')
    name.innerText = this.troop

    const power = document.createElement('p')
    power.classList.add('power')
    power.innerText = this.power

    this.card.append(name)
    this.card.append(power)

    parentElem.append(this.card)
  }

  returnCard() {
    return this.card
  }

  deleteCard() {
    this.card.remove()
  }
}

const gameContainer = document.getElementById('game-container')
const mainStage = document.getElementById('main-stage')
const topStack = document.getElementById('top')
const bottomStack = document.getElementById('bottom')

const cardHover = (evt) => {
  console.log(evt.target)
}

const createMultCards = (parentElem, amount) => {
  for (let i = 0; i < amount; i++) {
    const card = new Card()
    card.createCard(parentElem)
    card.returnCard().addEventListener('click', cardHover)
  }
}

createMultCards(topStack, 5)
createMultCards(bottomStack, 5)
// const button = document.createElement('button')
// button.innerText = 'test'
// gameContainer.append(button)
// button.addEventListener('click', () => {
//   card.deleteCard()
// })
