//lesson07
'use strict';

// Используя только файл скрипта (html руками не трогать) выполнить такие действия:

// Восстановить порядок книг.
const myBook =  document.querySelectorAll('.book'),
    myBooks = document.querySelectorAll('.books');

myBooks[0].appendChild(myBook[2]);
myBooks[0].insertBefore(myBook[1],  myBook[0]);
myBooks[0].insertBefore(myBook[3],  myBook[5]);

// Заменить картинку заднего фона на другую из папки image
const  myBody = document.querySelector('body');
myBody.setAttribute('style','background-image: url(./image/you-dont-know-js.jpg)');

// Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")

const myText = myBook[4].innerHTML.replace('Пропопипы','Прототипы');
myBook[4].innerHTML = myText;

// Удалить рекламу со страницы
const myAdv = document.querySelector('.adv');
myAdv.remove();

// Восстановить порядок глав во второй и пятой книге
const ul2 = myBook[0].querySelectorAll('ul'),
    li2 = myBook[0].querySelectorAll('li');

ul2[0].insertBefore(li2[2], li2[9]);
ul2[0].insertBefore(li2[7], li2[2]);
ul2[0].insertBefore(li2[5], li2[7]);
ul2[0].insertBefore(li2[4], li2[5]);

const ul5 = myBook[5].querySelectorAll('ul'),
    li5 = myBook[5].querySelectorAll('li');

ul5[0].insertBefore(li5[5], li5[10]);
ul5[0].insertBefore(li5[8], li5[10]);
ul5[0].insertBefore(li5[2], li5[6]);
ul5[0].insertBefore(li5[9], li5[3]);

// в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место

const ul6 = myBook[2].querySelectorAll('ul'),
    li6 = myBook[2].querySelectorAll('li');

const newElem = document.createElement('li');
newElem.textContent = 'Глава 8: За пределами ES6'; 
ul6[0].insertBefore(newElem,li6[9]); 