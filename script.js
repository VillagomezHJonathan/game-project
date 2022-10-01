////////////////////////////
// Classes
////////////////////////////
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
    name.innerText = this.troop[0]

    const power = document.createElement('p')
    power.classList.add('power')
    power.innerText = this.power

    this.card.append(name)
    this.card.append(power)

    parentElem.append(this.card)
  }

  getCard() {
    return this.card
  }

  deleteCard() {
    this.card.remove()
  }
}

////////////////////////////
// Global variables
////////////////////////////
const gameContainer = document.getElementById('game-container')
const mainStage = document.getElementById('main-stage')
const topStack = document.getElementById('top')
const bottomStack = document.getElementById('bottom')

const cardChoices = {
  p1: null,
  p2: null
}

////////////////////////////
// Event listeners
////////////////////////////
const cardMouseOver = (evt, card) => {
  card.classList.add('hover')
}

const cardMouseLeave = (evt, card) => {
  card.classList.remove('hover')
}

const cardClick = (evt, card) => {
  console.log('click')
}

////////////////////////////
// Helper functions
////////////////////////////
const createMultCards = (parentElem, amount) => {
  for (let i = 0; i < amount; i++) {
    const card = new Card()
    card.createCard(parentElem)

    card.getCard().addEventListener('mouseover', (evt) => {
      cardMouseOver(evt, card.getCard())
    })

    card.getCard().addEventListener('mouseleave', (evt) => {
      cardMouseLeave(evt, card.getCard())
    })

    card.getCard().addEventListener('click', (evt) => {
      cardClick(evt, card.getCard())
    })
  }
}

const checkRoundWinner = () => {
  const p1Troop = cardChoices.p1.troop
  const p1Power = cardChoices.p1.power

  const p2Troop = cardChoices.p2.troop
  const p2Power = cardChoices.p2.power

  const p1 = Object.keys(cardChoices)[0]
  const p2 = Object.keys(cardChoices)[1]

  let winner = null

  if (p1Troop === p2Troop) {
    if (p1Power === p2Power) {
      winner = 'draw'
    } else if (p1Power > p2Power) {
      winner = p1
    } else {
      winner = p2
    }
  } else if (p1Troop === 'Spearmen') {
    if (p2Troop === 'Cavalry') {
      winner = p1
    } else {
      winner = p2
    }
  } else if (p1Troop === 'Cavalry') {
    if (p2Troop === 'Archer') {
      winner = p1
    } else {
      winner = p2
    }
  } else if (p1Troop === 'Archers') {
    if (p2Troop === 'Spearmen') {
      winner = p1
    } else {
      winner = p2
    }
  }

  console.log(winner)
  return winner
}

createMultCards(topStack, 5)
createMultCards(bottomStack, 5)
// const button = document.createElement('button')
// button.innerText = 'test'
// button.setAttribute('id', 'test-btn')
// gameContainer.append(button)
// button.addEventListener('click', () => {
//   cardChoices.p1 = new Card()
//   cardChoices.p2 = new Card()

//   console.clear()
//   console.log('Choices', cardChoices)
//   checkRoundWinner()
// })
