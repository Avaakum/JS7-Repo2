// window.addEventListener('load') //для нашего окна есть 2 события
//первое - load: оозначает выполнение скрипта только после полной загрузки 
//страницы
window.addEventListener('DOMContentLoaded', function () {
  //это событие для окна говорит о загрузку дерева тегов, т.е. загрузке
  //всей структуры DOM и после этого уже наш скрипт
  'use strict';


  //пишем табы
  //Необходимые составляющие: содержание каждого отдельного таба, кнопки перелючения табов,
  //родитель, который включает всё
  let tab = document.querySelectorAll('.info-header-tab'), //кнопки перекл
      info = document.querySelector('.info-header'), //родитель кнопок
      tabContent = document.querySelectorAll('.info-tabcontent'),
      tabNumber = 0; //содержание вкладок


  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }

  hideTabContent(1);
  //вызываем с загрузки ДОМ, чтобы показать одну вкладку, и скрыть все
  //остальные

  function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  }

  info.addEventListener('click', function (event) {
    let target = event.target;
    if (target && target.classList.contains('info-header-tab')) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) { //перебираем все табы до того как найдем
          //нужный нам таб с индексом(который нам нужен! - да, так мы и
          //находим этот чертов индекс цели!!!)
          hideTabContent(0);
          showTabContent(i);
          tabNumber = i;
          modalShow(description[tabNumber]);
          break;
        }
      }
    }
  });


  //пишем таймер(полный разбор)
  //Необходимые составляющие: 
  //1дедлайн(время до которого будет идти таймер) - 
  //2сколько времени осталось до дедлайна: из дедлайна вычесть время сейчас, и из этой разницы будем брать всё
  //3ф-я, которая будет изменять величины
  //4ф-я, которая будет обновлять данные на стр

  //1
  let deadline = '2020-05-15';

  //2
  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
        //парсим дату на милисек
        //это и будет разници между датами(техн переменная внутри ф-ии)
        seconds = Math.floor((t / 1000) %  60), //и чтобы получить секунды до одной минуты
        //берем остаток от деления на 60
        //метод math который округляет до целого числа
        minutes = Math.floor((t / 1000 / 60) % 60), //та же хитрость для получ минут
        hours = Math.floor(( t / ( 1000 * 60 * 60))); //получаем полное кол-во часов до дл
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
      'total' : t, //передаем это значение для остановки таймера(в будущем), когда будет (<= 0)
      'hours' : hours,
      'minutes' : minutes,
      'seconds' : seconds
    };
  }

  //3, 4
  function setClock(id, endtime) { //атрибудт id таймера в html и конец таймера
    let timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds'),
        timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
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
    } 
  }
 
  setClock('timer', deadline);

  //Модальное окно

  let more = document.querySelector('.more'),
      description = document.querySelectorAll('.description-btn'),
      overlay = document.querySelector('.overlay'),
      close = document.querySelector('.popup-close');

  close.addEventListener('click', function () {
    overlay.style.display = 'none';
    more.classList.remove('more-splash');
    document.body.style.overflow = '';
  });

  function modalShow(button) {
    button.addEventListener('click', function () {
      overlay.style.display = 'block';
      this.classList.add('more-splash');
      document.body.style.overflow = 'hidden';
    });
  }
  
  modalShow(more);
  modalShow(description[tabNumber]);






      




});