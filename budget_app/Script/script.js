'use strict';
// lesson11.2

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

class AppData {
  constructor () {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.expenses = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
  }
  
  isNum = (n) => !isNaN(parseFloat(n)) && isFinite(n);

  start() {
  
    //debugger;
    salaryAmount.value = salaryAmount.value.trim();

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
  }

  reset(){
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
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.expenses = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
  
    depositBank.style.display = 'none';
    depositAmount.style.display = 'none';
    depositPercent.value = '';
    depositPercent.style.display = 'none';
    depositAmount.value = '';
    
    //меняем кнопку вновь на Рассчитать 
    this.turnStartCancel(0);
    // Разблокировка полей слева
    this.blockUnBlockInput(0);
  }
  
  turnStartCancel = n => {
    if (n){
      start.hidden = true;
      cancel.style.display = "block";
    } else {
      start.hidden = false;
      cancel.style.display = "none";
    }
  }
  
  blockUnBlockInput = n => {
    // block = 1;
    // unBlock = 0;
       const divData = document.querySelector('.data');
       const arrElemBlock = divData.getElementsByTagName('*');  
       for (let i = 0; i < arrElemBlock.length; i++){
         if (arrElemBlock[i].type !== 'range'){
          arrElemBlock[i].disabled = !!(n);
         }
       }
  }
  
  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth(); 
  
    periodSelect.addEventListener('change',(function(){
      this.getPeriod();
    }).bind(this));
  
    incomePeriodValue.value = this.calcPeriod();
  }
  
  // добавление блоков расходов и доходов
  addBlock() {
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
  }
  
  getInExp() {
    //debugger;
    const  count = item  => {
      const strInExp =  item.className.split('-')[0],
      itemInExp = item.querySelector(`.${strInExp}-title`).value,
      cashInExp = item.querySelector(`.${strInExp}-amount`).value;
  
      if (itemInExp !== '' && cashInExp !== '') {
        this[strInExp][itemInExp] = cashInExp;
      }
    };  
  
    expensesItems.forEach(count);
    incomeItems.forEach(count);
    //debugger;
  
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }
  
  //Названия возможных расходов и доходов 
  getAdd() {
    //debugger;
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.splice(0,0,'addExpenses');
    //const addIncomeArr = Array.prototype.map.call(additionalIncomeItem,el =>el.value );  1ый метод
    const addIncomeArr = Array.from(additionalIncomeItem, (item) => item.value); //2ой метод, лаконичнее
    addIncomeArr.splice(0,0,'addIncome');
  
    const count = (item,ind,arr) => {
      let itemValue = item.trim();
      if (ind !== 0) {
        if(itemValue !== '') {
          this[arr[0]].push(itemValue);
        }
      }
    };
    addExpenses.forEach(count);
    addIncomeArr.forEach(count);
  }
  
  getPeriod() {
    this.period = document.querySelector('.period-select').value;
    periodAmount.textContent = this.period;
  }
  
  getExpensesMonth() {
    for (const key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  }
  getBudget() {
    this.budgetMonth = Math.floor(this.budget + +this.incomeMonth -
      this.expensesMonth + (this.moneyDeposit * this.percentDeposit)/12);
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }
  
  getTargetMonth() {  
    return Math.ceil(targetAmount.value / this.budgetMonth);
  }
  
  getStatusIncome() {
    if (this.budgetDay <= 0) {
        return ('Что-то пошло не так');
    } else if (this.budgetDay <= 300) {
        return ('Низкий уровень дохода');
    } else if (this.budgetDay <= 800) {
        return ('Средний уровень дохода');
    } else {
        return ('Высокий уровень дохода');
    }
  }
  
  getInfoDeposit() {
    //debugger;
    if (this.deposit) {
      this.percentDeposit =  depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }        
  }
  
  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }
  
  eventsListeners() {
    //console.log(this);
    start.addEventListener('click', this.start.bind(this));
  
    btnIncomePlus.addEventListener('click', this.addBlock);
    btnExpensesPlus.addEventListener('click', this.addBlock);
    
    periodSelect.addEventListener('change', (function() {
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
  }
}


const newData = new AppData(); 

newData.eventsListeners();