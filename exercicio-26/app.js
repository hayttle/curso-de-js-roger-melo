/*
  01

  - Crie uma função que recebe uma data por parâmetro e retorna a data na 
    formatação "DD/MM/AAAA". Exemplo: 03/07/2021;
  - Não utilize a date-fns.
*/

const formatNumber = (number) => (number < 10 ? `0${number}` : number);

const date = new Date();

const getDate1 = (date) => {
  const day = formatNumber(date.getDate());
  // const month = date.toLocaleString("pt-BR", {month: "long"});
  const month = formatNumber(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

console.log(getDate1(date));

/*
  02

  - Crie uma função que recebe uma data por parâmetro e retorna o horário e a 
    data na formatação: "03:07 - domingo, 7 de junho de 2020";
  - Não utilize a date-fns.
*/

const getDate2 = (date) => {
  const hours = formatNumber(date.getHours());
  const minutes = formatNumber(date.getMinutes());
  const dayOfWeek = date.toLocaleString("pt-BR", {weekday: "long"});
  const day = date.getDate();
  const month = date.toLocaleString("pt-BR", {month: "long"});
  const year = date.getFullYear();

  return `${hours}:${minutes} - ${dayOfWeek}, ${day} de ${month} de ${year}`;
};

console.log(getDate2(date));

/*
  03

  - Faça um destructuring nas propriedades "id" e "isVerified" do objeto abaixo;
  - Exiba os valores lado a lado, no console;
  - Não modifique a declaração da const user.
*/

const user = {id: 42, isVerified: true};

const {id, isVerified} = user;
console.log(id, isVerified);

/*
  04

  - Faça um destructuring nas propriedades "name" dos objetos abaixo;
  - No destructuring, faça "Bender" ser armazenado por uma const "nameA" e 
    "HAL 9000" ser armazenado por uma const "nameB";
  - Exiba os valores das consts lado a lado, no console;
  - Não modifique a declaração das consts "robotA" e "robotB".
*/

const robotA = {name: "Bender"};
const robotB = {name: "HAL 9000"};

const {name: nameA} = robotA;
const {name: nameB} = robotB;

console.log(nameA, nameB);

/*
  05

  - Usando shorthand property names, crie um objeto com as propriedades "a", 
    "b" e "c";
  - O valor dessas propriedades deve ser o mesmo das consts "a", "b" e "c";
  - Exiba o objeto no console.
*/

const a = "a";
const b = "b";
const c = "c";

const obj = {a, b, c};

console.log(obj);

/*
  06

  - Refatore o código abaixo.
*/

const useDataSomewhereElse = (value) => {
  console.log(value);
};

const updateSomething = ({target, property, willChange} = {}) => {
  if (willChange === "valor indesejado") {
    willChange = "valor desejado";
  }

  useDataSomewhereElse({target, property, willChange});
};

updateSomething({target: "1", property: "2", willChange: "valor indesejado"});

/*
  07

  - O código abaixo é o mesmo do relógio digital que implementamos na aula 
    passada. Refatore-o.
*/

const clockContainer = document.querySelector(".clock-container");

const insertTimeIntoDOM = (hours, minutes, seconds) => {
  const clockHTML = `
    <span>${hours}</span> :
    <span>${minutes}</span> :
    <span>${seconds}</span>
  `;

  clockContainer.innerHTML = clockHTML;
};

const updateClock = () => {
  const present = new Date();
  const hours = formatNumber(present.getHours());
  const minutes = formatNumber(present.getMinutes());
  const seconds = formatNumber(present.getSeconds());

  insertTimeIntoDOM(hours, minutes, seconds);
};

setInterval(updateClock, 1000);
