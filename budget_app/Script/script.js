'use strict';
// lesson10


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
  this.incomeMonth= 0;
  this.addIncome= [];
  this.expenses= {};
  this.expensesMonth= 0;
  this.addExpenses= [];
  this.deposit= false;
  this.percentDeposit= 0;
  this.moneyDeposit= 0;
  this.addExpenses= [];

};


// Функция определения числа
AppData.prototype.isNum = function(n){
  return (!isNaN(parseFloat(n)) && isFinite(n));
};

AppData.prototype.start = function(){
  
    console.log('start',this);
   
    //debugger;
    salaryAmount.value=salaryAmount.value.trim();
    if (!this.isNum(salaryAmount.value) || salaryAmount.value === '') {
      alert ('Введите сумму месячного дохода');
      return;
    }
    this.budget = +salaryAmount.value;
    this.getIncome();
    this.getExpenses();
    this.getExpensesMonth();  
    this.getAddExpenses();
    this.getAddIncome();
    //debugger;
    this.getInfoDeposit();
    this.getBudget();
    this.getTargetMonth();
    
    this.showResult();
    
    this.turnStartCancel(1);
    this.blockUnBlockInput(1); 
  };


  AppData.prototype.reset = function(){
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
  // возврат кнопки +
  btnExpensesPlus.hidden = false;

// удаление  новых полей доп доходов
  incomeItems = document.querySelectorAll('.income-items');
  if (incomeItems.length > 1) {
    for (let i = (incomeItems.length - 1); i >= 1 ; i--){
      if (incomeItems[i].parentNode) {
        incomeItems[i].parentNode.removeChild(incomeItems[i]);
      }
    }
    
  }
   // возврат кнопки +
  btnIncomePlus.hidden = false;

  // Возвращаем   значения к началу
  document.querySelectorAll('input').forEach(function(item){
    item.value = '';
  });

  periodSelect.value = 1;
  periodAmount.textContent = '1';
  //debugger;
  depositCheck.checked = false;
  //обнуление массивов доп расходов и доп доходов
  this.addIncome = [];
  this.addExpenses = [];

  //меняем кнопку вновь на Рассчитать 
  this.turnStartCancel(0);
  // Разблокировка полей слева
  this.blockUnBlockInput(0);
};

AppData.prototype.turnStartCancel = function(n){
  if (n){
    start.hidden = true;
    cancel.style.display = "block";
  } else {
    start.hidden = false;
    cancel.style.display = "none";
  }
  
};

AppData.prototype.blockUnBlockInput = function(n){
  //debugger;
  // block = 1;
  // unBlock = 0;
     const divData = document.querySelector('.data');
     const arrElemBlock = divData.getElementsByTagName('*');  
     for (let i = 0; i < arrElemBlock.length; i++){
       if (arrElemBlock[i].type !== 'range'){
        //console.log('arrElemBlock[' + i + ']', arrElemBlock[i].attributes );
        //console.log('arrElemBlock[' + i + ']', arrElemBlock[i] );
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
// добавление блока расходов
AppData.prototype.addExpensesBlock = function(){
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem,btnExpensesPlus);
  expensesItems = document.querySelectorAll('.expenses-items');
  if (expensesItems.length === 3) {
    btnExpensesPlus.hidden = true;
  }
};

//получить все расходы и записать их в объект
//будем перебирать с помощью forEach все элементы с классом expenses-item
AppData.prototype.getExpenses = function(){
  const _this=this;
  expensesItems.forEach (function(item){
    //debugger;
    //console.log(_this);
    let itemExpenses = item.querySelector('.expenses-title').value,
        cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses !== '' && cashExpenses !== ''){
      _this.expenses[itemExpenses] = cashExpenses;
      
    }
  });
};

AppData.prototype.addIncomeBlock = function(){    
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem,btnIncomePlus);
  incomeItems = document.querySelectorAll('.income-items');
  if (incomeItems.length === 3) {
    btnIncomePlus.hidden = true;
  }
};

AppData.prototype.getIncome = function(){
  const _this=this;
  incomeItems.forEach (function(item){
    
    //debugger;
    let itemIncome = item.querySelector('.income-title').value,
        cashIncome = item.querySelector('.income-amount').value;
    if (itemIncome !== '' && cashIncome !== ''){
      _this.income[itemIncome] = cashIncome;
    }
    //debugger;
  });
  for (let key in _this.income){
    this.incomeMonth += +this.income[key];
  }
};
AppData.prototype.getAddExpenses = function(){
  let addExpenses = additionalExpensesItem.value.split(',');
  const _this = this;
  addExpenses.forEach(function(item){
    let itemValue = item.trim();
    if(itemValue !== ''){
      _this.addExpenses.push(itemValue);
    }
  });
};
//Названия возможных источников дохода
AppData.prototype.getAddIncome = function(){
  const _this = this;
  additionalIncomeItem.forEach(function(item){
    let itemValue = item.value.trim();
    if(itemValue !== ''){
      _this.addIncome.push(itemValue);
    }
  });
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

  btnIncomePlus.addEventListener('click', this.addIncomeBlock);
  btnExpensesPlus.addEventListener('click', this.addExpensesBlock);
  
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
        depositAmount.value = '';
        this.deposit = false;
      }
  }).bind(this));
    
  cancel.addEventListener('click', this.reset.bind(this));
  
};

const newData = new AppData(); 
newData.eventsListeners();

console.log('newData', newData);