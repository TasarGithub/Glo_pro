// 2 lesson
'use strict';
let money = 40000; // Доход за месяц
const income = '40000'; //Доп доход, фриланс
let   addExpenses = 'Кредит,Ремонт,Обучение'; // Доп расходы 
let deposit = true; // Наличие депозита
const mission = 1500000; // Какую сумму хочу накопить
const period = 12; //Период
const budgetDay = money/30; //Дневной бюджет
let mandatoryExpensesList1 = '1'; // Обязательные расходы список вариант1
let mandatoryExpensesList2 = '2'; // Обязательные расходы список вариант2
let mandatoryExpenses1 = 1; // Обязательные расходы вариант1
let mandatoryExpenses2 = 2; // Обязательные расходы вариант2
let budgetMonth1 = 1; //Доход за месяц, учитывая обязательные расходы вариант1
let budgetMonth2 = 2; //Доход за месяц, учитывая обязательные расходы вариант2


// console.log('typeof(money): '+ typeof(money));
// console.log('income.length: '+ income.length);
// console.log('typeof(deposit): '+ typeof(deposit));
// console.log('Период ' + period + ' месяцев. ' +
// 'Цель заработать '+ mission +' рублей');
// console.log('addExpenses as array: ' + addExpenses.toLowerCase().split(','));
// console.log('budgetDay: ' + budgetDay);
// console.log('money % 30: ' + money % 30);

// 1) Спрашиваем у пользователя “Ваш месячный доход?” и результат сохраняем в переменную money
money = prompt('Ваш месячный доход?');
if  !isNaN(parseFloat(money)) && isFinite(money) console.log('money: '+ money){

}
else {
    alert( "Введено нечисловое значение, выполнение скрипта прекращено")
}

// 2) Спросить у пользователя “Перечислите возможные расходы за рассчитываемый период через запятую” сохранить в переменную addExpenses, вывести в консоль в виде массива 
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log('Возможные расходы за рассчитываемый период: ' + addExpenses.split(','));
// 3) Спросить у пользователя “Есть ли у вас депозит в банке?” и сохранить данные в переменной deposit (булевое значение true/false)
deposit = prompt('Есть ли у вас депозит в банке?');
// 4) Вывести в консоль типы данных money, income, deposit
console.log('typeof(money): '+ typeof(money));
console.log('typeof(income): '+ typeof(income));
console.log('typeof(deposit): '+ typeof(deposit));
// 5) Спросить у пользователя по 2 раза каждый вопрос и записать ответы в переменные  
// “Какие обязательные ежемесячные расходы у вас есть?” 
// “Во сколько это обойдется?”  
// в итоге 4 вопроса и 4 переменных
let mandatoryExpensesList1 = prompt('Перечислите обязательные ежемесячные расходы через запятую. Вариант1');
let mandatoryExpenses1=  prompt('Во сколько это обойдется? Вариант1');
let mandatoryExpensesList2 = prompt('Перечислите обязательные ежемесячные расходы через запятую. Вариант2');
let mandatoryExpenses2 = prompt('Во сколько это обойдется? Вариант2');
// 6) Вычислить доход за месяц, учитывая обязательные расходы, сохранить в переменную budgetMonth и вывести результат в консоль
budgetMonth = money + income - mandatoryExpenses1 - mandatoryExpenses2;
console.log('budgetMonth: ' + budgetMonth);
// 7) Зная budgetMonth, посчитать за сколько месяцев будет достигнута цель mission, вывести в консоль, округляя в большую сторону
console.log('За сколько месяцев будет достигнута цель mission, округлённая в большую сторону' + Math.ceil(mission / budgetMonth);
// 8) Поправить budgetDay учитывая бюджет на месяц, а не месячный доход. Вывести в консоль  округлив в меньшую сторону (методы объекта Math в помощь)
budgetDay = Math.floor(budgetMonth / 30);
console.log('budgetDay, учитывающий бюджет на месяц, а не месячный доход: ' + budgetDay);

// 9) Написать конструкцию условий		
// Если budgetDay больше 800, то “Высокий уровень дохода”
// Если budgetDay больше 300 и меньше 800, то сообщение “Средний уровень дохода”
// Если budgetDay больше 0 и меньше 300 то в консоль вывести сообщение “Низкий уровень дохода”
// Если отрицательное значение то вывести “Что то пошло не так”
// учесть варианты 0, 300 и 800

if (budgetDay > 800) {
    console.log('Высокий уровень дохода');
} else if (budgetDay > 300 && budgetDay < 800) {
    console.log('Средний уровень дохода');
} else if (budgetDay > 0 && budgetDay < 300) {
console.log('Низкий уровень дохода');
} else if (budgetDay < 0) {
     console.log('Что то пошло не так');
} else {
        switch (budgetDay){
        case 0:
                console.log('Нет дохода');
                break;
        case 300:
                console.log('Еще чуть-чуть и будет средний уровень дохода');
                break;
        case 800:
                console.log('Еще чуть-чуть и будет высокий уровень дохода');
                break;
        default: console.log('НЛО прилетело и карачун');
        }
    }

// 10) Проверить, чтобы все работало без ошибок в консоли





// 11) Добавить папку с третьим уроком в свой репозиторий на GitHub

