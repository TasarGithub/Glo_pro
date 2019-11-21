window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // таймер
  const countTimer = (deadLine) => {
    //debugger;
    const timerdays= document.querySelector('#timer-days'),
        timerhours= document.querySelector('#timer-hours'),
        timerminutes = document.querySelector('#timer-minutes'),
        timerseconds = document.querySelector('#timer-seconds');

    let getTimeRemanining = () => {
      const dateStop = new Date(deadLine).getTime(),
        dateNow = new Date().getTime(),
        timeRemaning = (dateStop -dateNow) / 1000,
        seconds = Math.floor(timeRemaning % 60),
        minutes = Math.floor((timeRemaning / 60) % 60),
        hours = Math.floor (timeRemaning / 60 / 60 % 24),
        days = Math.floor (timeRemaning / 60 / 60 / 24);
      return {timeRemaning, days, hours, minutes, seconds};
        
    }
    const updateClock = () => {
      const timer = getTimeRemanining();
     
      timerhours.textContent = (timer.hours < 10) ? ('0' + timer.hours) : timer.hours;
      timerminutes.textContent = (timer.minutes < 10) ? ('0' + timer.minutes) : timer.minutes;
      timerseconds.textContent = (timer.seconds < 10) ? ('0' + timer.seconds) : timer.seconds; 
      timerdays.textContent = (timer.days < 10) ? ('0' + timer.days) : timer.days;
      
      console.log('timer.timeRemaning: ', timer.timeRemaning);
    }
    
    const timer = getTimeRemanining();
    if (timer.timeRemaning > 0) {
       const idTimer = setInterval(updateClock, 1000);
      setTimeout( () => {
        clearTimeout(idTimer);
      }, ((timer.timeRemaning) * 1000));
    } else {
      timerhours.textContent = '00';
      timerminutes.textContent = '00';
      timerseconds.textContent = '00'; 
      timerdays.textContent = '00';
    }
  }
    
countTimer('1 december 2019');

});