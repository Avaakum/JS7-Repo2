//мобильные события
//мобильные события
//touchstart - событие при касании к элементу
//touchmove - при касании и перемещении в другую точку
//touchend - после конци соприкасания пальца с мобильной поверхностью
//touchener - при движении пальца по экрану, и наведении на какой-то объект
//touchleave - когда при движении пальца по экарану - уходим с элемента
//touchcancel  - когда наш палец уже не регистрируется в пределах браузера, например
//когда браузер свернут на половину и мы нажимаем где-то вне

window.addEventListener('DOMContentLoaded', function () {
  let box = document.querySelector('.box');

  box.addEventListener('touchstart', function (e) {
    e.preventDefault();
    console.log("red box: touchstart");
    console.log(e.target); 
    console.log(e.touches[0].target);  //получаем цель события( 0 - первый палец)

    console.log(e.touches); // - получает все пальцы, кот прикоснулись к сенсору
    //у нас в браузере это только мышка, поэтому длина равна 1
    //если бы был мультитач на телефоне, то длинна была бы равна количеству пальцев
    console.log(e.changedTouches); //аналогичное событие
    console.log(e.targetTouches); // лиш те пальцы, которые коснулись именно определен.
    //объекта
  });

  box.addEventListener('touchmove', function (e) {
    e.preventDefault();
    console.log("red box: " + e.touches[0].pageX); //выдает координату X
  });

  box.addEventListener('touchend', function (e) {
    e.preventDefault();
    console.log("red box: touchend");
  });



  //Регулярные выражения

  //Служат для удобства работы со строками(удалять, заменять части слов, искать
  //ограничивать ввод опеределенных знаков итд)

  //Состоят всегд из 2х частей: паттерн и флаги

  //первый вариант записи - как конструктор
  new RegExp('pattern', 'flags');

  //второй вариант написани
  // /pattern/flags

  let ans = prompt('Введите ваше имя', '');

  let reg = /n/gi; //создаем регулярное выражение, которое содержит маленькую n

  console.log(ans.search(reg)); //проводим поиск по нашей строке
  //и он выдает позцию на которой находит n. если нет то "-1", если есть то с нулевой и вперед
  //метод search - ищет только первое вхождение, и флаг g не поможет
  console.log(ans.match(reg));//ищет по совпадениям и выдает массив с совпадениями. Часто используется
  console.log(reg.test(ans));//метод теситрованя регулярные выражений, если на находит 
  //совпадение, то true. Редко исп.

  // флаги
  //i - этот флаг регистра, кот. говорит, что мы хотим найти что-то вне зависимости от регистра
  //g - глобально, т.е. не только первое вхождение, а вообще все
  //m - флаг многострочности


  
  let pass = prompt('Введите пароль');

  console.log(pass.replace(/./g, "*")); //заменяем все символы( . - это все) на *
  alert('12-34-56'.replace(/-/g, ':')); //заменяем все дефисы на :


  // \d - искать все цифры \D - инвертированные классы. Если мы ищем "не цифру" 
  // \w - искать буквы(слова) \W - не букву
  // \s - искать пробелы \S - не пробел


  let ans = prompt('Введите число', '');
  let reg = /\d/g;
  console.log(ans.match(reg)); //ищем цифры

  let str = 'My name is/ R2D2';

  console.log(str.match(/\w\d\w\d/i));
  console.log(str.match(/\//i));  //если нам нужно например найти слэш, то нужно ставить
  //еще один экранирующий слэш, чтобы все не превратилось в комменарий

  console.log(str.match(/ /g)); //ищем пробелы
  //всё что захочешь...


});