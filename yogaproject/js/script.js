// window.addEventListener('load') //для нашего окна есть 2 события
//первое - load: оозначает выполнение скрипта только после полной загрузки 
//страницы
window.addEventListener('DOMContentLoaded', function () {
  //это событие для окна говорит о загрузку дерева тегов, т.е. загрузке
  //всей структуры DOM и после этого уже наш скрипт
  'use strict';


  //пишем табы
  //3 вещи: содержание каждого отдельного таба, кнопки перелючения табов,
  //родитель, который включает всё
  let tab = document.querySelectorAll('.info-header-tab'), //кнопки перекл
    info = document.querySelector('.info-header'), //родитель кнопок
    tabContent = document.querySelectorAll('.info-tabcontent'); //содержание вкладок


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
          break;
        }
      }
    }
  });

});