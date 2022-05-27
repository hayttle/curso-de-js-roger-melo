/*
  01

  - Exiba no console o index da 1ª (e única) ocorrência do mês "Fevereiro" do 
    array "months".
*/

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
]

console.log(months.indexOf("Fevereiro"));

/*
  02

  - Crie um objeto de data que represente o momento presente;
  - Exiba o objeto no console.
*/

const date = new Date()
console.log(date)

/*
  03

  - Baseado no objeto que você acabou de criar, exiba o ano atual no console.
*/

console.log(date.getFullYear())

/*
  04

  - Crie um objeto de data que represente um momento passado;
  - Exiba o objeto no console.
*/

const birthday = new Date('05/15/1979 08:50:00')
console.log(birthday)

/*
  05

  - Exiba, no console, a hora do objeto que você acabou de criar.
*/

console.log(birthday.getHours())

/*
  06

  - Crie um objeto de data que represente um momento futuro;
  - Exiba o objeto no console.
*/

const dateFuture = new Date('12/31/2022 23:59:59')
console.log(dateFuture)
/*
  07

  - Exiba no console a quantidade de dias entre o momento futuro e o passado.
*/

const diffDays = dateFuture.getTime() - birthday.getTime()
const secs = Math.round(diffDays/1000);
const mins = Math.round(secs/60)
const hours = Math.round(mins/60)
const days = Math.round(hours/24)
console.log({days})

/*
  08
  
  Assim como a 1ª aplicação que implementamos no curso (Quiz), considere fazer 
  da aplicação To-do List uma peça do seu portfólio.

  Desenvolva a sua versão do To-do List e, se você sentir que a desenvolveu 
  por conta própria, considere inserí-la como parte de seu portfólio.

  Caso contrário, reveja as aulas e treine novamente até que você consiga 
  desenvolver a aplicação sozinho(a).

  Você pode hospedá-la no Netlify seguindo o mesmo tutorial que recomendei na 
  aplicação do Quiz: 
  https://www.youtube.com/playlist?list=PLlAbYrWSYTiMGMxQf9JSoZUU1rgVpGPth
*/
