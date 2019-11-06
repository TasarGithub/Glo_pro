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
  depositCheckmark = document.querySelector('.deposit-checkmark'),
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
  docStateBegin: {},
  // period: 12, замена на элемент верстки period-select
  
  start: function(){
  //2) ЗАДАНИЕ В нашем объекте везде использовать this как ссылку на объект appData (где это возможно)    
    console.log('start',this);
    //alert ('Введите сумму месячного дохода');
    //debugger;
    this.docStateBegin = document;//.querySelectorAll()
    salaryAmount.value=salaryAmount.value.trim();
    if (!isNum(salaryAmount.value) || salaryAmount.value === '') {
      alert ('Введите сумму месячного дохода');
      return;
    }
    this.budget = +salaryAmount.value;
    this.getIncome();
    this.getExpenses();
    this.getExpensesMonth();  
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.getTargetMonth();
    
    this.showResult();
    
    this.turnStartCancel(1);
    this.blockUnBlockInput(1); 
  },
  // 4) ЗАДАНИЕ кнопка Сбросить, на которую навешиваем событие и выполнение метода reset
  // Метод reset должен всю программу возвращать в исходное состояние
  reset(){
      //debugger;
      // удаление  новых полей доп расходов
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length > 1) {
      for (let i = (expensesItems.length - 1); i >= 1 ; i--){
        if (expensesItems[i].parentNode) {
          expensesItems[i].parentNode.removeChild(expensesItems[i]);
        }
      }
      
    }
    btnExpensesPlus.style.display = 'block';

  // удаление  новых полей доп доходов
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length > 1) {
      for (let i = (incomeItems.length - 1); i >= 1 ; i--){
        if (incomeItems[i].parentNode) {
          incomeItems[i].parentNode.removeChild(incomeItems[i]);
        }
      }
      
    }
    btnIncomePlus.style.display = 'block';

    // Возвращаем   значения к началу
    document.querySelectorAll('input').forEach(function(item){
      item.value = '';
    });

    periodSelect.value = 1;
    periodAmount.textContent = '1';
    //меняем кнопку вновь на Рассчитать 
    this.turnStartCancel(0);
    // Разблокировка полей слева
    this.blockUnBlockInput(0);
  },

  turnStartCancel(n){
    if (n){
      start.style.display = 'none';
      cancel.style.display = "block";
    } else {
      start.style.display = "block";
      cancel.style.display = "none";
    }
    
  },

  getAllElementsWithAttribute(context, attribute)
  {
    let matchingElements = [];
    const allElements = context.getElementsByTagName('*');
    for (let i = 0; i < allElements.length; i++)
    {
      if (allElements[i].getAttribute(attribute) !== undefined)
      {
        // Element exists with attribute. Add to array.
        matchingElements.push(allElements[i]);
      }
    }
    //debugger;
    //const allElements = context.querySelectorAll('['+ attribute +']');
    return matchingElements;
  },

  blockUnBlockInput(n){
    //debugger;
    // block = 1;
    // unBlock = 0;
       const divData = document.querySelector('.data');
       const arrElemBlock = this.getAllElementsWithAttribute(divData,'disabled');
       for (let i = 0; i < arrElemBlock.length; i++){
         arrElemBlock[i].disabled = (n) ? true : false;
       }
  },

  showResult(){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth(); 

    periodSelect.addEventListener('change',(function(){
      this.getPeriod();
    }).bind(appData));
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
    const _this=this;
    expensesItems.forEach (function(item){
      //debugger;
      console.log(_this);
      let itemExpenses = item.querySelector('.expenses-title').value,
          cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== ''){
        _this.expenses[itemExpenses] = cashExpenses;
        
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
    const _this=this;
    incomeItems.forEach (function(item){
      
      //debugger;
      let itemIncome = item.querySelector('.income-title').value,
          cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome.value !== '' && cashIncome !== ''){
        _this.income[itemIncome] = cashIncome;
      }
      //debugger;
    });
    for (let key in _this.income){
      _this.incomeMonth += +_this.income[key];
    }
  },
  getAddExpenses(){
    let addExpenses = additionalExpensesItem.value.split(',');
    const _this = this;
    addExpenses.forEach(function(item){
      item = item.trim();
      if(item !== ''){
        _this.addExpenses.push(item);
      }
    });
  },
  //Названия возможных источников дохода
  getAddIncome(){
    const _this = this;
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if(item !== ''){
        _this.addIncome.push(itemValue);
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
start.addEventListener('click', appData.start.bind(appData));
//3) ЗАДАНИЕ Проверить работу кнопок плюс и input-range (исправить если что-то не работает)
btnIncomePlus.addEventListener('click', appData.addIncomeBlock);
btnExpensesPlus.addEventListener('click', appData.addExpensesBlock);

periodSelect.addEventListener('change', (function(){
  appData.getPeriod();
  incomePeriodValue.value = appData.calcPeriod();
}).bind(appData));
// 4) ЗАДАНИЕ Рассчитать пропадает и появляется кнопка Сбросить, на которую навешиваем событие и выполнение метода reset
// Метод reset должен всю программу возвращать в исходное состояние
cancel.addEventListener('click', appData.reset.bind(appData));