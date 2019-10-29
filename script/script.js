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

//     1) Сделать проверку при получении данных:
//    - наименование дополнительного источника заработка
//    - сумма дополнительного заработка -  ввод статьи обязательных расходов
//    - годовой процент депозита  - сумма депозита

    asking: function(){

    if (confirm('Есть  доп заработок')) {
        let itemIncome,
            cashIncome;
            itemIncome = appData.checkInput(itemIncome, 0, 'Какой у вас дополнительный заработок?', 'Консультации');
            cashIncome = appData.checkInput(cashIncome, 1, 'Сколько в месяц вы на этом зарабатывете?', 10000);

        appData.income[itemIncome] = cashIncome;
    }

    let expensesAmount, expensesName,

    // 2) Возможные расходы (addExpenses) вывести строкой в консоль каждое слово с
    // большой буквы слова разделены запятой и пробелом
        addExpenses = prompt('Перечислите возможные расходы '+
    'за рассчитываемый период через запятую', 'набали, нашриланку, втай, всибирь');
    let outStrAddexpenses = '',
        strTemp = "";
    appData.addExpenses = addExpenses.toLowerCase().split(',');
    for (let i = 0; i <  appData.addExpenses.length; i++){

        //Убираем пробелы в элементах массива слов.
        appData.addExpenses[i] = appData.addExpenses[i].trim();

        //Запомнили слово без первой букквы
        strTemp = appData.addExpenses[i].slice(1);

        //Складываем новые слова с большой буквы + пробели запятая. Если конец строки, то пробел и запятая не нужны.
        if (i == appData.addExpenses.length -1 ) { 
            strTemp = appData.addExpenses[i][0].toUpperCase() + strTemp;
         } else {
            strTemp = appData.addExpenses[i][0].toUpperCase()+ strTemp + ', ';
         }
        // Складываем конечную строку
        outStrAddexpenses += strTemp;
    }    
    console.log (outStrAddexpenses);   
    

    appData.deposit = confirm ('Есть ли у вас депозит в банке?');
    appData.getInfoDeposit ();

    for (let i = 0; i < 2; i++){
            if (i === 0) expensesName = prompt('Введите обязательную статью расходов.', 'Антиквариат');
            if (i === 1) expensesName = prompt('Введите обязательную статью расходов.', 'Коллекционное вино');

            expensesAmount = appData.checkInput(expensesName, 1, 'Во сколько это обойдется?', 7000);
            
            // do {
            //     expensesAmount = prompt('Во сколько это обойдется? ', 7000);
            // } while (!isNum(expensesAmount));            

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
            //appData.percentDeposit = prompt ('Какой годовой процент?', '10'),
            appData.percentDeposit = appData.checkInput(appData.percentDeposit, 1, 'Какой годовой процент?', 10);
            appData.moneyDeposit = appData.checkInput(appData.percentDeposit, 1, 'Какая сумма на депозите?', 10000);
        }        
    },
    calcSavedMoney: function(){
        
        console.log('appData.period: ', appData.period);
        console.log('appData.budgetMonth: ', appData.budgetMonth);

        return appData.budgetMonth * appData.period;
    },
    checkInput: function(checkItem,strOrNum,promptMessage,defaultItem){
        // strOrNum:  false - str, true - Num
        if (!!strOrNum) { 
            do {
                checkItem = prompt(promptMessage, defaultItem);
            } while (!isNum(checkItem));
        } else {
            do {
                checkItem = prompt(promptMessage, defaultItem);
            } while (isNum(checkItem));
        }
        return checkItem;
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