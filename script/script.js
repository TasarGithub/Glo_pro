// Lesson 05

'use strict';
const income = '40000', //Доп доход, фриланс
    mission = 1500000, // Какую сумму хочу накопить
    period = 12; //Период

// после комментария Максима изменил на (money <=0), но тогда не учитывает вариант NaN, поэтому вернул назад, 
let money = +prompt('Ваш месячный доход?',80000);
let start = function(){
    while  (!(money > 0)) {
    //alert("Введите числовое значение, больше нуля");
    money = +prompt('Ваш месячный доход?',80000);
    } 
}
start()

let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm ('Есть ли у вас депозит в банке?'),
    budgetDay = money/30; //Дневной бюджет

    let showTypeof = function(data){
    console.log(data, typeof(data));
}

showTypeof (money);
showTypeof (income);
showTypeof (deposit);


let Expenses1,
    Expenses2;
    

let getExpensesMonth = function(){
    
    let ExpensesAmount,
        sum = 0;
    
    for (let i = 0; i < 2; i++){
                
        if (i == 0) Expenses1 = prompt('Введите обязательную статью расходов.', 'Транспорт');
        if (i == 1) Expenses2 = prompt('Введите обязательную статью расходов.', 'Кредит');

        // ExpensesAmount = +prompt('Во сколько это обойдется? ', 7000);
        // //Проверка корректности ввода расхода
        // while  (!(ExpensesAmount > 0)) {
        //     ExpensesAmount = +prompt('Во сколько это обойдется? ', 7000);
        // }
        
        //Проверка корректности ввода расхода
        do {
            ExpensesAmount = +prompt('Во сколько это обойдется? ', 7000);
        } while  (!(ExpensesAmount > 0));
        
        sum+=ExpensesAmount;
    }
    return sum;
}


function getAccumulatedMonth(money_par,income_par,getExpensesMonth_par){
    return  +money_par + (+income_par) - getExpensesMonth_par;
}

let accumulatedMonth = getAccumulatedMonth(money,income,getExpensesMonth ());
console.log('Накопления за период: ', accumulatedMonth);

// budgetMonth = accumulatedMonth, поэтому заккоментировал.

// let budgetMonth = (+money) + (+income) - ExpensesMonth;
// console.log('budgetMonth = (+money) + (+income) - ExpensesMonth;: ', budgetMonth);

// Поправить budgetDay учитывая бюджет на месяц, а не месячный доход. 
budgetDay = Math.floor(accumulatedMonth / 30);

let getStatusIncome = function(){
    if (budgetDay < 0){
        return ('Что-то пошло не так');
    } else if (budgetDay <= 300){
        return ('Низкий уровень дохода');
    } else if (budgetDay <= 800){
        return ('Средний уровень дохода');
    } else {
        return ('Высокий уровень дохода');
    }
}
console.log(getStatusIncome());



function getTargetMonth(mission_par,accumulatedMonth_par){
    return Math.floor(mission_par/accumulatedMonth_par);
}
if (getTargetMonth (mission,accumulatedMonth) > 0){
    console.log('Cрок достижения цели в месяцах', getTargetMonth (mission,accumulatedMonth));
} else {
    console.log('Цель не будет достигнута, расходы выше доходов');
}  