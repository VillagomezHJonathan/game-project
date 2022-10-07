const input = document.getElementById('name')
const playBtn = document.getElementById('play-btn')
const menuBtn = document.getElementById('how-btn')

const rules = [
  'Spearmen beats Cavalry, Cavalry beats Archers, and Archers beats Cavalry',
  'If two cards of the same troop are drawn the one with the higher power rating wins',
  'After four wins you attack the enemy',
  'Damage dealt is calculated using the sum of power of the four cards',
  'First player to kill the other one wins'
]

const playBtnHandler = (evt) => {
  window.location.href = `${window.origin}/game.html`
}

const menuBtnHandler = (evt) => {
  generateHowTo()
}

const dissmissBtnHandler = (evt) => {
  const parent = document.querySelector('.alert')
  parent.remove()
}

const generateHowTo = () => {
  const container = document.createElement('div')
  container.classList.add('alert')

  const wrapper = document.createElement('div')
  wrapper.classList.add('wrapper')

  const h2 = document.createElement('h2')
  h2.innerText = 'How To Play'

  const ul = document.createElement('ul')
  for (let rule of rules) {
    const li = document.createElement('li')
    li.innerText = rule

    ul.append(li)
  }

  const dismissBtn = document.createElement('button')
  dismissBtn.classList.add('btn')
  dismissBtn.innerText = 'Ok'
  dismissBtn.addEventListener('click', dissmissBtnHandler)

  wrapper.append(h2)
  wrapper.append(ul)
  wrapper.append(dismissBtn)

  container.append(wrapper)

  document.body.append(container)
}

playBtn.addEventListener('click', playBtnHandler)
menuBtn.addEventListener('click', menuBtnHandler)
