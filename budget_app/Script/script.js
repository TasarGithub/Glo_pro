'use strict';
// lesson07 - 2

// Получить кнопку "Рассчитать" через id
const btnCalc = document.querySelector('#start');

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



