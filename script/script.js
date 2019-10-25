// Lesson 06
'use strict';
let money, 
    start = function(){
    do {
        money = prompt('Ваш месячный доход?',80000);    
    } while (!isNum(money));
}

// const income = '40000', //Доп доход, фриланс
//     mission = 1500000, // Какую сумму хочу накопить
//     period = 12; //Период

// Функция определения числа
const isNum = function(n){
    return (!isNaN(parseFloat(n)) && isFinite(n));
}

start();

let  appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 80000,
    period: 12,
    asking: function(){
            appData.addExpenses = prompt('Перечислите возможные расходы '+
            'за рассчитываемый период через запятую'),
            appData.deposit = confirm ('Есть ли у вас депозит в банке?');
            appData.addExpenses
    }
}


    budgetDay = money / 30; //Дневной бюджет


let expenses1,
    expenses2;
    

let getExpensesMonth = function(){
    
    let expensesAmount,
        sum = 0;
    
    for (let i = 0; i < 2; i++){
                
        if (i === 0) expenses1 = prompt('Введите обязательную статью расходов.', 'Транспорт');
        if (i === 1) expenses2 = prompt('Введите обязательную статью расходов.', 'Кредит');
        //2) Добавить валидацию (проверку) на данные которые мы получаем на вопрос 
        //'Во сколько это обойдется?’ в функции  getExpensesMonth
        do {
            expensesAmount = prompt('Во сколько это обойдется? ', 7000);
        } while (!isNum(expensesAmount));
        
        sum += +expensesAmount;
    }
    return sum;
}

function getAccumulatedMonth(money_par,getExpensesMonth_par){
    return money_par - getExpensesMonth_par;
}

let accumulatedMonth = getAccumulatedMonth(money,getExpensesMonth());
console.log('Накопления за период: ', accumulatedMonth);

// Поправить budgetDay учитывая бюджет на месяц, а не месячный доход. 
budgetDay = Math.floor(accumulatedMonth / 30);

//4) Если budgetDay отрицательное значение, 
//   то вместо уровня дохода пусть выводится сообщение “Что то пошло не так”
let getStatusIncome = function(){
    if (budgetDay <= 0){
        return ('Что-то пошло не так');
    } else if (budgetDay <= 300){
        return ('Низкий уровень дохода');
    } else if (budgetDay <= 800){
        return ('Средний уровень дохода');
    } else {
        return ('Высокий уровень дохода');
    }
}
console.log('getStatusIncome() :',getStatusIncome());

//3) Если getTargetMonth возвращает нам отрицательное значение, то вместо “Цель будет достигнута” 
//необходимо выводить “Цель не будет достигнута”

function getTargetMonth(mission_par,accumulatedMonth_par){
    return Math.floor(mission_par / accumulatedMonth_par);
}

if ((getTargetMonth (mission,accumulatedMonth) > 0) && 
    (isFinite(getTargetMonth (mission,accumulatedMonth)))) {
    console.log('Cрок достижения цели в месяцах', getTargetMonth (mission,accumulatedMonth));

} else if (!isFinite(getTargetMonth (mission,accumulatedMonth))) {
    console.log('Цель не будет достигнута, расходы равны доходам');

} else {
    console.log('Цель не будет достигнута, доходы ниже расходов');
}