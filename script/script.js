// Lesson 12
'use strict';

// Добрый день (утро, вечер, ночь в зависимости от времени суток)
// Сегодня: Понедельник
// Текущее время:12:05:15 PM
// До нового года осталось 175 дней

window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const zeroPlus = (n) => (n < 10) ? '0' + n : n;

  const getTimeRemanining = (deadLine) => {
    const dateStop = new Date(deadLine).getTime(),
      date = new Date(),
      dateNow = date.getTime(),
      timeRemaning = (dateStop -dateNow) / 1000,
      seconds = date.getSeconds(),
      minutes =  date.getMinutes(),
      hours = date.getHours(),
      daysOfWeek = date.getDay(),
      daysRemainig = Math.floor (timeRemaning / 60 / 60 / 24);
    return {daysRemainig, hours, daysOfWeek, minutes, seconds};
      
  }

  const wd = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' ]


  const countTimer = (deadLine) => {
    const GoodDay = document.createElement('p'),
      today = document.createElement('p'),
      timeNow = document.createElement('p'),
      timeUntil = document.createElement('p'),
      timer = getTimeRemanining(deadLine);
      
    GoodDay.textContent = (timer.hours >= 6 && timer.hours < 12) ? 'Доброе утро' :
                          ((timer.hours >= 12 &&  timer.hours < 19 ) ? 'Добрый день' :
                          ((timer.hours >= 19 &&  timer.hours < 24 ) ? 'Добрый вечер' : 'Добрая ночь'));
    console.log('timer.hours: ', timer.hours);

    today.textContent = wd[timer.daysOfWeek];
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




