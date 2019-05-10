window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  let timer = document.querySelector('.timer'),
      date = new Date(),
      options = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      };
  

  let div = document.createElement('div');
  div.classList.add("timedata-now");


  let timerDate = setTimeout(function log() {
    date = new Date();
    div.innerHTML = date.toLocaleString("ru", options);
    timer.appendChild(div);
    setTimeout(log, 1000);
  });

});