/*
Este exercício será um pouquinho diferente dos anteriores.

Seu desafio é desenvolver uma versão do quiz que:

- Aborda um tema diferente (não pode ser de filmes);
- Tem um tema de cores diferente do que foi apresentado na aula;
- Exibe na tela a pontuação que o usuário fez. Não há certo ou errado, apenas faça.
Essa exibição de pontos é uma das implementações que faremos na próxima aula =D

Independente se você já fez o quiz dos filmes enquanto acompanhava a aula, tente fazer esse exercício sem rever partes da aula.

É importante que a sua versão do quiz seja feita apenas com o conteúdo que vimos até aqui.

Depois de fazer o que foi pedido acima, crie um repositório no GitHub para a sua aplicação e abra uma issue no repositório do curso com:

- O link da sua versão do quiz;
- Quais foram as suas maiores dúvidas ou dificuldades durante a execução desse exercício;
- Quais foram as suas menores dificuldades durante a execução desse exercício.

Link do repositório do curso: https://github.com/roger-melo-treinamentos/curso-de-js-roger-melo/issues

Ps: se você não conseguiu fazer tudo o que foi pedido acima, abra a issue mesmo assim =)
Ps2: o uso do Bootstrap (ou qualquer outra lib CSS) é opcional.
*/
const questions = [
  {
    question: "Quantos planetas Terra cabem dentro do Sol?",
    answers: ["Um milhão", "Cem", "Seiscentos", "Cento e cinquenta"],
    correctAnswer: "Um milhão",
  },
  {
    question: "Em que lugar vivem mais cangurus do que pessoas?",
    answers: ["Indonésia", "Nova Zelândia", "Austrália", "Papua-Nova Guiné"],
    correctAnswer: "Austrália",
  },
  {
    question: "Quantos olhos a maior parte das aranhas têm?",
    answers: ["Dois", "Quatro", "Quatro pares", "Seis"],
    correctAnswer: "Quatro pares",
  },
  {
    question: "O que mede a Escala Mercalli?",
    answers: [
      "A intensidade dos ventos",
      "A intensidade sísmica de acordo com os danos provocados",
      "A resistência dos minerais",
      "A magnitude de um terremoto",
    ],
    correctAnswer: "A intensidade sísmica de acordo com os danos provocados",
  },
];

let HTMLTemplate = "";
let title = "";
let answers = "";
let count = 1;
const form = document.querySelector("form");
const button = document.querySelector("button");
const p = document.createElement("p");

questions.forEach((question) => {
  answers = "";
  title = `<h2>${question.question}</h2>`;
  question.answers.forEach((answer) => {
    answers += `<div class="answer">
      <label for="">
        <input type="radio" name="question${count}" value="${answer}" required>${answer}
      </label>
      </div>
    `;
  });
  count++;
  HTMLTemplate += `<div class="question">${title}${answers}</div>`;
});

form.addEventListener("submit", (event) => {
  let score = 0;
  event.preventDefault();
  const input = [form.question1.value, form.question2.value, form.question3.value, form.question4.value];
  input.forEach((answer, index) => {
    if (answer === questions[index].correctAnswer) {
      score += 25;
    }
  });

  p.textContent = `O resultado do teste foi ${score}%`;
  p.setAttribute('class','result')
  form.insertAdjacentElement("afterend", p);


});

button.insertAdjacentHTML("beforebegin", HTMLTemplate);
