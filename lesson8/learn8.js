//1. понятие document - наша верстка DOM
//2. window - это наше окно браузера со всеми фичами, адрес строку итд,
//если меняем размер браузера, то и меняется размер окна
//3. screen - весь наш видимый монитор(редко используется)

//страница и ее элменты имеют множество параметров, но чаще всего используются 
//4-5 из них, все изм-ся в "px", но в js пишутся без px в конце!!!
//Итак, они:

let box = document.querySelector('.box'),
    btn = document.querySelector('button');


// получаем ширину и высоту эл-а, включая padding, но без border, и всяческих прокруток(скроллов)
// let width = box.clientWidth, 
//     height = box.clientHeight;

//высота и ширина, включая всё, т.е. такие же значения, как в CSS
// let width = box.offsetWidth,
//     height = box.offsetHeight;

//размеры всеегоо элемента вместе с прокруткой, но это опять без boder и прокруток
// let width = box.scrollWidth, 
//     height = box.scrollHeight;

    // console.log(width); 
    // console.log(height);

btn.addEventListener('click', function () {
    // box.style.height = box.scrollHeight + 'px';
    // //делаем элемент с высотой всего содержимого, которое скрыто прокруткой

    console.log(box.scrollTop);
    //выводит js расстояние без px, которое нужно скроллить вверх внутри элем

    box.scrollTop = 0;
    //идем вверх до нуля(единственный изменяемый параметр через js из раз
    //меров элемента)
    console.log(box.offsetRight);
    
});


//разбираемся с CSS свойством box-sizing border box
let width = box.clientWidth,
    height = box.clientHeight;
    //по итогу, тут то просто берется значение из браузера
    //а в CSS меняется значение размера эл-а так, что-бы
    //его заданная ширина и высота включала paddingi, borderi итд 




//разбираемся с понятиями координат в JS
//в JS все считается от верха и лево
//т.е. значение left & right будут итди от левого края браузера до левого
//и правого края соответственно
//так же с top и bottom (в отличае от CSS, где всё считается так же как 
//называется)


//получаем все координаты
console.log(width);
console.log(height);
console.log(box.getBoundingClientRect()); //это метод, поэтому скобки
//обычно это 4 параметра лево, право, низ, верх. Но в некоторых браузерах
//их больше

console.log(box.getBoundingClientRect().left); //получаем значение
//ключа left объекта, который формирует данный метод


console.log(document.documentElement.clientWidth);//обязатаельно должен
//быть документэлем, тк просто документ - это список тегов
console.log(document.documentElement.clientHeight); //высота именно самого 
//внутренненго окна 
//и обе эти величены с перещетом на браузерные писели(мое замечание)
console.log(document.documentElement.scrollTop);
document.documentElement.scrollTop = 0;


//еще методы перемещения по странице

//метод скролла по координатам
scrollBy(0, 170); //может применятся сколько угодно раз
//каждый раз подскролливая дальше на значение x и y  в скобках

scrollTo(0, 189);
//перемещается именно в эти   









    
    