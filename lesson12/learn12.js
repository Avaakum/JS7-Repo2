//Promises(обещания)
//Поддержка везде, кроме IE. поддержка старых браузеров и IE через polyfills, можно
//найти в бибилиотеке Babel(превращение в старый код)

//Пример
//мы постоянно хотим при выполнении одних действий, чтобы происзодили другиеБ
//и постоянно используем колбек для этого. Простейший вар
// let btn = document.querySelector('button');
// btn.addEventListener('click', () => {
//   alert('Что-то');
// });

//Много функций, которые идут одни за другими, внутри предыдущих- колбэк хэл
let func1 = function (param, func2) {
    func2(function (param, func3) {
      func3(function (param, func4) {
        func4(function (param, func5) {
          
        })
      })
    })
}



