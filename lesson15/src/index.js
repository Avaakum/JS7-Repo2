let myModule = require('./learn15'); //импорт созданного модуля
// ./ - файл в этой же папке(только название без разширения)

let newModule = new myModule();

console.log(newModule.goodbye());
console.log(newModule.hello());
//без вебпек ничего не соберется
//соборали основной файл из модулей без конфигурации
//!! НЕ ИСПЛЬЗОВАТЬ ЗАРЕЗЕРВИРОВАННЫЕ СЛОВА (НАПР module)
// если без конфиг, то важно что-бы былиЖ
// 1. папки src и dist
//2. главный файл index.js

