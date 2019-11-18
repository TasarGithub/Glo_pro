'use strict';
//lesson11.2

class CarWash {
  constructor(brand, model = noCarBaseModel(), services = []){
    this.brand = brand;
    this.model = model;
    this.washed = false;
    this.services = services;

  }
  washReady() {
    this.washed = true;
    CarWash.counter++;
    this.report();
  }
  static noCarBaseModel(){
     return 'none';
  }

  report() {
    console.log(this.brand, this.model, this.washed);
  }

  get services(){
  
  }
}
CarWash.counter = 0;

const car1 = new CarWash('mazda', 3, ['black tires', 'wax']);
const car2 = new CarWash('BMW', 6);
const car3 = new CarWash('Mers', A200);
const car4 = new CarWash('Zaz');

car1.washReady();
car2.washReady();
car3.washReady();
car4.washReady();

console.log('CarWash.counter: ', CarWash.counter);




const car = {
  model: '3',
  year: 2006
  brand: mazda
  get fullTitle(){
    return this.brand + ' ' + this.model;
  }
  set function(value) {
    this.brand = value;
  }
};

Object.defineProperty (mazda, 'fullTitle', {
  get: function() {
    return this.brand + ' ' + this.model;
  },
  set: function(val) {
    this.brand = val
  }
 })
