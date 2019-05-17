//Конструкторы и классы. Контекст вызова. (this)

function User(name, id) { //ф-я - это объект, в кот мог. быть и методы и св-ва
  this.name = name;
  this.id = id;
  this.human = true;  //мы создали типа "конструктор" пользователя
  this.hello = function () {
    console.log('Hello ' + this.name); // при помощи this обращаемся к св-ву
    //в этом объекте
  }; //создали функцию, и после создания объектов можно будет использовать
  //эту ф-ю при обращении к ней
}
//создаем прототип для User, который будеи наследоваться самим User
User.prototype.exit = function () {
  console.log('Пользователь ' + this.name + ' ушел');
};
let ivan = new User('Ivan', 25), //создание 2х объектов через конструктор
alex = new User('Alex', 20);
// //3) Конструктор (new) - this = новый созданный объект

console.log(ivan);
console.log(alex);
ivan.hello(); // запускаем ф-ю, созданню в объектах
alex.hello(); 
ivan.exit();

// ТОже самое, что будет дальше, только в новом стандарте современный стандарт ES6
class User {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.human = true;
    // this.hello = function () {
    //   console.log('Hello ' + this.name);
    // };
  }
  hello() {
    console.log(`Hello! ${this.name}`);
  }
  exit() {
    console.log(`Пользователь ${this.name} ушел`);
  }
}
let ivan = new User('Ivan', 25);
let alex = new User('Alex', 20);
console.log(ivan);
console.log(alex);
ivan.hello();
alex.hello();
ivan.exit();



//ИТОГ части: Конструкторы нужны для создания новых однотипных объектов
//товары, пользователи, ролики... всякая шаблонизация
//мы писали ES5, улучшим до современного стандарта



//Контекст вызова и как его правльно использовать
//this - то, что окружает ф-ю, в каких условиях она вызывается
//Функция может вызываться 4мя способами, в каждом контекст вызова 
//будет отличасться

'use strict'; //в новом стандарте, ф-ии без контекста вызова this - будет
//просто undefined 
function showThis(a, b) {
  console.log(this); //т.к. ф-я не имеет объекта, то контекст ее вызова
  // будет само окно(СТАРЫЙ СТАНДАРТ)
  function sum() {
    console.log(this); //ф-я внутри функции также будет иметь контекст вызова
    //окно(СТАРЫЙ СТАНДАРТ)
    // return this.a + this.b; //поэтому a и b она не находит
    return a + b; //ф-я сначала ищет параметры внутри себя, когда ненаходит
    //ищет снаружи - это понятие замыкания функций
  }
  console.log(sum()); 
}
showThis(4, 5); 
showThis(5, 7);
//1) Просто вызов функции - window/undefined, в зависимости от старый/новый стандарт

let obj = {
  a: 20,
  b: 32,
  sum: function () {
    console.log(this);
    function shout() {
      console.log(this);
    }
    shout();
  }
};
obj.sum(); 
// 2) Метод объекта - this = объект



// Ручное присваивание this любой функции. Насильное устанавливание контекста
//вызова
let user = {
  name: "John"
};
function sayName(surname) {
  console.log(this);
  console.log(this.name + ' ' + surname);
}
//нам нужно насильно связать данные с этой ф-ей
console.log(sayName.call(user, 'Smith')); //ф-я вызывает объект
console.log(sayName.apply(user, ['Snow'])); //похожий метод, но если нам нужны
//дополнительные данные, apply может передать массив с любыми данными, а call
//только строку
function count(number) { //ф-я удваивания, для метода bind
  return this * number; //контекст вызова помнож на намбер, который мы передаем
}
let double = count.bind(3);
console.log(double(3));
console.log(double(20));
console.log(double(22324));
// 4) Указание конкретного контекста - call, apply, bind


//Как контекст вызова работает в DOM (на нашей странице)
let btn = document.querySelector('button');

btn.addEventListener('click', function () {
  console.log(this);
  this.style.backgroundColor = 'red';
  function showThis() {
    console.log(this);
  }
  showThis();
});
//в обраб. соб. мы используем контекст вызова и используем станд. выз ф-ии,
// то мы получаем сам объект обрабочика. Похоже на event.target, но важно,
//что контекст вызова ф-ии внутри ф-ии - это наше ОКНО!










