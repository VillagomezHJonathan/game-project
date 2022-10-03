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

  aignCard(player) {
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

    player.append(this.cardElem)
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

class Player {
  constructor(name) {
    this.name = name
    this.choice = null
    this.health = 100
    this.winStack = []
  }

  getName() {
    return this.name
  }

  setChoice(choice) {
    this.choice = choice
  }

  getChoice() {
    return this.choice
  }

  pushToWinStack(card) {
    this.winStack.push(card)
  }

  getWinStack() {
    return this.winStack
  }

  resetWinStack() {
    this.winStack = []
  }
}

////////////////////////////
// Global variables
////////////////////////////
const gameCont = document.getElementById('game-container')
const mainStage = document.getElementById('main-stage')

const p1ChoiceCont = document.getElementById('p1-choice')
const p2ChoiceCont = document.getElementById('p2-choice')

const p1Health = document
  .getElementById('bottom')
  .querySelector('.health::before')
const p2Health = document.getElementById('top').querySelector('.health::before')

const topStack = document.getElementById('top').querySelector('.stack')
const topWinStack = document
  .getElementById('top')
  .querySelectorAll('.win-stack div')

const bottomStack = document.getElementById('bottom').querySelector('.stack')
const bottomWinStack = document
  .getElementById('bottom')
  .querySelectorAll('.win-stack div')

const p1 = new Player('p1')
const p2 = new Player('p2')

////////////////////////////
// Helper functions
////////////////////////////
const resetCardChoices = () => {
  p1.setChoice(null)
  p2.setChoice(null)
}

const choicesFilled = () => {
  return p1.getChoice() !== null && p2.getChoice() !== null
}

const clearWinStackElem = (stack) => {
  stack.forEach((div) => {
    div.innerHTML = ''
  })
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
    if (card.getOwner() === p1.getName() && p1.getChoice() === null) {
      cardElem.classList.add('selected')
      p1ChoiceCont.append(cardElem)
      p1.setChoice(card)
      playRound()
    } else if (card.getOwner() === p2.getName() && p2.getChoice() === null) {
      cardElem.classList.add('selected')
      p2ChoiceCont.append(cardElem)
      p2.setChoice(card)
      playRound()
    }
  }
}

////////////////////////////
// Game functions
////////////////////////////
const generateCards = (owner, player, amount) => {
  for (let i = 0; i < amount; i++) {
    const card = new Card(owner)
    card.aignCard(player)

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
    const p1Choice = p1.getChoice()
    const p2Choice = p2.getChoice()

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

const attack = () => {
  if (p1.getWinStack().length === bottomWinStack.length) {
    clearWinStackElem(bottomWinStack)
    p1.resetWinStack()
    console.log('p1 attacks')
  } else if (p2.getWinStack().length === topWinStack.length) {
    clearWinStackElem(topWinStack)
    p2.resetWinStack()
    console.log('p2 attacks')
  }
}

const playRound = () => {
  if (choicesFilled()) {
    const winner = checkRoundWinner()

    setTimeout(() => {
      if (winner !== 'none') {
        winner.pushToWinStack(winner.choice)

        const cardElem = winner.getChoice().getCardElem()
        const currentWins = winner.getWinStack().length

        if (winner.choice.owner === 'p1') {
          bottomWinStack[currentWins - 1].append(cardElem)
          p2.choice.getCardElem().remove()
        } else if (winner.choice.owner === 'p2') {
          topWinStack[currentWins - 1].append(cardElem)
          p1.choice.getCardElem().remove()
        }
      } else {
        p1.choice.getCardElem().remove()
        p2.choice.getCardElem().remove()
      }

      generateCards('p1', bottomStack, 1)
      generateCards('p2', topStack, 1)
      resetCardChoices()
      attack()
    }, 1000)
  }
}

generateCards('p1', bottomStack, 5)
generateCards('p2', topStack, 5)
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
