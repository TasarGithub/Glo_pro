'use strict';
function one(){
  console.log('one');
  two();
}
function two(){
  console.log('two');
  three();
}
function three(){
  console.log('three');
}
one();


function test(){
  console.log('hello', this);
}

test();

let obj = {
x: 10,
y: 20,
test: newTest
};

function newTest(){
  console.log('hello', this);

}
obj.test;

newTest();