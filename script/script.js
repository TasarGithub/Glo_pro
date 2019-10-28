// Lesson 06
'use strict';
// Функция определения числа
const isNum = function(n){
    return (!isNaN(parseFloat(n)) && isFinite(n));
}

let money, 
    start = function(){
    do {
        money = prompt('Ваш месячный доход?',80000);    
    } while (!isNum(money));
}

start();

let  appData = {
    income: {},
    addIncome: [],
    expenses: {
        submarine: 1000
    },
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 1500000,
    period: 12,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    asking: function(){

    if (confirm('Есть  доп заработок')) {
        let itemIncome = prompt ('Какой у вас дополнительный заработок?', 'Консультации');
        let cashIncome = prompt ('Сколько в месяц вы на этом зарабатывете?', 10000);
        appData.income[itemIncome] = cashIncome;
    }

    let expensesAmount, expensesName,
        addExpenses = prompt('Перечислите возможные расходы '+
    'за рассчитываемый период через запятую');
    appData.addExpenses = addExpenses.toLowerCase().split(',');
    appData.deposit = confirm ('Есть ли у вас депозит в банке?');
    appData.getInfoDeposit ();

    for (let i = 0; i < 2; i++){
            if (i === 0) expensesName = prompt('Введите обязательную статью расходов.', 'Наркотики');
            if (i === 1) expensesName = prompt('Введите обязательную статью расходов.', 'Оружие');
            do {
                    expensesAmount = prompt('Во сколько это обойдется? ', 7000);
            } while (!isNum(expensesAmount));
            appData.expenses[expensesName] = +expensesAmount;
        }
    },
    getExpensesMonth: function(){
        for (let key in appData.expenses){
            appData.expensesMonth += appData.expenses[key];
        }
    },
    getBudget: function (){
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function(){
        return Math.ceil(appData.mission / appData.budgetMonth);
    },
    getStatusIncome: function(){
        if (appData.budgetDay <= 0){
            return ('Что-то пошло не так');
        } else if (appData.budgetDay <= 300){
            return ('Низкий уровень дохода');
        } else if (appData.budgetDay <= 800){
            return ('Средний уровень дохода');
        } else {
            return ('Высокий уровень дохода');
        }
    },
    getInfoDeposit: function(){
        if (appData.deposit) {
            appData.percentDeposit = prompt ('Какой годовой процент?', '10'),
            appData.moneyDeposit = prompt ('Какая сумма на депозите?', 10000);
        }        
    },
    calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
    }
}

appData.asking();
appData.getExpensesMonth();
console.log('Расходы за месяц: ', appData.expensesMonth);
// — За какой период будет достигнута цель (в месяцах)
appData.getBudget();
console.log('За какой период будет достигнута цель (в месяцах): ',
    appData.getTargetMonth());
// — Уровень дохода
console.log('Уровень дохода: ', appData.getStatusIncome());

//10) Используя цикл for in для объекта (appData), вывести в консоль сообщение
//    "Наша программа включает в себя данные: " (вывести весь appData)
console.log('Наша программа включает в себя данные:');
for (let key in appData){
    console.log(key, appData[key]);
}

console.log('calcSavedMoney: ', appData.calcSavedMoney());
console.log('appData.percentDeposit: ', appData.percentDeposit);
console.log('appData.moneyDeposit: ', appData.moneyDeposit);