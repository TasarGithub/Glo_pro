'use strict';
// lesson11.1


const start = document.querySelector('#start'),
  cancel = document.querySelector('#cancel'),
  btnPlus = document.querySelectorAll('button'),
  btnIncomePlus = btnPlus [0],
  btnExpensesPlus = btnPlus [1],
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
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
      incomeItems =  document.querySelectorAll('.income-items'),
      depositCheck = document.getElementById('deposit-check');




const  AppData = function() {
  this.budget= 0;
  this.budgetDay= 0;
  this.budgetMonth= 0;
  this.income= {};
  this.expenses= {};
  this.incomeMonth= 0;
  this.addIncome= [];
  this.expensesMonth= 0;
  this.addExpenses= [];
  this.deposit= false;
  this.percentDeposit= 0;
  this.moneyDeposit= 0;


};


// Функция определения числа
AppData.prototype.isNum = n => !isNaN(parseFloat(n)) && isFinite(n);

AppData.prototype.start = function(){
  
    //console.log('start',this);
   
    //debugger;
    salaryAmount.value=salaryAmount.value.trim();
    if (!this.isNum(salaryAmount.value) || salaryAmount.value === '') {
      alert ('Введите сумму месячного дохода');
      return;
    }
    this.budget = +salaryAmount.value;
    this.getInExp();
    this.getExpensesMonth();  
    this.getAdd();
    this.getInfoDeposit();
    this.getBudget();
    this.getTargetMonth();
    this.showResult();
    this.turnStartCancel(1);
    this.blockUnBlockInput(1); 
  };


  AppData.prototype.reset = function(){
  //  debugger;
    // удаление  новых полей доп расходов

  if (expensesItems.length > 1) {
    for (let i = (expensesItems.length - 1); i > 0 ; i--){
      if (expensesItems[i].parentNode) {
        expensesItems[i].parentNode.removeChild(expensesItems[i]);
      }
    }
  }
  expensesItems = document.querySelectorAll('.expenses-items');

  // возврат кнопки +
  btnExpensesPlus.hidden = false;

// удаление  новых полей доп доходов

  if (incomeItems.length > 1) {
    for (let i = (incomeItems.length - 1); i > 0 ; i--){
      if (incomeItems[i].parentNode) {
        incomeItems[i].parentNode.removeChild(incomeItems[i]);
      }
    }
  }
  incomeItems = document.querySelectorAll('.income-items');

   // возврат кнопки +
  btnIncomePlus.hidden = false;

  // Возвращаем значения к началу
  document.querySelectorAll('input').forEach(function(item){
    item.value = '';
  });

  periodSelect.value = 1;
  periodAmount.textContent = '1';
  //debugger;
  depositCheck.checked = false;
  //обнуление всех данных
  this.budget= 0;
  this.budgetDay= 0;
  this.budgetMonth= 0;
  this.income= {};
  this.expenses= {};
  this.incomeMonth= 0;
  this.addIncome= [];
  this.expensesMonth= 0;
  this.addExpenses= [];
  this.deposit= false;
  this.percentDeposit= 0;
  this.moneyDeposit= 0;


  depositBank.style.display = 'none';
  depositAmount.style.display = 'none';
  depositPercent.value = '';
  depositPercent.style.display = 'none';
  depositAmount.value = '';
  



  //меняем кнопку вновь на Рассчитать 
  this.turnStartCancel(0);
  // Разблокировка полей слева
  this.blockUnBlockInput(0);
};

AppData.prototype.turnStartCancel = (n) => {
  if (n){
    start.hidden = true;
    cancel.style.display = "block";
  } else {
    start.hidden = false;
    cancel.style.display = "none";
  }
  
};

AppData.prototype.blockUnBlockInput = (n) => {
  // block = 1;
  // unBlock = 0;
     const divData = document.querySelector('.data');
     const arrElemBlock = divData.getElementsByTagName('*');  
     for (let i = 0; i < arrElemBlock.length; i++){
       if (arrElemBlock[i].type !== 'range'){
        arrElemBlock[i].disabled = !!(n);
       }
     }
};

AppData.prototype.showResult = function(){
  const _this = this;
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = this.getTargetMonth(); 

  periodSelect.addEventListener('change',(function(){
    this.getPeriod();
  }).bind(_this));
  incomePeriodValue.value = this.calcPeriod();
  
};

// добавление блоков расходов и доходов
AppData.prototype.addBlock = function(){
  console.log ('this.className', this.className);
  if (this.className === 'btn_plus expenses_add'){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem,btnExpensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      btnExpensesPlus.hidden = true;
    }
  }else{
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem,btnIncomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      btnIncomePlus.hidden = true;
    }    
  }
};

AppData.prototype.getInExp = function(){
  // для обнуления накопленных данных перед присваиванием после повтороного запуска Расчитать после копки Сбросить

  //debugger;
  const _this=this;
  const  count = item  => {
    const strInExp =  item.className.split('-')[0],
    itemInExp = item.querySelector(`.${strInExp}-title`).value,
    cashInExp = item.querySelector(`.${strInExp}-amount`).value;
    if (itemInExp !== '' && cashInExp !== ''){
      _this[strInExp][itemInExp] = cashInExp;
    }
  };  

  expensesItems.forEach(count);
  incomeItems.forEach(count);
  //debugger;

  for (let key in this.income){
    this.incomeMonth += +this.income[key];
  }

};

//Названия возможных расходов и доходов 
AppData.prototype.getAdd = function(){
  //debugger;
  let addExpenses = additionalExpensesItem.value.split(',');
  addExpenses.splice(0,0,'addExpenses');

  //const addIncomeArr = Array.prototype.map.call(additionalIncomeItem,el =>el.value );  1ый метод
  const addIncomeArr = Array.from(additionalIncomeItem, (item) => item.value); //2ой метод, лаконичнее

  addIncomeArr.splice(0,0,'addIncome');
  
   let count = (item,ind,arr) => {
    let itemValue = item.trim();
    if (ind !== 0){
      if(itemValue !== ''){
        this[arr[0]].push(itemValue);
      }
    }
  };
  addExpenses.forEach(count);
  addIncomeArr.forEach(count);
};

AppData.prototype.getPeriod = function(){
  this.period = document.querySelector('.period-select').value;
  //console.log('this.period: ', this);
  periodAmount.textContent = this.period;
};

AppData.prototype.getExpensesMonth = function(){
  for (const key in this.expenses){
    this.expensesMonth += +this.expenses[key];
  }
};
AppData.prototype.getBudget = function(){
  this.budgetMonth = Math.floor(this.budget + +this.incomeMonth - this.expensesMonth + (this.moneyDeposit * this.percentDeposit)/12);
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function(){  
  return Math.ceil(targetAmount.value / this.budgetMonth);
};
AppData.prototype.getStatusIncome = function(){
  if (this.budgetDay <= 0){
      return ('Что-то пошло не так');
  } else if (this.budgetDay <= 300){
      return ('Низкий уровень дохода');
  } else if (this.budgetDay <= 800){
      return ('Средний уровень дохода');
  } else {
      return ('Высокий уровень дохода');
  }
};
AppData.prototype.getInfoDeposit =  function(){
  //debugger;
  if (this.deposit) {
    this.percentDeposit =  depositPercent.value;
    this.moneyDeposit = depositAmount.value;
  }        
};
AppData.prototype.calcPeriod =  function(){
  return this.budgetMonth * periodSelect.value;
};
AppData.prototype.checkInput =  function(strOrNum,promptMessage,defaultItem){
  let checkItem;
  // strOrNum:  false - str, true - Num
  if (strOrNum) { 
      do {
          checkItem = prompt(promptMessage, defaultItem);
      } while (!this.isNum(checkItem));
      return +checkItem;
  } else {
      do {
          checkItem = prompt(promptMessage, defaultItem);
      } while (this.isNum(checkItem));
      return checkItem;
  }
};

AppData.prototype.eventsListeners = function(){
  //console.log(this);
  start.addEventListener('click', this.start.bind(this));

  btnIncomePlus.addEventListener('click', this.addBlock);
  btnExpensesPlus.addEventListener('click', this.addBlock);
  
  periodSelect.addEventListener('change', (function(){
    this.getPeriod();
    incomePeriodValue.value = this.calcPeriod();
  }).bind(this));

  depositCheck.addEventListener('change', (function () {
      if (depositCheck.checked){
        depositBank.style.display = 'inline-block';
        depositAmount.style.display = 'inline-block';
        this.deposit = true;
        depositBank.addEventListener('change', function () {
          let selectindex = this.options[this.selectedIndex].value;
          if (selectindex === 'other'){
            depositPercent.style.display = 'inline-block';
            depositPercent.disabled = false;
            depositPercent.value = '';
          }else{
            depositPercent.style.display = 'none';
            depositPercent.value = selectindex;
          }
      });
      }else{
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.value = '';
        depositPercent.style.display = 'none';
        depositAmount.value = '';
        this.deposit = false;
      }
  }).bind(this));
  cancel.addEventListener('click', this.reset.bind(this));
};

const newData = new AppData(); 
newData.eventsListeners();

console.log('newData', newData);
