// < input id = "age" value = "30" >

let age = document.getElementById('age');

function showUser(surname, name) {
  console.log("Пользователь " + surname + " " + name + ", его возраст " + this.value);
}
console.log(showUser.call(age, 'Tailor', 'Tom'));

