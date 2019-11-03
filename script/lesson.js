document.addEventListener('DOMContentloaded', function(){
'use strict';
let clickElem = null;

function greenHundler(event){

  if(clickElem){
    clickElem.classList.remove('green');
  }

  clickElem = event.currentTarget;
  clickElem.classList.add('green');
}

document.querySelector('.event_btn').addEventListener('click',greenHundler);















});