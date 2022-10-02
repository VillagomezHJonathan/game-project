////////////////////////////
// Classes
////////////////////////////
class Card {
  constructor(owner) {
    const troopOptions = ['Spearmen', 'Cavalry', 'Archers']
    const randTroop = Math.floor(Math.random() * troopOptions.length)
    const randPower = Math.floor(Math.random() * 10 + 1)

    this.owner = owner
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

  getOwner() {
    return this.owner
  }

  deleteCard() {
    this.card.remove()
  }
}

////////////////////////////
// Global variables
////////////////////////////
const gameCont = document.getElementById('game-container')
const mainStage = document.getElementById('main-stage')
const p1ChoiceCont = document.getElementById('p1-choice')
const p2ChoiceCont = document.getElementById('p2-choice')
const topStack = document.getElementById('top')
const bottomStack = document.getElementById('bottom')

const cardChoices = {
  p1: null,
  p2: null
}
////////////////////////////
// Helper functions
////////////////////////////

////////////////////////////
// Event listeners
////////////////////////////
const cardMouseOver = (evt) => {
  const target = evt.target
  if (!target.classList.contains('selected')) {
    target.classList.add('hover')
  }
}

const cardMouseLeave = (evt) => {
  const target = evt.target
  target.classList.remove('hover')
}

const cardClick = (evt, card) => {
  const target = evt.target
  target.classList.add('selected')
  if (card.getOwner() === 'p1') {
    p1ChoiceCont.append(target)
    cardChoices.p1 = card
    checkWinner()
  } else {
    p2ChoiceCont.append(target)
    cardChoices.p2 = card
    checkWinner()
  }
}

////////////////////////////
// Game functions
////////////////////////////
const createMultCards = (owner, parentElem, amount) => {
  for (let i = 0; i < amount; i++) {
    const card = new Card(owner)
    card.createCard(parentElem)

    card.getCard().addEventListener('mouseover', (evt) => {
      cardMouseOver(evt)
    })

    card.getCard().addEventListener('mouseleave', (evt) => {
      cardMouseLeave(evt)
    })

    card.getCard().addEventListener('click', (evt) => {
      cardClick(evt, card)
    })
  }
}

const checkWinner = () => {
  if (cardChoices.p1 !== null && cardChoices.p2 !== null) {
    const p1Troop = cardChoices.p1.troop
    const p1Power = cardChoices.p1.power

    const p2Troop = cardChoices.p2.troop
    const p2Power = cardChoices.p2.power

    const p1 = Object.keys(cardChoices)[0]
    const p2 = Object.keys(cardChoices)[1]

    let winner = null

    if (p1Troop === p2Troop) {
      if (p1Power === p2Power) {
        winner = 'none'
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
}

createMultCards('p2', topStack, 5)
createMultCards('p1', bottomStack, 5)
// const button = document.createElement('button')
// button.innerText = 'test'
// button.setAttribute('id', 'test-btn')
// gameCont.append(button)
// button.addEventListener('click', () => {
//   cardChoices.p1 = new Card()
//   cardChoices.p2 = new Card()

//   console.clear()
//   console.log('Choices', cardChoices)
//   checkWinner()
// })
