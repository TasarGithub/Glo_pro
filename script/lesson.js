'use strict';
//lesson10 примеры из урока

function Car(countryBuild, options) {
  this.countryBuild =  countryBuild;
  options = options || {};
  this.color = options.color;
  this.transmisson = options.transmission;
  }

Car.prototype.ride = function() {
  console.log (this.brand + '  ' + this.model + ' поехала! ')
};

function Audi (countryBuild, otptions, model, type) {
  this.brand = 'Audi';
  Car.apply(this, arguments);
  this.model = model;
  this.type = type;
}

Audi.prototype = Object.create(Car.prototype);
Audi.prototype.constructor = Audi;
let car_q7 = new Audi ('Germany', {color:'red'}, 'q7', 's');

console.log (car_q7);
console.log (car_q7 instanceof Audi);
console.log (car_q7 instanceof Car);

car_q7.ride();

console.log(new Object());
console.log(car_q7 instanceof Object);