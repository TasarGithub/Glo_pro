'use strict';
//lesson11.2

class CarWash {
  constructor(brand, model = noCarBaseModel()){
    this.brand = brand;
    this.model = model;
    this.washed = false;
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

}
CarWash.counter = 0;

const car1 = new CarWash('mazda', 3);
const car2 = new CarWash('BMW', 6);
const car3 = new CarWash('Mers', A200);
const car4 = new CarWash('Zaz');

car1.washReady();
car2.washReady();
car3.washReady();
car4.washReady();

console.log('CarWash.counter: ', CarWash.counter);

