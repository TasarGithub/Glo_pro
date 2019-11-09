'use strict';
//lesson10 примеры из урока
let car = {
  doors: 4,
  turbocarging: false,
  ride: function(){
    console.log('Машина едет')
  }
};

let newCar = Object.create(car);
console.log('newcar', newCar);



function Car() {
  this.model = 'Mazda';
}

let car1 =  new Car();


let carTest = {
  model: 'Mazda'
  };
  
  console.log(car1);
  console.log(testCar);