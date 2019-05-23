//JSON - современный стандарт передачи данных
//Асинхронные действия на странице - те, что выполняются без перезагрузки
//страницы

//JSON - JS Object Notation. Это текстовый формат обмена данными. Изначально
//появился в JS, но теперь используется и в других языках программирования
// Это всего лишь набор пар "ключ-значение" и главное правило, что все строки
//должны быть в двойных кавычках. В качестве значения моuqn быть массивы, числа, строки,
//логические значения или null 

let options = {
  width:1366,
  height: 769,
  background: 'red',
  font: {
    size: '16px',
    color: '#fff'
  }
};
console.log(JSON.stringify(options));
//встрооенный объект JS - JSON(поддержка всех брауз + IE8+).
//его специальный метод stringify. везде двойные кавычки! - строка
console.log(JSON.parse(JSON.stringify(options)));
//обратный метод, JSON объект превращает в обычный 
//уже легко читать и взаимодействовать


//AJAX. - asynchronious JS & XML. Супер удобно, без перезагрузки страницы. Асинхронные действия
//Но обязательно должен рабоать JS, и если очень плохое соединение с инет,
//то может криво отображаться. ДО 2017 года была проблема с SEO подобного
//контента. Всё, что угодно, гугл карты, фильтр поиска на сайте, отправка
//формы без перезагрузки

//Пример с реализацией конвертера валют
let inputRub = document.getElementById('rub'),
    inputUsd = document.getElementById('usd');

inputRub.addEventListener('input', () => {
  //создаем xml-http request, обычно называют просто request
  let request = new XMLHttpRequest();

  // request.open(method, url, async, login, pass);
  //это спец метод запроса. Принимает 5 арг.:
  //1 method - каким образом общается клиент с сервером(GET POST)
  //2 url - путь к серверу(локал, облако итд...)
  //3 async - асинхронность нашего запроса(true,false). По умолч - true,
  // можно насильно отключить асинсх запрос..
  //4 login - if necessary..
  //5 password - if necessary.. 
  request.open('GET', 'current.json');

  //ОБщение клиента и сервера полстью происходит с помощью http запросов. У них 
  //есть методы гет пост итд, но эти основные. Состоят из 2х частей: head(заголовок) и
  // и body(тело запроса). когда мы отправляем ajax запрос, мы можем еще задавать
  //настройки что это запрос, что содержит итд

  request.setRequestHeader('Contetnt-type', 'application/json; charset=utf-8');
  //метод настройки http запросов. указываем какой контент в нем будет - json в
  //в кодировке utf-8

  request.send(); //само тело запроса в скобках, если оно есть
  //(например отправляем форму с сайта)


  //свойства объекта
  //status - http код ответа сервера(404, 0200, 403 итд)
  //statusText - ok, not found
  //responseText / response - тот ответ, который идет от сервера, сам текст
  //readyState - текущее состояние объекта запроса (0, 1, 2, 3, 4) 0-unsent, 5-done


  //и еще события (loadStart, progress, abort, timeout, loadend) - эти редко исп
  // 2 соб. часто используемых: readystatechange - отслежавает статус готовности
  //запроса в данный момент(следит за изм readyState); load - срабатывает, когда
  //наш запрос полностью загурзился без ошибок
  request.addEventListener('readystatechange', function () {
    if (request.readyState === 4 && request.status == 200) {
      // console.log(request.statusText);
      let data = JSON.parse(request.response);

      inputUsd.value = inputRub.value / data.usd;
    } else {
      inputUsd.value = "Что-то пошло не так";
    }
  });



});


