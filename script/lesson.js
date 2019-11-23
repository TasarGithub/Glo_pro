'use strict';
//lesson14

const buttons = document.querySelectorAll('.button');
content = document.querySelector('.content');

wrapButtons = document.querySelector

const changeText = (element) => {
  content.textContent = element.textContent;
};

for (let i = 0, btnlnt = buttons.length; i < btnlnt; i++) {
  buttons[i].addEventListener('click', () => changeText(buttons[i]));
}

function addButton() {
  const newButton = buttons[0].cloneNode();
  let textButton = buttons.length + 1;
  if (textButton < 10) {
    textButton = `0${textButton}`;
  }
  wrapButtons.appendChild(newButton);
}