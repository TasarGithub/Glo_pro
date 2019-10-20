let num="266219";
let amount;

//Массив цифр числа 266219
symbolArray=num.split("");

//Упрощенный неуниверсальный способ.
// console.log( symbolArray );
// amount=symbolArray[0]*symbolArray[1]*
// symbolArray[2]*symbolArray[3]*
// symbolArray[4]*symbolArray[5];
// console.log( amount );
// DataView,cx/v,xc./v, /zcxV<>/c.xv,c./v,xcbmvm

//Универсальный способ подсчета произведения чисел
let lenghtNum = num.length;
let i=0;
amount =1;
console.log( amount );
for (; i<=lenghtNum-1; i++ ) {
    amount=amount*symbolArray[i];
    // console.log( symbolArray[i] );
    // console.log( i );
    console.log( amount );
}
// возведение в степень
amount=amount**3;
console.log( amount );
let amountString=String(amount);
console.log( amountString.substr(0,2) );