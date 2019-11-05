'use strict';
// lesson09


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
  targetAmount = document.querySelector('.target-amount'), 
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
  
  //1) ЗАДАНИЕ Привязать контекст вызова функции start к appData 
  falshStart(){
    appData.start.call(appData);
  },

  start: function(){
  //2) ЗАДАНИЕ В нашем объекте везде использовать this как ссылку на объект appData (где это возможно)    
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
    this.blockInput(); 
    this.turnStartCancel();
  },

  // 4) ЗАДАНИЕ кнопка Сбросить, на которую навешиваем событие и выполнение метода reset
  // Метод reset должен всю программу возвращать в исходное состояние
  reset(){

    document.querySelectorAll('input').forEach(function(item){
      item.disabled = false;
      item.value = '';
      periodSelect.value = 1;
      periodAmount.textContent = '1';
    });

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
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  
  addIncomeBlock(){    
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem,btnIncomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      btnIncomePlus.style.display = 'none';
    }
  },
 
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
    this.period = document.querySelector('.period-select').value;
    console.log('this.period: ', this);
    periodAmount.textContent = this.period;
  },

  getExpensesMonth(){
    for (const key in this.expenses){
      this.expensesMonth += +this.expenses[key];
    }
  },
  getBudget(){
    this.budgetMonth = this.budget + +this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  getTargetMonth(){
    return Math.ceil(targetAmount.value / this.budgetMonth);
  },
  getStatusIncome(){
    if (this.budgetDay <= 0){
        return ('Что-то пошло не так');
    } else if (this.budgetDay <= 300){
        return ('Низкий уровень дохода');
    } else if (this.budgetDay <= 800){
        return ('Средний уровень дохода');
    } else {
        return ('Высокий уровень дохода');
    }
  },
  getInfoDeposit: function(){
    if (this.deposit) {
      this.percentDeposit = this.checkInput(1, 'Какой годовой процент?', 10);
      this.moneyDeposit = this.checkInput(1, 'Какая сумма на депозите?', 10000);
    }        
  },
  calcPeriod: function(){
    return this.budgetMonth * periodSelect.value;
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

//1) ЗАДАНИЕ Привязать контекст вызова функции start к appData 
salaryAmount.addEventListener('change',function(){
  start.addEventListener('click', appData.falshStart);
});
//3) ЗАДАНИЕ Проверить работу кнопок плюс и input-range (исправить если что-то не работает)
btnIncomePlus.addEventListener('click', appData.addIncomeBlock);
btnExpensesPlus.addEventListener('click', appData.addExpensesBlock);

periodSelect.addEventListener('change', function(){
  appData.getPeriod();
  incomePeriodValue.value = appData.calcPeriod();
});
cancel.addEventListener('click', appData.reset);