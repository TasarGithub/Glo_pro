// Lesson 10 part 1
'use strict';
/*
1) Сделать класс DomElement, который
   содержит свойства
  - selector, 
  - height, 
  - width, 
  - bg, 
  - fontSize
содержит метод, который создает элемент на странице   
- если строка selector начинается с точки, создаем div с классом
- если строка selector начинается с решетки # то создаем параграф с id
пример:
если передана строка '.block', то функция конструктор создает элемент с class="block"
если передана строка '#best', то функция конструктор создает элемент с id ="best"
с помощью cssText задавать стили: 
  - высотой - height,
  - шириной - width, 
  - background - bg
  - размер текста fontSize 
внутрь записывать любой текст

2) Создать новый объект на основе класса DomElement
3) Вызвать его метод чтобы получить элемент на странице

*/

function DomElement(selector, height, width, bg, fontSize) {

  this.selector = selector; 
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
  //debugger;
  DomElement.prototype.creatElem = function(){
    //debugger;
    if (this.selector[0] === '.'){
        let myDiv = document.createElement('div');
        
        myDiv.className = this.selector;
        myDiv.style.cssText = 'height:  ' + this.height + 'px;' + 'width: ' +  this.width + 'px;' + 'background: ' + this.bg  + ';'  +  'font-size: ' + this.fontSize + 'px;' ;
        document.body.append(myDiv);
        myDiv.innerHTML ='Привет';
    }else if(this.selector[0] === '#'){
      let myP = document.createElement('p');
      document.body.append(myP);
      myP.setAttribute('id', this.selector);
      myP.style.cssText = 'height:  ' + this.height + 'px;' + 'width: ' +  this.width + 'px;' + 'background: ' + this.bg  + ';'  +  'font-size: ' + this.fontSize + 'px;' ;
      myP.innerHTML ='Hello World';

    }
  };
}

let myElement = new DomElement('.myClass', 100, 20, 'red', 25 );
let myElement = new DomElement('#myId', 100, 20, 'red', 25 );
myElement.creatElem();
