// Lesson 06
'use strict';
let money, 
    start = function(){
    do {
        money = prompt('Ваш месячный доход?',80000);    
    } while (!isNum(money));
}

// const income = '40000', //Доп доход, фриланс
//     appData.mission = 1500000, // Какую сумму хочу накопить
//     period = 12; //Период

// Функция определения числа
const isNum = function(n){
    return (!isNaN(parseFloat(n)) && isFinite(n));
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
    mission: 1500000,
    period: 12,
//2) В объект appData добавить свойство budget которое будет принимать значение money
    budget: money,
//3) В объект appData добавить свойства budgetDay, budgetMonth и expensesMonth, изначально равные нулю
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
//4) Функции getExpensesMonth, getAccumulatedMonth, getTargetMonth, getStatusIncome - 
//   сделать методами объекта AppData
    getExpensesMonth: function(){
        // 7) Метод getExpensesMonth будет считать сумму всех обязательных расходов и
        // сохранять результат в свойство expensesMonth  для того, чтобы посчитать 
        // сумму используйте цикл for in
        for (let key in appData.expenses){
            appData.expensesMonth += appData.expenses[key];
        }
    },
    getBudget: function (){
        // 8) getAccumulatedMonth переименовать в getBudget. Этот метод будет считать budgetMonth и
        // budgetDay (перенести эти команды в этот метод)
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth/30;
    },
    getTargetMonth: function(mission_par,accumulatedMonth_par){
        return Math.floor(mission_par / accumulatedMonth_par);
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
    // 6) Из метода  getExpensesMonth перенести цикл в метод asking,  
    // и переписать цикл таким образом чтобы результат записывался в объект  appData.expenses
    // в формате:
    
    // expenses: {
    //     “ответ на первый вопрос” : “ответ на второй вопрос”,
    //     “ответ на первый вопрос” : “ответ на второй вопрос”
    //     }
    asking: function(){
        let expensesAmount, expensesName,
            addExpenses = prompt('Перечислите возможные расходы '+
        'за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm ('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++){

            if (i === 0) expensesName = prompt('Введите обязательную статью расходов.', 'Наркотики');
            if (i === 1) expensesName = prompt('Введите обязательную статью расходов.', 'Оружие');
            do {
                    expensesAmount = prompt('Во сколько это обойдется? ', 7000);
            } while (!isNum(expensesAmount));
            appData.expenses[expensesName] = +expensesAmount;
        }
    }
}

// 9) Вызвать все необходимые методы, чтобы корректно считались все данные. В консоль вывести: 
// — Расходы за месяц
appData.asking();
appData.getExpensesMonth();
console.log('Расходы за месяц: ', appData.expensesMonth);
// — За какой период будет достигнута цель (в месяцах)
appData.getBudget();
console.log('За какой период будет достигнута цель (в месяцах): ',
    Math.ceil(appData.mission / appData.budgetMonth));
// — Уровень дохода
console.log('Уровень дохода: ', appData.getStatusIncome());

