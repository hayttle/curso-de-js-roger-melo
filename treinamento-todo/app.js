const formAddTodo = document.querySelector(".form-add-todo");
const inputSearchToDo = document.querySelector(".form-search input");
const ulContainer = document.querySelector(".todos-container");

const addToDo = (inputValue) => {
  if (inputValue.length) {
    ulContainer.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center" data-todo="${inputValue}">
        <span>${inputValue}</span>
        <i class="far fa-trash-alt" data-trash="${inputValue}"></i>
    </li>
  `;
  }
};

const removeTodo = (clickedElement) => {
  const trashDataValue = clickedElement.dataset.trash;
  const todo = document.querySelector(`[data-todo="${trashDataValue}"]`);

  if (trashDataValue) {
    todo.remove();
  }
};

const filterToDo = (todos, inputValue, returnMatchedToDos) =>
  todos.filter((todo) => {
    const matchedToDo = todo.textContent.toLowerCase().includes(inputValue);
    return returnMatchedToDos ? matchedToDo : !matchedToDo;
  });

const manipulateClasses = (todos, classToAdd, classToRemove) => {
  todos.forEach((todo) => {
    todo.classList.remove(classToRemove);
    todo.classList.add(classToAdd);
  });
};

const hideToDos = (todos, inputValue) => {
  const toDosToHide = filterToDo(todos, inputValue, false);
  manipulateClasses(toDosToHide, "hidden", "d-flex");
};

const showToDos = (todos, inputValue) => {
  const toDosToShow = filterToDo(todos, inputValue, true);
  manipulateClasses(toDosToShow, "d-flex", "hidden");
};

formAddTodo.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = event.target.add.value.trim();
  addToDo(inputValue);
  event.target.reset();
});

todosContainer.addEventListener("click", (event) => {
  const clickedElement = event.target;
    removeTodo(clickedElement);
});

inputSearchToDo.addEventListener("input", (event) => {
  const inputValue = event.target.value.trim().toLowerCase();
  const todos = Array.from(todosContainer.children);
  hideToDos(todos, inputValue);
  showToDos(todos, inputValue);
});