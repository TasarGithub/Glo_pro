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



  //menu
  const toggleMenu = () =>{
    const btnMenu =  document.querySelector('.menu'),
      menu =  document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItems = document.querySelectorAll('ul>li');
       //закрытие/открытие меню 
      const handlerMenu = () => {
        menu.classList.toggle('active-menu')
      }
    
  btnMenu.addEventListener('click', handlerMenu);
    
  closeBtn.addEventListener('click', handlerMenu);
  
  // закрытие при нажатии на какой-либо пункт меню
  menuItems.forEach( (elem) => elem.addEventListener('click',handlerMenu));
  }
  toggleMenu();

  //popup
  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
          popupContent = document.querySelector('.popup-content'),
    // кнопки запуска модальных окон
      popupBtn = document.querySelectorAll('.popup-btn'),
      popUpClose = document.querySelector('.popup-close');
    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        popup.style.display = 'block';
        popupContent.style.position = 'relative';
       flyInterval = requestAnimationFrame(flyAnimate);
      });
    });

    popUpClose.addEventListener('click', () => {
      popup.style.display = 'none';
      popupContent.style.position = 'fixed';
      cancelAnimationFrame(flyInterval);
    });

    //anime
    let flyInterval,
    count = 1;

    let flyAnimate = () => {
      //debugger;
      flyInterval = requestAnimationFrame(flyAnimate);
      count++;

      //document.documentElement.clientWidth
      //console.log('document.documentElement.clientWidth: ', document.documentElement.clientWidth);

      if(screen.width > 768){
        if(count < (document.documentElement.clientWidth - popupContent.offsetWidth)&&
          (count < (document.documentElement.clientHeight - popupContent.offsetHeight))){
            popupContent.style.left = count + 'px';
            popupContent.style.top = count + 'px';
        } else if (count < (document.documentElement.clientHeight - popupContent.offsetHeight)){
          
          popupContent.style.top = count + 'px';
        } else if (count < (document.documentElement.clientWidth - popupContent.offsetWidth)) {
          popupContent.style.left = count + 'px';
        } else {
          cancelAnimationFrame(flyInterval);
        }
      } else {
        cancelAnimationFrame(flyInterval);
      }
    };
    
  };

  togglePopUp();


  
});