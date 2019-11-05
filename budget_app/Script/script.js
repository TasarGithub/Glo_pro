'use strict';
// lesson08

// Получить кнопку "Рассчитать" через id
const start = document.querySelector('#start'),
  cancel = document.querySelector('#cancel'),
  btnPlus = document.querySelectorAll('button'),
  btnIncomePlus = btnPlus [0],
  btnExpensesPlus = btnPlus [1],
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  depositCheck = document.getElementById('#deposit-check'),
  budgetDayValue = document.querySelector('.budget_day-value'),
  budgetMonthValue = document.querySelector('.budget_month-value'),
  expensesMonthValue = document.querySelector('.expenses_month-value'),
  accumulateMonthValue = document.querySelector('.accumulate_month-value'),
  additionalIncomeValue = document.querySelector('.additional_income-value'),
  additionalExpensesValue = document.querySelector('.additional_expenses-value'),
  targetMonthValue = document.querySelector('.target_month-value'),
  incomePeriodValue = document.querySelector('.income_period-value'),
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('.income-title'),
  additionalExpenses = document.querySelector('.additional_expenses'),
  periodSelect = document.querySelector('.period-select'),
  income = document.querySelectorAll('.income'),
  depositPercent = document.querySelector('.deposit-percent'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositBank = document.querySelector('.deposit-bank'),
  additionalExpensesIem = document.querySelector('.additional_expenses-iem'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'), //получ на практике
  periodAmount = document.querySelector('.period-amount');
  let expensesItems = document.querySelectorAll('.expenses-items'),
      incomeItems =  document.querySelectorAll('.income-items');

// Функция определения числа
const isNum = function(n){
  return (!isNaN(parseFloat(n)) && isFinite(n));
}

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  expensesMonth: 0,
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  // period: 12, замена на элемент верстки period-select
  
  falshStart(){
    appData.start.call(appData);
  },

  start: function(){
    //newContext();
    console.log(this);
    //debugger;
    this.budget = +salaryAmount.value;
    this.getIncome();
    this.getExpenses();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.getTargetMonth();
    
    this.showResult();
// 6) ЗАДАНИЕ Блокировать все input[type=text] с левой стороны после нажатия кнопки
// рассчитать,
    this.blockInput(); 
// после этого кнопка Рассчитать пропадает и появляется кнопка
// Сбросить (есть в верстке) на кнопку сбросить пока ничего не навешиваем
    this.turnStartCancel();
  },

  turnStartCancel(){
    start.style.display = 'none';
    cancel.style.display = "block";
  },

  blockInput(){
    let divData = document.querySelector('.data');
    divData.querySelectorAll('input[type=text]').forEach(function(item){
      item.disabled = true;
    });
  },
  showResult(){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth(); 
// 5) ЗАДАНИЕ Добавить обработчик события внутри метода showResult, который будет отслеживать
// период и сразу менять значение в поле “Накопления за период”
    periodSelect.addEventListener('change',function(){
      this.getPeriod();
    });
    incomePeriodValue.value = this.calcPeriod();
    
  },
  // добавление блока расходов
  addExpensesBlock(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem,btnExpensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      btnExpensesPlus.style.display = 'none';
    }
  },
  
  //получить все расходы и записать их в объект
  //будем перебирать с помощью forEach все элементы с классом expenses-item
  getExpenses(){
    expensesItems.forEach (function(item){
      //debugger;
      let itemExpenses = item.querySelector('.expenses-title').value,
          cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== ''){
        this.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  //2) ЗАДАНИЕ Создать метод addIncomeBlock аналогичный addExpensesBlock
  addIncomeBlock(){    
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem,btnIncomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      btnIncomePlus.style.display = 'none';
    }
  },
  //1) ЗАДАНИЕ Переписать метод getIncome аналогично getExpenses
  //получить все доходы и записать их в объект
  //будем перебирать с помощью forEach все элементы с классом income-items
  getIncome(){
    incomeItems.forEach (function(item){
      //debugger;
      let itemIncome = item.querySelector('.income-title').value,
          cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome.value !== '' && cashIncome !== ''){
        appData.income[itemIncome] = cashIncome;
      }
      //debugger;
    });
    for (let key in appData.income){
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddExpenses(){
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if(item !== ''){
        appData.addExpenses.push(item);
      }
    });
  },
  //Названия возможных источников дохода
  getAddIncome(){
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if(item !== ''){
        appData.addIncome.push(itemValue);
      }
    });
  },

  getPeriod(){
    appData.period = document.querySelector('.period-select').value;
    periodAmount.textContent = appData.period;
  },

  getExpensesMonth(){
    for (const key in appData.expenses){
      appData.expensesMonth += +appData.expenses[key];
    }
  },
  getBudget(){
    appData.budgetMonth = appData.budget + +appData.incomeMonth - appData.expensesMonth;
    //3) ЗАДАНИЕ Округлить вывод дневного бюджета
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth(){
    return Math.ceil(targetAmount.value / appData.budgetMonth);
  },
  getStatusIncome(){
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
  calcPeriod: function(){
    return appData.budgetMonth * periodSelect.value;
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
let hardBind = function(){
  appData.start();
};
//debugger;
// 7) ЗАДАНИЕ Вместо проверки поля Месячный доход в методе Start, запретить нажатие кнопки
//  Рассчитать пока поле Месячный доход пустой
salaryAmount.addEventListener('change',function(){
  start.addEventListener('click',appData.falshStart);
});
btnIncomePlus.addEventListener('click', appData.addIncomeBlock);
btnExpensesPlus.addEventListener('click', appData.addExpensesBlock);
 //4)ЗАДАНИЕ Число под полоской (range) должно меняться в зависимости от позиции range
periodSelect.addEventListener('change', function(){
  appData.getPeriod();
// 5) ЗАДАНИЕ Добавить обработчик события внутри метода showResult, который будет отслеживать
// период и сразу менять значение в поле “Накопления за период”
  incomePeriodValue.value = appData.calcPeriod();
});
