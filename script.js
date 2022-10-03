////////////////////////////
// Classes
////////////////////////////
class Card {
  constructor(owner) {
    const troopOptions = ['Spearmen', 'Cavalry', 'Archers']
    const randTroop = Math.floor(Math.random() * troopOptions.length)
    const randPower = Math.floor(Math.random() * 10 + 1)

    this.owner = owner
    this.cardElem = null
    this.troop = troopOptions[randTroop]
    this.power = randPower
  }

  createCard(parentElem) {
    this.cardElem = document.createElement('div')
    this.cardElem.classList.add('card')

    const name = document.createElement('p')
    name.classList.add('troop')
    name.innerText = this.troop[0]

    const power = document.createElement('p')
    power.classList.add('power')
    power.innerText = this.power

    this.cardElem.append(name)
    this.cardElem.append(power)

    parentElem.append(this.cardElem)
  }

  getCardElem() {
    return this.cardElem
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
const topWinStack = topStack.querySelectorAll('.win-stack div')
const bottomStack = document.getElementById('bottom')
const bottomWinStack = bottomStack.querySelectorAll('.win-stack div')

const gameInfo = {
  p1: {
    choice: null,
    winStack: []
  },
  p2: {
    choice: null,
    winStack: []
  }
}

const { p1, p2 } = gameInfo

////////////////////////////
// Helper functions
////////////////////////////
const resetCardChoices = () => {
  p1.choice = null
  p2.choice = null
}

const choicesFilled = () => {
  return p1.choice !== null && p2.choice !== null
}

////////////////////////////
// Event listeners
////////////////////////////
const cardMouseOver = (evt, card) => {
  const cardElem = card.getCardElem()
  if (!cardElem.classList.contains('selected')) {
    cardElem.classList.add('hover')
  }
}

const cardMouseLeave = (evt, card) => {
  const cardElem = card.getCardElem()
  cardElem.classList.remove('hover')
}

const cardClick = (evt, card) => {
  const cardElem = card.getCardElem()

  if (
    cardElem.parentElement === bottomStack ||
    cardElem.parentElement === topStack
  ) {
    cardElem.classList.add('selected')

    if (card.getOwner() === 'p1') {
      p1ChoiceCont.append(cardElem)
      p1.choice = card
      playRound()
    } else {
      p2ChoiceCont.append(cardElem)
      p2.choice = card
      playRound()
    }
  }
}

////////////////////////////
// Game functions
////////////////////////////
const createMultCards = (owner, parentElem, amount) => {
  for (let i = 0; i < amount; i++) {
    const card = new Card(owner)
    card.createCard(parentElem)

    card.getCardElem().addEventListener('mouseover', (evt) => {
      cardMouseOver(evt, card)
    })

    card.getCardElem().addEventListener('mouseleave', (evt) => {
      cardMouseLeave(evt, card)
    })

    card.getCardElem().addEventListener('click', (evt) => {
      cardClick(evt, card)
    })
  }
}

const checkRoundWinner = () => {
  if (choicesFilled()) {
    const p1Choice = p1.choice
    const p2Choice = p2.choice

    let winner = null
    if (p1Choice.troop === p2Choice.troop) {
      if (p1Choice.power === p2Choice.power) {
        winner = 'none'
      } else if (p1Choice.power > p2Choice.power) {
        winner = p1
      } else {
        winner = p2
      }
    } else if (p1Choice.troop === 'Spearmen') {
      if (p2Choice.troop === 'Cavalry') {
        winner = p1
      } else {
        winner = p2
      }
    } else if (p1Choice.troop === 'Cavalry') {
      if (p2Choice.troop === 'Archers') {
        winner = p1
      } else {
        winner = p2
      }
    } else if (p1Choice.troop === 'Archers') {
      if (p2Choice.troop === 'Spearmen') {
        winner = p1
      } else {
        winner = p2
      }
    }
    return winner
  }
}

const playRound = () => {
  if (choicesFilled()) {
    const winner = checkRoundWinner()

    if (winner !== 'none') {
      // win
      winner.winStack.push(winner.choice)

      const cardElem = winner.choice.getCardElem()
      const currentWins = winner.winStack.length

      setTimeout(() => {
        if (winner.choice.owner === 'p1') {
          bottomWinStack[currentWins - 1].append(cardElem)
          p2.choice.getCardElem().remove()
        } else if (winner.choice.owner === 'p2') {
          topWinStack[currentWins - 1].append(cardElem)
          p1.choice.getCardElem().remove()
        }
        resetCardChoices()
      }, 1000)
    } else {
      //draw
      setTimeout(() => {
        p1.choice.getCardElem().remove()
        p2.choice.getCardElem().remove()

        resetCardChoices()
      }, 1000)
    }
  }
}

createMultCards('p2', topStack, 5)
createMultCards('p1', bottomStack, 5)
// const button = document.createElement('button')
// button.innerText = 'test'
// button.setAttribute('id', 'test-btn')
// gameCont.append(button)
// button.addEventListener('clonst appendToWinStack = (stack, winner) => {
//   cardChoices.p2 = new Card()

//   console.clear()
//   console.log('Choices', cardChoices)
//   checkRoundWinner()
// })
