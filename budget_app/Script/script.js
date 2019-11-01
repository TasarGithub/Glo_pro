'use strict';
// lesson08

// Получить кнопку "Рассчитать" через id
const start = document.querySelector('#start');
const btnAll = document.querySelectorAll('button'),
    btnPusIncome = btnAll [0],
    btnPusExpenses = btnAll [1];
const chkBox = document.getElementById('#deposit-check'),
  budgetMonthValue = document.querySelector('.budget_month-value'),
  budgetDayValue = document.querySelector('.budget_day-value'),
  expensesMonthValue = document.querySelector('.expenses_month-value'),
  targetAmount = document.querySelector('.target-amount'),
  depositPercent = document.querySelector('.deposit-percent'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositBank = document.querySelector('.deposit-bank'),
  additionalExpensesIem = document.querySelector('.additional_expenses-iem'),
  additionalIncomeItem = document.querySelector('.additional_income-item'),
  additionalIncomeValue = document.querySelector('.additional_income-value'),
  additionalExpensesValue = document.querySelector('.additional_expenses-value'),
  incomePeriodValue = document.querySelector('.income_period-value'),
  targetMonthValue = document.querySelector('.target_month-value'),
  salaryAmount = document.querySelector('.salary-amount'),
  incomeAmount = document.querySelector('.income-amount'),
  incomeTitle = document.querySelector('.income-title'),
  expensesAmount = document.querySelector('.expenses-amount'),
  expensesTitle = document.querySelector('.expenses-title'),
  additionalExpenses = document.querySelector('.additional_expenses'),
  periodSelect = document.querySelector('.period-select');

// Функция определения числа
const isNum = function(n){
  return (!isNaN(parseFloat(n)) && isFinite(n));
}



let appData = {
  income: {},
  addIncome: [],
  expenses: {
      submarine: 1000
  },
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 1500000,
  period: 12,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  start: function() {
    do {
        money = prompt('Ваш месячный доход?',80000);    
    } while (!isNum(money));
    // appData.asking();
    // appData.getExpensesMonth();
    // appData.getBudget();
  },
  
  asking: function() {
    if (confirm('Есть  доп заработок')) {
      const itemIncome = appData.checkInput(0, 'Какой у вас дополнительный заработок?', 'Консультации');
      appData.income[itemIncome] = appData.checkInput(1, 'Сколько в месяц вы на этом зарабатывете?', 10000);
    }

    
    const  addExpenses = prompt('Перечислите возможные расходы ' +
    'за рассчитываемый период через запятую', 'набали, нашриланку, втай, всибирь');
    let outStrAddexpenses = '',
        strTemp = "";
    appData.addExpenses = addExpenses.toLowerCase().split(',');
    for (let i = 0; i <  appData.addExpenses.length; i++){
      //Убираем пробелы в элементах массива слов.
      appData.addExpenses[i] = appData.addExpenses[i].trim();

      //Запомнили слово без первой букквы
      strTemp = appData.addExpenses[i].slice(1);

      //Складываем новые слова с большой буквы + пробели запятая. Если конец строки, то пробел и запятая не нужны.
      if (i === appData.addExpenses.length - 1) { 
          strTemp = appData.addExpenses[i][0].toUpperCase() + strTemp;
      } else {
          strTemp = appData.addExpenses[i][0].toUpperCase()+ strTemp + ', ';
      }
      // Складываем конечную строку
      outStrAddexpenses += strTemp;
    }    
    console.log(outStrAddexpenses);   

    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    appData.getInfoDeposit();

    let expensesName;
    for (let i = 0; i < 2; i++){
      if (i === 0) expensesName = prompt('Введите обязательную статью расходов.', 'Антиквариат');
      if (i === 1) expensesName = prompt('Введите обязательную статью расходов.', 'Коллекционное вино');

      appData.expenses[expensesName] = appData.checkInput(1, 'Во сколько это обойдется?', 7000);
    }
  },
  getExpensesMonth: function(){
      for (const key in appData.expenses){
          appData.expensesMonth += appData.expenses[key];
      }
  },
  getBudget: function (){
      appData.budgetMonth = appData.budget - appData.expensesMonth;
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function(){
      return Math.ceil(appData.mission / appData.budgetMonth);
  },
  getStatusIncome: function(){
      if (appData.budgetDay <= 0){
          return ('Что-то пошло не так');
      } else if (appData.budgetDay <= 300){
          return ('Низкий уровень дохода');
      } else if (appData.budgetDay <= 800){
          return ('Средний уровень дохода');
      } else {
          return ('Высокий уровень дохода');
      }
  },
  getInfoDeposit: function(){
    if (appData.deposit) {
        appData.percentDeposit = appData.checkInput(1, 'Какой годовой процент?', 10);
        appData.moneyDeposit = appData.checkInput(1, 'Какая сумма на депозите?', 10000);
    }        
  },
  calcSavedMoney: function(){
      
      console.log('appData.period: ', appData.period);
      console.log('appData.budgetMonth: ', appData.budgetMonth);

      return appData.budgetMonth * appData.period;
  },
  checkInput: function(strOrNum,promptMessage,defaultItem){
    let checkItem;
      // strOrNum:  false - str, true - Num
      if (!!strOrNum) { 
          do {
              checkItem = prompt(promptMessage, defaultItem);
          } while (!isNum(checkItem));
          return +checkItem;
      } else {
          do {
              checkItem = prompt(promptMessage, defaultItem);
          } while (isNum(checkItem));
          return checkItem;
      }
      
  }
};

start.addEventListener('click',appData.start);

appData.getTargetMonth();
console.log('Уровень дохода: ', appData.getStatusIncome());
console.log('Наша программа включает в себя данные:');
for (const key in appData){
  console.log(key, appData[key]);
}

console.log('calcSavedMoney: ', appData.calcSavedMoney());
console.log('appData.percentDeposit: ', appData.percentDeposit);
console.log('appData.moneyDeposit: ', appData.moneyDeposit);