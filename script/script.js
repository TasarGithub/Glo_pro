// Lesson 05

'use strict';
const income = '40000', //Доп доход, фриланс
    mission = 1500000, // Какую сумму хочу накопить
    period = 12; //Период

let money; 
//1) Переписать функцию start циклом do while
let start = function(){
    do {
        money = +prompt('Ваш месячный доход?',80000);    
    } while  (money <= 0 || isNaN(money) || money == null) ;
}
start();

let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm ('Есть ли у вас депозит в банке?'),
    budgetDay = money/30; //Дневной бюджет

// в 5 уроке showTypeof не требуется для вывода, поэтому комментирую
//     let showTypeof = function(data){
//     console.log(data, typeof(data));
// }

// // в 5 уроке это не требуется для вывода, поэтому комментирую
// showTypeof (money);
// showTypeof (income);
// showTypeof (deposit);


let Expenses1,
    Expenses2;
    

let getExpensesMonth = function(){
    
    let ExpensesAmount,
        sum = 0;
    
    for (let i = 0; i < 2; i++){
                
        if (i == 0) Expenses1 = prompt('Введите обязательную статью расходов.', 'Транспорт');
        if (i == 1) Expenses2 = prompt('Введите обязательную статью расходов.', 'Кредит');
        //2) Добавить валидацию (проверку) на данные которые мы получаем на вопрос 
        //'Во сколько это обойдется?’ в функции  getExpensesMonth
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
    return Math.floor(mission_par/accumulatedMonth_par);
}
if (getTargetMonth (mission,accumulatedMonth) > 0 && 
   (getTargetMonth (mission,accumulatedMonth) != Infinity)) {
    console.log('Cрок достижения цели в месяцах', getTargetMonth (mission,accumulatedMonth));

} else if  (getTargetMonth (mission,accumulatedMonth) == Infinity) {
    console.log('Цель не будет достигнута, расходы равны доходам');

} else {
    console.log('Цель не будет достигнута, доходы ниже расходов');
}  