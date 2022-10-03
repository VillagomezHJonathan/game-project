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

  makeCard() {
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

    return this.cardElem
  }

  getCardElem() {
    return this.cardElem
  }

  getOwner() {
    return this.owner
  }

  removeCardElem() {
    this.cardElem.remove()
  }
}

class Player {
  constructor(name, homeBase) {
    this.name = name
    this.choice = null
    this.health = 100
    this.winsArr = []
    this.homeBase = homeBase
  }

  getName() {
    return this.name
  }

  takeDamage(amount) {
    this.health -= amount
  }

  getHealth() {
    return this.health
  }

  setChoice(choice) {
    this.choice = choice
  }

  resetChoice() {
    this.choice = null
  }

  removeChoiceElem() {
    this.choice.getCardElem().remove()
  }

  appendChoiceElem(destination) {
    destination.append(this.choice.getCardElem())
  }

  getChoice() {
    return this.choice
  }

  appendToStack(cardElem) {
    const stack = this.homeBase.querySelector('.stack')
    stack.append(cardElem)
  }

  getHomeBase() {
    return this.homeBase
  }

  getStack() {
    return this.homeBase.querySelector('.stack')
  }

  getHealthBar() {
    return this.homeBase.querySelector('.health::before')
  }

  pushToWinsArr(card) {
    this.winsArr.push(card)
  }

  getWinsArr() {
    return this.winsArr
  }

  resetWinsArr() {
    this.winsArr = []
  }
}

////////////////////////////
// Global variables
////////////////////////////
const gameCont = document.getElementById('game-container')
const mainStage = document.getElementById('main-stage')

const p1 = new Player('p1', document.getElementById('bottom'))
const p1ChoiceCont = document.getElementById('p1-choice')

const p2 = new Player('p2', document.getElementById('top'))
const p2ChoiceCont = document.getElementById('p2-choice')

////////////////////////////
// Helper functions
////////////////////////////
const resetCardChoices = () => {
  p1.resetChoice()
  p2.resetChoice()
}

const removeCardChoicesElems = () => {
  p1.removeChoiceElem()
  p2.removeChoiceElem()
}

const choicesFilled = () => {
  return p1.getChoice() !== null && p2.getChoice() !== null
}

const clearWinStackElem = (stack) => {
  stack.forEach((div) => {
    div.innerHTML = ''
  })
}

const updateWinStack = (player) => {
  const stackDiv = player.getHomeBase().querySelectorAll('.win-stack .winner')
  const currentWinPos = player.getWinsArr().length - 1

  stackDiv[currentWinPos].append(player.getChoice().getCardElem())
}

const getTotalTroopDamage = (player) => {
  const winArr = player.getWinsArr()

  let total = 0

  winArr.forEach((win) => {
    total += win.power
  })

  return total
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
    cardElem.parentElement === p1.getStack() ||
    cardElem.parentElement === p2.getStack()
  ) {
    if (card.getOwner().getName() === p1.getName() && p1.getChoice() === null) {
      cardElem.classList.add('selected')
      p1.setChoice(card)
      p1.appendChoiceElem(p1ChoiceCont)
      playRound()
    } else if (
      card.getOwner().getName() === p2.getName() &&
      p2.getChoice() === null
    ) {
      cardElem.classList.add('selected')
      p2.setChoice(card)
      p2.appendChoiceElem(p2ChoiceCont)
      playRound()
    }
  }
}

////////////////////////////
// Game functions
////////////////////////////
const generateCards = (owner, amount) => {
  for (let i = 0; i < amount; i++) {
    const card = new Card(owner)
    owner.appendToStack(card.makeCard())

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
  if (p1.getWinsArr().length === bottomWinStack.length) {
    const damage = getTotalTroopDamage(p1)
    p2.takeDamage(damage)
    clearWinStackElem(bottomWinStack)
    p1.resetWinsArr()
  } else if (p2.getWinsArr().length === topWinStack.length) {
    const damage = getTotalTroopDamage(p2)
    p1.takeDamage(damage)
    clearWinStackElem(topWinStack)
    p2.resetWinsArr()
  }
}

const playRound = () => {
  if (choicesFilled()) {
    const winner = checkRoundWinner()

    setTimeout(() => {
      if (winner !== 'none') {
        winner.pushToWinsArr(winner.choice)

        if (winner.getName() === p1.getName()) {
          updateWinStack(p1)
          p2.removeChoiceElem()
        } else if (winner.getName() === p2.getName()) {
          updateWinStack(p2)
          p1.removeChoiceElem()
        }
      } else {
        removeCardChoicesElems()
      }

      p1.resetChoice()
      p2.resetChoice()
      generateCards(p1, 1)
      generateCards(p2, 1)
      attack()
    }, 1000)
  }
}

generateCards(p1, 5)
generateCards(p2, 5)
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
