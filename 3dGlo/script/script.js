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
        
    };
    
    const declOfNum = (n, titles)  => {
      return titles[(n % 10 === 1 && n % 100 !== 11) ?
         0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]};

    const updateClock = () => {
      const timer = getTimeRemanining();
     
      timerhours.textContent = (timer.hours < 10) ? ('0' + timer.hours) : timer.hours;
      timerminutes.textContent = (timer.minutes < 10) ? ('0' + timer.minutes) : timer.minutes;
      timerseconds.textContent = (timer.seconds < 10) ? ('0' + timer.seconds) : timer.seconds; 
      if (timer.days === 0) {
        timerdays.remove();
      } else {
        timerdays.textContent = `${((timer.days < 10) ? ('0' + timer.days) : timer.days)}
                                 ${declOfNum(timer.days, ['день', 'дня', 'дней'])} : `;
      }
    };
    
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
  };

  countTimer('1 december 2019');

  //menu
  const toggleMenu = () =>{
    const btnMenu =  document.querySelector('.menu'),
      menu =  document.querySelector('menu'),
      menuLi = menu.querySelectorAll('ul>li'),
      closeBtn = document.querySelector('.close-btn'),
      
      //фция закрытие/открытие меню 
      handlerMenu = () => {
        menu.classList.toggle('active-menu');
      };
      
      // обработка клика на открытие меню
     btnMenu.addEventListener('click', (event) => {
      let target =  event.target;
      console.log('target: ', target);
       handlerMenu();
     });
     //обработока кликов на закрытие по closeBtn и элементам меню
     menu.addEventListener('click', (event) => {
      let target =  event.target;
      
       if (target === closeBtn){
         handlerMenu();
        } else if (target.href !== undefined) {
          handlerMenu();
        } else {
          menuLi.forEach((elem) => { 
          if (target === elem){
            handlerMenu();
         } 
        });
      }
     });
  
  };

  toggleMenu();

  //popup
  const togglePopUp = () => {
     
    const popUp = document.querySelector('.popup'),
          popUpContent = document.querySelector('.popup-content'),
    // кнопки запуска модальных окон
      popUpBtn = document.querySelectorAll('.popup-btn');
    let flyInterval,
      count = 0.01;
      popUpContent.style.opacity = 0;
    popUpBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        popUp.style.display = 'block';
        //popUpContent.style.position = 'relative';
       flyInterval = requestAnimationFrame(flyAnimate);
      });
    });
    const closePopUp = () => {
      popUp.style.display = 'none';
      //popUpContent.style.position = 'fixed';
      popUpContent.style.opacity = 0;
      count = 0.01;
      cancelAnimationFrame(flyInterval);
    };

    // закрытие мод окна по клику мимо него практика
    popUp.addEventListener('click', (event) =>{
      let target = event.target;
      if (target.classList.contains('popup-close')){
        closePopUp();
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          closePopUp();
        }
      }
    });   

    //anime
  
    let flyAnimate = () => {
      //debugger;
      flyInterval = requestAnimationFrame(flyAnimate);
      count=count + 0.01;

      //document.documentElement.clientWidth
      console.dir('document.documentElement: ', document.documentElement);
      console.dir('popUpContent: ', popUpContent);
      //debugger;
      //let opp = popUpContent.style.opacity;
          if (popUpContent.style.opacity <= 1) {
              popUpContent.style.opacity = count; 
          } else {
            cancelAnimationFrame(flyInterval);
          }

/*
      if(screen.width > 768){
        if(count < (document.documentElement.clientWidth - popUpContent.offsetWidth)&&
          (count < (document.documentElement.clientHeight - popUpContent.offsetHeight))){
            
            popUpContent.style.left = count + 'px';
            popUpContent.style.top = count + 'px';
        } else if (count < (document.documentElement.clientHeight - popUpContent.offsetHeight)){
          
          popUpContent.style.top = count + 'px';
        } else if (count < (document.documentElement.clientWidth - popUpContent.offsetWidth)) {
          popUpContent.style.left = count + 'px';
        } else {
          cancelAnimationFrame(flyInterval);
        }
      } else {
        cancelAnimationFrame(flyInterval);
      }*/
    }; 
    
  };

  togglePopUp();

  // tabs
  const tabs = () =>{
    const tabHeader = document.querySelector('.service-header'),
    tab = tabHeader.querySelectorAll('.service-header-tab'),
    tabContent = document.querySelectorAll('.service-tab');
    
    const toggleTabContent = (index) => {
      //debugger;
      for (let i = 0; i < tabContent.length; i++){
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };
    
    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');
      
        if (target){
          
          tab.forEach((item,i) => {
            
            if(item === target){
              
              toggleTabContent(i);
            }

          });

        }
      
    });
  };

  tabs();

  //img mouse toggle
  const ToggleImg = () => {
    const commandId = document.getElementById('command'),
    setSrc = (trgt) => {
      const src = trgt.getAttribute('src');
      trgt.setAttribute('src',trgt.getAttribute('data-img'));
      trgt.setAttribute('data-img', src);
    };

    commandId.addEventListener('mouseover', (event) => {
      let target = event.target;
      
      target = target.closest('img');
     
      if (target) { 
        setSrc(target);
      }
    });

    commandId.addEventListener('mouseout', (event) => {
      let target = event.target;

      target = target.closest('img');

      if (target) { 
        setSrc(target);
      }
    });
  };
  ToggleImg();

  //calc only number input
  const onlyNumber = () =>{
    const calcBlock =  document.querySelector('.calc-block');
      
      calcBlock.addEventListener('input', (event) =>{
        let target = event.target;
        target = target.closest('input');
        let number = target.value;
        target.value = number.replace(/\D/g, '');
      });
    
  };
  onlyNumber();
});