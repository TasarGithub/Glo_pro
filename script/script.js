// Lesson 04

'use strict';
const income = 'фриланс, перевозки', //Доп доход, фриланс
    mission = 1500000, // Какую сумму хочу накопить
    period = 12; //Период

// Функция определения числа
const isNum = function(n){
    return (!isNaN(parseFloat(n)) && isFinite(n));
}

let money = prompt('Ваш месячный доход?', 80000);
console.log((isNum(money)));
while (!isNum(money)){
   money = prompt('Ваш месячный доход?', 80000);
} 
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm ('Есть ли у вас депозит в банке?'),
    budgetDay = money / 30; //Дневной бюджет

    let showTypeof = function(data){
    console.log(data, typeof(data));
}

showTypeof (money);
showTypeof (income);
showTypeof (deposit);

let expenses1 = prompt('Обязательный ежемесячный расход. Вариант1'),
    expensesAmount1 = prompt('Во сколько это обойдется? Вариант1', 5000);

//Проверка корректности ввода расходов
while  (!isNum(expensesAmount1)) {
    expensesAmount1 = prompt('Во сколько это обойдется? Вариант1', 5000);
} 

let expenses2 = prompt('Обязательный ежемесячный расход. Вариант2'),
    expensesAmount2 = prompt('Во сколько это обойдется? Вариант2', 7000);

//Проверка корректности ввода расходов
while  (!isNum(expensesAmount2)) {
    expensesAmount2 = prompt('Во сколько это обойдется? Вариант2', 7000);
} 

//  Вычислить доход за месяц, учитывая обязательные расходы, 
function getExpensesMonth(exp1,exp2){
    return +exp1 + (+exp2);
}

function getAccumulatedMonth(money_par,getExpensesMonth_par){
    return  money_par - getExpensesMonth_par;
}
let accumulatedMonth = getAccumulatedMonth(money,getExpensesMonth(expensesAmount1, expensesAmount2));
console.log('Накопления за период: ', accumulatedMonth);

//let budgetMonth = money - expensesAmount1 - expensesAmount2; 
//accumulatedMonth заменил budgetMonth

// Поправить budgetDay учитывая бюджет на месяц, а не месячный доход. 
budgetDay = Math.floor(accumulatedMonth / 30);

let getStatusIncome = function(){
    if (budgetDay <= 300) {
        return ('Низкий уровень дохода');
    } else if (budgetDay <= 800) {
        return ('Средний уровень дохода');
    } else {
        return ('Высокий уровень дохода');
    } 
}
console.log('getStatusIncome():', getStatusIncome());

function getTargetMonth(mission_par,accumulatedMonth_par){
    return Math.floor(mission_par / accumulatedMonth_par);
}
console.log('Cрок достижения цели в месяцах', getTargetMonth (mission,accumulatedMonth));