// Lesson 04

'use strict';
let money = 40000; // Доход за месяц
const income = '40000'; //Доп доход, фриланс
let addExpenses = 'Кредит,Ремонт,Обучение'; // Доп расходы 
let deposit = true; // Наличие депозита
const mission = 1500000; // Какую сумму хочу накопить
const period = 12; //Период
let budgetDay = money/30; //Дневной бюджет

// (money <=0) не учитывает вариант NaN, поэтому вернул назад, после комментария Максима
money = parseInt(prompt('Ваш месячный доход?'));
while  (!(money > 0)) {
   alert("Введите числовое значение, больше нуля");
   money = parseInt(prompt('Ваш месячный доход?'));
} 

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

deposit = confirm ('Есть ли у вас депозит в банке?');

let showTypeof = function(data){
    console.log(data, typeof(data));
}

showTypeof (money);
showTypeof (income);
showTypeof (deposit);

let ExpensesList1 = prompt('Обязательный ежемесячный расход. Вариант1');
let Expenses1=  +prompt('Во сколько это обойдется? Вариант1');

//Проверка корректности ввода расходов
while  (!(Expenses1 > 0)) {
    alert("Введит числовое значение, больше нуля");
    Expenses1 = parseInt(prompt('Обязательные ежемесячные расходы, сумма. Введите числом'));
} 


let ExpensesList2 = prompt('Обязательный ежемесячный расход. Вариант2');
let Expenses2 = +prompt('Во сколько это обойдется? Вариант2');

//Проверка корректности ввода расходов
while  (!(Expenses2 > 0)) {
    alert("Введит числовое значение, больше нуля");
    Expenses2 = parseInt(prompt('Обязательные ежемесячные расходы, сумма. Введите числом'));
} 

//  Вычислить доход за месяц, учитывая обязательные расходы, 
let budgetMonth = (+money) + (+income) - Expenses1 - Expenses2;

// Поправить budgetDay учитывая бюджет на месяц, а не месячный доход. 
budgetDay = Math.floor(budgetMonth / 30);

let getStatusIncome = function(){
    if (budgetDay <= 300) {
        return ('Низкий уровень дохода');
    } else if (budgetDay <= 800) {
        return ('Средний уровень дохода');
    } else {
        return ('Высокий уровень дохода');
    } 
}
console.log(getStatusIncome());

function getExpensesMonth(exp1,exp2){
    return +exp1 + (+exp2);
    }

function getAccumulatedMonth(money_par,income_par,getExpensesMonth_par){
    return  +money_par + (+income_par) - getExpensesMonth_par;
}

let accumulatedMonth = getAccumulatedMonth(money,income,getExpensesMonth(Expenses1, Expenses2));
console.log('Накопления за период: ', accumulatedMonth);

function getTargetMonth(mission_par,accumulatedMonth_par){
    return Math.floor(mission_par/accumulatedMonth_par);
}
console.log('Cрок достижения цели в месяцах', getTargetMonth (mission,accumulatedMonth));