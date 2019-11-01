'use strict';
// lesson07 - 2

// Получить кнопку "Рассчитать" через id
const start = document.querySelector('#start');

// Получить кнопки “+” (плюс) через Tag, каждую в своей переменной. 
const btnAll = document.querySelectorAll('button'),
    btnPusIncome = btnAll [0],
    btnPusExpenses = btnAll [1];

// получить чекбокс по id через querySelector
const chkBox = document.getElementById('#deposit-check');

// Получить поля для ввода возможных доходов (additional_income-item) при помощи querySelectorAll
const inputAdd = document.querySelectorAll('.additional_income-item');

// Получить все блоки в правой части программы через классы (которые имеют класс название-value,
// начиная с class="budget_day-value" и заканчивая class="target_month-value">)
const inBudgetMonth = document.querySelector('.budget_month-value'),
  inBudgetDay = document.querySelector('.budget_day-value'),
  inExpensesMonth = document.querySelector('.expenses_month-value'),
  inAddIncome = document.querySelector('.additional_income-value'),
  inAddExpensesValue = document.querySelector('.additional_expenses-value'), 
  inIncomePeriod = document.querySelector('.income_period-value'),
  inTargetMonth = document.querySelector('.target_month-value');

// Получить оставшиеся поля через querySelector каждый в отдельную переменную (Инпуты с левой стороны не забудьте про range)
const inPeriod = document.querySelector('.period-select'),
  inTargetAmount = document.querySelector('.target-amount'),
  inDepositPercent = document.querySelector('.deposit-percent'),
  inDepositAmount = document.querySelector('.deposit-amount'),
  inDepositBank = document.querySelector('.deposit-bank'),
  inAddExpensesIem = document.querySelector('.additional_expenses-iem'),
  inExpensesAmount = document.querySelector('.expenses-amount'),
  inExpensesTitle = document.querySelector('.expenses-title'),
  inAddIncomeItem = document.querySelector('.additional_income-item'),
  inIncomeAmount = document.querySelector('.income-amount'),
  inincomeTitle = document.querySelector('.income-title'),
  inSalaryAmount = document.querySelector('.salary-amount');


// Функция определения числа
const isNum = function(n){
  return (!isNaN(parseFloat(n)) && isFinite(n));
}

let money;

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
  budget: money,
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
      if (i == appData.addExpenses.length -1 ) { 
          strTemp = appData.addExpenses[i][0].toUpperCase() + strTemp;
      } else {
          strTemp = appData.addExpenses[i][0].toUpperCase()+ strTemp + ', ';
      }
      // Складываем конечную строку
      outStrAddexpenses += strTemp;
    }    
    console.log (outStrAddexpenses);   

    appData.deposit = confirm ('Есть ли у вас депозит в банке?');
    appData.getInfoDeposit ();

    let expensesName;
    for (let i = 0; i < 2; i++){
      if (i === 0) expensesName = prompt('Введите обязательную статью расходов.', 'Антиквариат');
      if (i === 1) expensesName = prompt('Введите обязательную статью расходов.', 'Коллекционное вино');

      appData.expenses[expensesName] = appData.checkInput(1, 'Во сколько это обойдется?', 7000);
    }
  },
  getExpensesMonth: function(){
      for (let key in appData.expenses){
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
}

start.eventListener('click',appData.start);

appData.getTargetMonth());
console.log('Уровень дохода: ', appData.getStatusIncome());
console.log('Наша программа включает в себя данные:');
for (let key in appData){
  console.log(key, appData[key]);
}

console.log('calcSavedMoney: ', appData.calcSavedMoney());
console.log('appData.percentDeposit: ', appData.percentDeposit);
console.log('appData.moneyDeposit: ', appData.moneyDeposit);


