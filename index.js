const input = document.getElementById('name')
const playBtn = document.getElementById('play-btn')
const menuBtn = document.getElementById('how-btn')

const rules = ['rule', 'rule', 'rule', 'rule', 'rule', 'rule', 'rule', 'rule']

const playBtnHandler = (evt) => {
  window.location.href = `${window.origin}/game.html`
}

const menuBtnHandler = (evt) => {
  generateHowTo()
}

const dismissMenuHandler = (evt) => {
  const parent = document.querySelector('.how-to')
  parent.remove()
}

const generateHowTo = () => {
  const container = document.createElement('div')
  container.classList.add('how-to')

  const h2 = document.createElement('div')
  h2.innerText = 'How To Play'

  const ul = document.createElement('ul')
  for (let rule of rules) {
    const li = document.createElement('li')
    li.innerText = rule

    ul.append(li)
  }

  const dismissBtn = document.createElement('button')
  dismissBtn.innerText = 'Ok'
  dismissBtn.addEventListener('click', dismissMenuHandler)

  container.append(h2)
  container.append(ul)
  container.append(dismissBtn)

  document.body.append(container)
}

playBtn.addEventListener('click', playBtnHandler)
menuBtn.addEventListener('click', menuBtnHandler)
