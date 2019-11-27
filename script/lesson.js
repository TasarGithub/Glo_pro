'use strict';
//lesson17

//
document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('cars'),
    output = document.getElementById('output');
  select.addEventListener('change', (event) =>{
    const request = new XMLHttpRequest();

    request.open('GET', './cars.json');
  
    request.setRequestHeader('Content-type', 'application/json');
  
    request.send();
  
    request.addEventListener('loadend',(event) => {
      if (request.readyState === 4 && request.status === 200) {

        const data = JSON.parse(request.responseText);
        
      }
    });
  });




});