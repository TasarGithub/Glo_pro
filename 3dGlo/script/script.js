window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // таймер
  function countTimer(deadLine) {
    //debugger;
    let timerdays= document.querySelector('#timer-days'),
        timerhours= document.querySelector('#timer-hours'),
        timerminutes = document.querySelector('#timer-minutes'),
        timerseconds = document.querySelector('#timer-seconds');

    function getTimeRemanining() {
    let dateStop = new Date(deadLine).getTime(),
        dateNow = new Date().getTime(),
        timeRemaning = (dateStop -dateNow) / 1000,
        seconds = Math.floor(timeRemaning % 60),
        minutes = Math.floor((timeRemaning / 60) % 60),
        hours = Math.floor (timeRemaning / 60 / 60 % 24),
        days = Math.floor (timeRemaning / 60 / 60 / 24);
        return {timeRemaning, days, hours, minutes, seconds};
        
    }
    function updateClock() {
      let timer = getTimeRemanining();

      timerhours.textContent = timer.hours;
      timerminutes.textContent = timer.minutes;
      timerseconds.textContent = timer.seconds;
      timerdays.textContent = timer.days;

      if (timer.timeRemaning > 0) {
        setTimeout(updateClock, 1000);
      }

    }
    updateClock();

  }
  //setInterval(countTimer , 1000, '1 december 2019');
  //console.log(timeRemaning);
  countTimer('1 december 2019')
});