document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  let textInput = document.querySelector('.input');
  class Options {
    constructor(height, width, bg, fontSize = 14, textAlign = 'justify') {
      this.height = height;
      this.width = width;
      this.bg = bg;
      this.fontSize = fontSize;
      this.textAlign = textAlign;
    }
    newDiv(text) {
      let div = document.createElement('div');

      div.textContent = text;
      div.style.cssText = `height: ${this.height}px; \
      width: ${this.width}px; \
      background: ${this.bg}; \
      font-size: ${this.fontSize}px; \
      text-align: ${this.textAlign}; \
    `;
      document.body.appendChild(div);
    }
  }

  const elem = new Options(300, 400, 'green');
  elem.newDiv('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus delectus eum repellendus voluptatem labore, cumque pariatur quo inventore autem, enim sapiente facere, ullam quae voluptate aperiam veritatis! Saepe modi aperiam, repellat, sit voluptas officia at dignissimos amet impedit quo nobis, ipsam unde magnam veritatis omnis, pariatur necessitatibus facere odio. Vero.');
});


