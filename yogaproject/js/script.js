// window.addEventListener('load') //для нашего окна есть 2 события
//первое - load: оозначает выполнение скрипта только после полной загрузки 
//страницы
window.addEventListener('DOMContentLoaded',  () => {
  //это событие для окна говорит о загрузку дерева тегов, т.е. загрузке
  //всей структуры DOM и после этого уже наш скрипт
  'use strict';


  //пишем табы
  //Необходимые составляющие: содержание каждого отдельного таба, кнопки перелючения табов,
  //родитель, который включает всё
  let tab = document.querySelectorAll('.info-header-tab'), //кнопки перекл
      tabContent = document.querySelectorAll('.info-tabcontent'); //содержание вкладок


  // function hideTabContent(a) {
  //   for (let i = a; i < tabContent.length; i++) {
  //     tabContent[i].classList.remove('show');
  //     tabContent[i].classList.add('hide');
  //   }
  // }
  const hideTabContent = (a = 1) => {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  };
  hideTabContent();
  //вызываем с загрузки ДОМ, чтобы показать одну вкладку, и скрыть все
  //остальные

  // function showTabContent(b) {
  //   if (tabContent[b].classList.contains('hide')) {
  //     tabContent[b].classList.remove('hide');
  //     tabContent[b].classList.add('show');
  //   }
  // }
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
  function getTimeRemaining(endtime) {
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
  }

  //3, 4
  function setClock(id, endtime) { //атрибудт id таймера в html и конец таймера
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
  }
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
    }  //во время вызова закрытия через крестик мы просто
    //не задаем 4й аргумент ф-ии, и соответственно берем с момента открытия модалки

    overlay.style.display = overlayStatus;
    // this.classList.classListMethod('more-splash'); //в таком виде работать не будет,
    // т.к. придет строка&
    elem.classList[classListMethod]('more-splash'); //c квадратными скобками
    //в объект classList придет правильное значение
    document.body.style.overflow = overflowStatus;
  };

  document.body.addEventListener('click', e => {
    //делаем один обрабочик событий на клики во всем боди,
    //при помощи условий будем отлавливать любое событие в любом месте
    let target = e.target;
    if ( target && (target.classList.contains('more') || target.classList.contains('description-btn'))) {
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
  });








});