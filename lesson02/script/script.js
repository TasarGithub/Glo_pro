let money = 40000; // ����� �� �����
let income = "40000"; //��� �����, �������
let addExpenses = "������,������,��������"; // ��� ������� 
let deposit = true; // ������� ��������
let mission = 1500000; // ����� ����� ���� ��������
let period = 12; //������
let budgetDay = money/30; //������� ������

console.log( typeof(money) );
console.log( typeof(income) );
console.log( typeof(deposit) );
// ������ 
console.log( "������ " + period + " �������. " + 
"���� ���������� "+ mission +" ������" );
addExpenses = addExpenses.toLowerCase();

console.log( budgetDay);
console.log( money % 30 );