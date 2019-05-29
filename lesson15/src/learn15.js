// //Инкапсуляция
// //закрытие кода программы от внешнего воздействия
// function User(name, age) {
//   this.name = name;
//   // this.age = age;
//   //к таким данным есть доступ снаружи
//   let userAge = age;//  создали защищенную переменную в конструктора

//   this.say = function () {
//     console.log(`Имя пользователя ${this.name}, возраст: ${this.age}`);
//   };

//   this.getAge = function () {
//     return userAge;
//   }; //для получения инкапсуллированных данных объекта

//   this.setAge = function (age) {
//     if (typeof age === 'number' && age > 0 && age < 110) {
//       userAge = age;
//     } else {
//       console.log("Недопустимое значение");
      
//     }
//   }; //для измения этих данных так же пишем проверку

// } 

// let ivan = new User('Ivan', 777);
// console.log(ivan.name);
// console.log(ivan.userAge);
// //даже получить ее нельзя

// //теперь так
// console.log(ivan.getAge());

// //изменяем
// ivan.setAge(30);
// console.log(ivan.getAge());

// ivan.say();



// //Модули
// //1 Независимы и самодостаточны
// //2 Чистота глобального пространства
// //3 Повторное использование в других проектах

// //1анонимная самовызввающаяся функция
// let number = 1;

// (function () {
//   let number = 2;
//   console.log(number);

//   return console.log(number + 3);

// }()) //ф-я должна быть в скобках и после фигурной должен быть вызов в качестве двух скобок
// // - АСФ со своей собственной облостью видимости (модуль!) 
// console.log(number);

// //2использование объектного интерфейса
// let user = (function() {
//   let private = function () {
//     console.log('I am private') 
//   }//инкапсуляция

//   return {
//     sayHello: function () {
//       console.log('hello');
//     }
//   }

// }())

// console.log(user);
// console.log(user.sayHello());


// // 3 спос. созд модулей. Теперь все методы будут приватными. Мы выведем
// //только необходмсые
// let userx = (function () {
//   let private = function () {
//     console.log('I am private')
//   } //инкапсуляция

//   let sayHello = function () {
//      console.log('hello');
//   }

//   return {
//     sayHello: sayHello
//     } //насильное присваивание объекту sayHello нашего приватного метода
  
// }())

// console.log(userx);
// console.log(userx.sayHello());



//Common JS приступаем

function myModule() {
  this.hello = function () {
    return 'hello';
  };

  this.goodbye = function () {
    return 'goodbye';
  };
}

module.exports = myModule; //экспортируем модуль наш конструкто myModule
//без круглый скобок!


