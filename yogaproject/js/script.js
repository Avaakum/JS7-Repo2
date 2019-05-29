// window.addEventListener('load') //для нашего окна есть 2 события
//первое - load: оозначает выполнение скрипта только после полной загрузки 
//страницы
window.addEventListener('DOMContentLoaded', () => {
  //это событие для окна говорит о загрузку дерева тегов, т.е. загрузке
  //всей структуры DOM и после этого уже наш скрипт
  'use strict';


  //пишем табы
  //Необходимые составляющие: содержание каждого отдельного таба, кнопки перелючения табов,
  //родитель, который включает всё
  let tab = document.querySelectorAll('.info-header-tab'), //кнопки перекл
    tabContent = document.querySelectorAll('.info-tabcontent'); //содержание вкладок

  const hideTabContent = (a = 1) => {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  };
  hideTabContent();
  //вызываем с загрузки ДОМ, чтобы показать одну вкладку, и скрыть все
  //остальные

  const showTabContent = (b) => {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  };


  //пишем таймер(полный разбор)
  //Необходимые составляющие: 
  //1дедлайн(время до которого будет идти таймер) - 
  //2сколько времени осталось до дедлайна: из дедлайна вычесть время сейчас, и из этой разницы будем брать всё
  //3ф-я, которая будет изменять величины
  //4ф-я, которая будет обновлять данные на стр
  //1
  let deadline = '2019-06-28';
  //2
  const getTimeRemaining = (endtime) => {
    let t = Date.parse(endtime) - Date.parse(new Date()),
      //парсим дату на милисек
      //это и будет разници между датами(техн переменная внутри ф-ии)
      seconds = Math.floor((t / 1000) % 60), //и чтобы получить секунды до одной минуты
      //берем остаток от деления на 60
      //метод math который округляет до целого числа
      minutes = Math.floor((t / 1000 / 60) % 60), //та же хитрость для получ минут
      hours = Math.floor((t / (1000 * 60 * 60))); //получаем полное кол-во часов до дл
    // hours = Math.floor((t / 1000 / 60 / 60) % 24), //с учетом до 24 часов в сутках
    // days = Math.floor((t / 1000 / 60 / 60 / 24)); //дни
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    //вынимаем из функции объект со всеми необх данными
    return {
      'total': t, //передаем это значение для остановки таймера(в будущем), когда будет (<= 0)
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  };

  //3, 4
  const setClock = (id, endtime) => { //атрибудт id таймера в html и конец таймера
    let timer = document.getElementById(id),
      hours = timer.querySelector('.hours'),
      minutes = timer.querySelector('.minutes'),
      seconds = timer.querySelector('.seconds'),
      // timeInterval = setInterval(updateClock, 1000);
      timeInterval = setInterval(() => {

        let t = getTimeRemaining(endtime); //при запуске наш ф-ии updeteClock 
        //проверяет остаток до дедлайна
        hours.textContent = t.hours;
        minutes.textContent = t.minutes;
        seconds.textContent = t.seconds;

        if (t.total <= 0) {
          clearInterval(timeInterval);
          hours.textContent = '00';
          minutes.textContent = '00';
          seconds.textContent = '00';
        }
      }, 1000);
  };
  setClock('timer', deadline);


  //Модальное окно
  let overlay = document.querySelector('.overlay'),
    //избавились от всех лишних переменных, оставили только оверлей
    isActiveBtn; //об. проверочную переменную

  //делаем стрелочную ф-ю, будет открыв и закрыв модалку
  const bindModal = (overlayStatus, overflowStatus, classListMethod, elem) => {
    //последним аргументом делаем элемент, с которого мы будем удалять класс
    if (classListMethod == 'add') {
      isActiveBtn = elem;
    }
    if (!elem) {
      elem = isActiveBtn;
    } //во время вызова закрытия через крестик мы просто
    //не задаем 4й аргумент ф-ии, и соответственно берем с момента открытия модалки

    overlay.style.display = overlayStatus;
    // this.classList.classListMethod('more-splash'); //в таком виде работать не будет,
    // т.к. придет строка&
    elem.classList[classListMethod]('more-splash'); //c квадратными скобками
    //в объект classList придет правильное значение
    document.body.style.overflow = overflowStatus;
  };



  // Отправку формы на сервер 
  let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вам свяжемся',
    failure: "ЧТо-то пошло не так..."
  };

  let statusMessge = document.createElement('div');
  statusMessge.classList.add('status');


  const sendForm = (elem) => {

    elem.appendChild(statusMessge);

    let promise = new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();

      request.open('POST', 'server.php');
      request.setRequestHeader('Contetnt-type', 'application/json; charset=utf-8');

      let formData = new FormData(elem),
        obj = {};

      formData.forEach((value, key) => {
        obj[key] = value;
      });

      let json = JSON.stringify(obj);
      request.send(json);

      request.addEventListener('readystatechange', () => {
        if (request.readyState < 4) {
          statusMessge.innerHTML = message.loading;
        } else if (request.readyState === 4 && request.status == 200) {
          resolve(statusMessge.innerHTML = message.success);
        } else {
          reject(statusMessge.innerHTML = message.failure);
        }
      });
    });

    for (let i = 0; i < elem.length; i++) {
      elem[i].value = '';
    }

    return promise;
  };

  document.body.addEventListener('submit', e => {
    //submit - событие формы, поэтому все работает, несмотря
    // на то, что цель кнопка
    e.preventDefault();
    sendForm(e.target);
  });

  // Валидация данных ввода в инпуты
  document.body.addEventListener("input", e => {
    let target = e.target;

    if (target.getAttribute("type") === "tel") {
      target.value = "+" + target.value.replace(/[^0-9]/g, "");
      if (target.value.length == 1) {
        target.value = "";
      }
    }
    if (target.getAttribute("type") === "number") {
      target.value = target.value.replace(/[,.+e]/g, "");
      if ((target.value.length == 1) && (target.value == "0")) {
        target.value = "";
      }

    }
  });




  //Slider
  let slideIndex = 1,
    slides = document.querySelectorAll('.slider-item'),
    dots = document.querySelectorAll('.dot');

  showSlides(slideIndex);

  //принимает один аргумент для переключения слайдов
  function showSlides(n) {

    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach(item => item.style.display = 'none');
    // for (let i = 0; i < slides.length; i++) {
    //   slides[i].style.display = 'none';
    // } //тоже самое
    dots.forEach(item => item.classList.remove('dot-active'));

    //конвертируем нумерацию слайдов в JS нумерацию с 0
    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('dot-active');
  }

  function plusSlides(n) {
    //узнаем значение нового слайда, через прибавление n к n
    //и сразу записываем это значение в ф-ю(это для дотов, а так было бы просто
    // ++)
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }



  document.body.addEventListener('click', e => {
    //делаем один обрабочик событий на клики во всем боди,
    //при помощи условий будем отлавливать любое событие в любом месте
    let target = e.target;

    //табы
    if (target && (target.classList.contains('more') || target.classList.contains('description-btn'))) {
      bindModal('block', 'hidden', 'add', target);
    }
    if (target && target.classList.contains('popup-close')) {
      bindModal('none', '', 'remove');
    }
    if (target && target.classList.contains('info-header-tab')) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) { //перебираем все табы до того как найдем
          //нужный нам таб с индексом(который нам нужен! - да, так мы и
          //находим этот чертов индекс цели!!!)
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }

    
    //слайдер
    if (target.classList.contains('prev') || target.classList.contains('arrow-left')) {
      plusSlides(-1);
    }
    if (target.classList.contains('next') || target.classList.contains('arrow-right')) {
      plusSlides(1);
    }
    if (target.classList.contains('dot')) {
      for (let i = 0; i < dots.length + 1; i++) {
        if (target.classList.contains('dot') && target == dots[i - 1]) {
          currentSlide(i);
        }
      }
    }
  });


  //Калькулятор
  let persons = document.querySelectorAll('.counter-block-input')[0],
    restDays = document.querySelectorAll('.counter-block-input')[1],
    place = document.getElementById('select'),
    totalValue = document.getElementById('total'),
    personsSum = 0,
    daysSum = 0,
    total = 0;

  totalValue.innerHTML = 0;

  persons.addEventListener('input', function () {
    personsSum = +this.value;
    total = (daysSum + personsSum) * 4000;

    if (restDays.value == '' || persons.value == '') {
      totalValue.innerHTML = 0;
    } else {
      totalValue.innerHTML = total * place.options[place.selectedIndex].value;
      //для учета уже выбранного select-input
    }

  });

  restDays.addEventListener('input', function () {
    daysSum = +this.value;
    total = (daysSum + personsSum) * 4000;

    if (persons.value == '' || restDays.value == '') {
      totalValue.innerHTML = 0;
    } else {
      totalValue.innerHTML = total * place.options[place.selectedIndex].value;
    }
  });

  place.addEventListener('input', function () {
    if (restDays.value == '' || persons.value == '') {
      totalValue.innerHTML = 0;
    } else {
      let a = total; //если бы мы сразу передавали значение total, 
      //то при выборе базы каждый раз бы умножалась на модификатор
      totalValue.innerHTML = a * this.options[this.selectedIndex].value;
    }
  });

});