// Lesson 05

'use strict';
const income = '40000', //Доп доход, фриланс
    mission = 1500000, // Какую сумму хочу накопить
    period = 12; //Период

// после комментария Максима изменил на (money <=0), но тогда не учитывает вариант NaN, поэтому вернул назад, 
let money = +prompt('Ваш месячный доход?');
while  (!(money > 0)) {
   alert("Введите числовое значение, больше нуля");
   money = parseInt(prompt('Ваш месячный доход?'));
} 
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm ('Есть ли у вас депозит в банке?'),
    budgetDay = money/30; //Дневной бюджет

    let showTypeof = function(data){
    console.log(data, typeof(data));
}

showTypeof (money);
showTypeof (income);
showTypeof (deposit);

let Expenses1 = prompt('Обязательный ежемесячный расход. Вариант1'),
    ExpensesAmount1=  +prompt('Во сколько это обойдется? Вариант1', 5000);

//Проверка корректности ввода расходов
while  (!(ExpensesAmount1 > 0)) {
    alert("Введит числовое значение, больше нуля");
    ExpensesAmount1 = +prompt('Обязательные ежемесячные расходы, сумма. Введите числом');
} 

let Expenses2 = prompt('Обязательный ежемесячный расход. Вариант2'),
    ExpensesAmount2 = +prompt('Во сколько это обойдется? Вариант2', 7000);

//Проверка корректности ввода расходов
while  (!(ExpensesAmount2 > 0)) {
    alert("Введит числовое значение, больше нуля");
    ExpensesAmount2 = +prompt('Обязательные ежемесячные расходы, сумма. Введите числом');
} 

//  Вычислить доход за месяц, учитывая обязательные расходы, 
let budgetMonth = (+money) + (+income) - ExpensesAmount1 - ExpensesAmount2;

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

let accumulatedMonth = getAccumulatedMonth(money,income,getExpensesMonth(ExpensesAmount1, ExpensesAmount2));
console.log('Накопления за период: ', accumulatedMonth);

function getTargetMonth(mission_par,accumulatedMonth_par){
    return Math.floor(mission_par/accumulatedMonth_par);
}
console.log('Cрок достижения цели в месяцах', getTargetMonth (mission,accumulatedMonth));