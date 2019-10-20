let money = 40000; // Доход за месяц
let income = "40000"; //Доп доход, фриланс
let addExpenses = "Кредит,Ремонт,Обучение"; // Доп расходы 
let deposit = true; // Наличие депозита
let mission = 1500000; // Какую сумму хочу накопить
let period = 12; //Период
let budgetDay = money/30; //Дневной бюджет

console.log( typeof(money) );
console.log( typeof(income) );
console.log( typeof(deposit) );
// методы 
console.log( "Период " + period + " месяцев. " + 
"Цель заработать "+ mission +" рублей" );
addExpenses = addExpenses.toLowerCase();

console.log( budgetDay);
console.log( money % 30 );