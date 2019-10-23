// Lesson 04

'use strict';
let money = 40000; // Доход за месяц
const income = '40000'; //Доп доход, фриланс
let addExpenses = 'Кредит,Ремонт,Обучение'; // Доп расходы 
let deposit = true; // Наличие депозита
const mission = 1500000; // Какую сумму хочу накопить
const period = 12; //Период
let budgetDay = money/30; //Дневной бюджет

// 1) Спрашиваем у пользователя “Ваш месячный доход?” и результат сохраняем в переменную money

//Несколько вариантов проверки на кооректность ввода исключил
// 1. Promt возвращает строку - это не оптимально
// money = prompt('Ваш месячный доход?'));
// while  (!(!isNaN(money) && isFinite(money))) 
//2. Фильтруются варианты ввода букв и бесконечных величин , но не учитываются варианты отрицательных чисел
// money = parseInt(prompt('Ваш месячный доход?'));
// while  (!(!isNaN(money) && isFinite(money))) 
//3. Если приходит нечисло, parseInt всегда вернет NaN, который в money > 0 даст false в любом случае, 
// поэтмоу решил оставиь только проверку на  money > 0

money = parseInt(prompt('Ваш месячный доход?'));

console.log('(money <= 0): ', (money <= 0));
while  (!(money > 0)) {
   alert("Введите числовое значение, больше нуля");
   money = parseInt(prompt('Ваш месячный доход?'));
   console.log('typeof(money): '+ typeof(money));
} 

console.log('typeof(money): '+ money);
console.log('money: '+ money);

// 2) Спросить у пользователя “Перечислите возможные расходы за рассчитываемый период через запятую” сохранить в переменную addExpenses, вывести в консоль в виде массива 
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log('Возможные расходы за рассчитываемый период: ' + addExpenses.split(','));

// 3) Спросить у пользователя “Есть ли у вас депозит в банке?” и сохранить данные в переменной deposit (булевое значение true/false)
deposit = confirm ('Есть ли у вас депозит в банке?');

// 4) Вывести в консоль типы данных money, income, deposit
let showTypeof = function(data){
    console.log(data, typeof(getStatusIncome));
}

showTypeof (money);
showTypeof (icome);
showTypeof (deposit);

// 5) Спросить у пользователя по 2 раза каждый вопрос и записать ответы в переменные  
// “Какие обязательные ежемесячные расходы у вас есть?” 
// “Во сколько это обойдется?”  1
// в итоге 4 вопроса и 4 переменных

let mandatoryExpensesList1 = prompt('Обязательный ежемесячный расход. Вариант1');
let mandatoryExpenses1=  parseInt (prompt('Во сколько это обойдется? Вариант1'));

//Проверка корректности ввода расходов
while  (!(mandatoryExpenses1 > 0)) {
    alert("Введит числовое значение, больше нуля");
    mandatoryExpenses1 = parseInt(prompt('Обязательные ежемесячные расходы, сумма. Введите числом'));
    console.log('mandatoryExpenses1: ' + mandatoryExpenses1);
} 

console.log('mandatoryExpenses1: ' + mandatoryExpenses1);

let mandatoryExpensesList2 = prompt('Обязательный ежемесячный расход. Вариант2');
let mandatoryExpenses2 = prompt('Во сколько это обойдется? Вариант2');

//Проверка корректности ввода расходов
while  (!(mandatoryExpenses2 > 0)) {
    alert("Введит числовое значение, больше нуля");
    mandatoryExpenses2 = parseInt(prompt('Обязательные ежемесячные расходы, сумма. Введите числом'));
    console.log('mandatoryExpenses1: ' + mandatoryExpenses2);
} 

console.log('mandatoryExpenses2: ' + mandatoryExpenses2);

// 6) Вычислить доход за месяц, учитывая обязательные расходы, сохранить в переменную budgetMonth и вывести результат в консоль
let budgetMonth = (+money) + (+income) - mandatoryExpenses1 - mandatoryExpenses2;
console.log('budgetMonth: ' + budgetMonth);
// 7) Зная budgetMonth, посчитать за сколько месяцев будет достигнута цель mission, вывести в консоль, округляя в большую сторону
console.log('За сколько месяцев будет достигнута цель ' + mission + ', округлённая в большую сторону ' + Math.ceil(mission / budgetMonth));
// 8) Поправить budgetDay учитывая бюджет на месяц, а не месячный доход. Вывести в консоль  округлив в меньшую сторону (методы объекта Math в помощь)
budgetDay = Math.floor(budgetMonth / 30);
console.log('budgetDay, учитывающий бюджет на месяц, а не месячный доход: ' + budgetDay);

// 9) Написать конструкцию условий		
// Если budgetDay больше 800, то “Высокий уровень дохода”
// Если budgetDay больше 300 и меньше 800, то сообщение “Средний уровень дохода”
// Если budgetDay больше 0 и меньше 300 то в консоль вывести сообщение “Низкий уровень дохода”
// Если отрицательное значение то вывести “Что то пошло не так”
// учесть варианты 0, 300 и 800
let getStatusIncome = function (){
    if (budgetDay <= 300) {
        return ('Низкий уровень дохода');
    } else if (budgetDay <= 800) {
        return ('Средний уровень дохода');
    } else {
        return ('Высокий уровень дохода');
    } 
}

console.log(getStatusIncome());


function getExpensesMonth(mandatoryExpenses1_par, mandatoryExpenses2_par){
    return mandatoryExpenses1_par + mandatoryExpenses2_par;
    }
console.log('getExpensesMonth: ', getExpensesMonth(mandatoryExpenses1, mandatoryExpenses2));

function getAccumulatedMonth (money_par,income_par,getExpensesMonth_par){
    return  money_par + income_par - getExpensesMonth_par;
}
let accumulatedMonth = getAccumulatedMonth(money,income);
console.log('accumulatedMonth: ', accumulatedMonth);

function getTargetMonth (mission_par,accumulatedMonth_par){
    return Math.floor(mission_par/accumulatedMonth_par);
}
console.log('getTargetMonth (mission_par,accumulatedMonth_par): ', getTargetMonth (mission,accumulatedMonth));

