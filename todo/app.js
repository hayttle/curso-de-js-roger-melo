const formAddTodo = document.querySelector(".form-add-todo");
const inputSearchToDo = document.querySelector(".form-search input");
const ulContainer = document.querySelector(".todos-container");
const todosContainer = document.querySelector(".todos-container");

formAddTodo.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = event.target.add.value.trim();
  if (input.length) {
    ulContainer.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${input}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
`;

    event.target.reset();
  }
});

todosContainer.addEventListener("click", (event) => {
  const clickedElement = event.target;
  if (Array.from(clickedElement.classList).includes("delete")) {
    event.target.parentElement.remove();
  }
});

inputSearchToDo.addEventListener("input", (event) => {
  const inputValue = event.target.value.trim().toLowerCase();
  Array.from(todosContainer.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(inputValue))
    .forEach((todo) => {
      todo.classList.remove("d-flex");
      todo.classList.add("hidden");
    });

  Array.from(todosContainer.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(inputValue))
    .forEach((todo) => {
      todo.classList.remove("hidden");
      todo.classList.add("d-flex");
    });
});
