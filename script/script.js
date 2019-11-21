// Lesson 12
'use strict';

// Добрый день (утро, вечер, ночь в зависимости от времени суток)
// Сегодня: Понедельник
// Текущее время:12:05:15 PM
// До нового года осталось 175 дней

window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  let zeroPlus = (n) => (n < 10) ? '0' + n : n;

  let getTimeRemanining = (deadLine) => {
    let dateStop = new Date(deadLine).getTime(),
      dateNow = new Date().getTime(),
      timeRemaning = (dateStop -dateNow) / 1000,
      date = new Date(),
      seconds = date.getSeconds(),
      minutes =  date.getMinutes(),
      hours = date.getHours(),
      daysOfWeek = date.getDay(),
      daysRemainig = Math.floor (timeRemaning / 60 / 60 / 24);
    return {timeRemaning, daysRemainig, hours, daysOfWeek, minutes, seconds};
      
  }

  let wd = (d) => {
    switch (d) {
      case 0: {
        return 'Воскресенье';
        break;
      }
      case 1: {
        return 'Понедельник';
        break;
      }
      case 2: {
        return 'Вторник';
        break;
      }
      case 3: {
        return 'Среда';
        break;
      }
      case 4: {
        return 'Четверг';
        break;
      }
      case 5: {
        return 'Пятница';
        break;
      }
      case 6: {
        return 'Суббота';
        break;
      }
    }
  } 

  let countTimer = (deadLine) => {
    let GoodDay = document.createElement('p'),
        today = document.createElement('p'),
        timeNow = document.createElement('p'),
        timeUntil = document.createElement('p');
    
      let timer = getTimeRemanining(deadLine);
      
      GoodDay.textContent = (timer.hours > 6 && timer.hours < 12) ? 'Доброе утро' :
                            ((timer.hours > 12 &&  timer.hours < 19 ) ? 'Добрый день' :
                            ((timer.hours > 19 &&  timer.hours < 24 ) ? 'Добрый вечер' : 'Добрая ночь'));
      today.textContent = wd(timer.daysOfWeek);
      timeNow.textContent = `Текущее время : ${(timer.hours > 12) ? zeroPlus(timer.hours-12) :
                            zeroPlus(timer.hours)}:${zeroPlus(timer.minutes)}:${zeroPlus(timer.seconds)} ${(timer.hours > 12) ? 'PM' : 'AM'}`;
      timeUntil.textContent = `До нового года осталось ${timer.daysRemainig} дней`;
      
      document.body.append(GoodDay);
      document.body.append(today);
      document.body.append(timeNow);
      document.body.append(timeUntil);
  }

  countTimer('1 january 2020');

});




