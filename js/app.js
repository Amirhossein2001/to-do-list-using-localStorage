const inputElem = document.getElementById("itemInput");
const addButton = document.getElementById("addButton");
const clearButton = document.getElementById("clearButton");
const todoListElem = document.getElementById("todoList");

let todoArray = [];

function addNewToDo() {
  let newToDoValue = inputElem.value;
  let newTodoObj = {
    id: todoArray.length + 1,
    title: newToDoValue,
    complete: false,
  };

  inputElem.value = "";

  todoArray.push(newTodoObj);
  todoGenerator(todoArray);
  setLocalStorage(todoArray);

  console.log(todoArray);
}

function setLocalStorage(todoList) {
  localStorage.setItem("todos", JSON.stringify(todoList));
}

function todoGenerator(todoList) {
  let newTodoLiElem, newTodoLabelElem, newTodoCompleteBtn, newTodoDeleteBtn;
  todoListElem.innerHTML = "";
  todoList.forEach(function (todo) {
    console.log(todo);
    newTodoLiElem = document.createElement("li");
    newTodoLiElem.className = "completed well";
    newTodoLabelElem = document.createElement("label");
    newTodoLabelElem.innerHTML = todo.title;
    newTodoCompleteBtn = document.createElement("button");
    newTodoCompleteBtn.className = "btn btn-success";
    newTodoCompleteBtn.innerHTML = "Complete";
    newTodoCompleteBtn.setAttribute("onclick", "completeTodo(" + todo.id + ")");

    newTodoDeleteBtn = document.createElement("button");
    newTodoDeleteBtn.className = "btn btn-danger";
    newTodoDeleteBtn.innerHTML = "Delete";
    newTodoDeleteBtn.setAttribute("onclick", "removeTodo(" + todo.id + ")");
    // newTodoDeleteBtn.setAttribute("onclick", `removeTodo(${todo.id})`)
    if ((todo.complete)) {
      newTodoLiElem.className = "uncompleted well";
      newTodoCompleteBtn.innerHTML = "Incomplete";
    }
    newTodoLiElem.append(
      newTodoLabelElem,
      newTodoCompleteBtn,
      newTodoDeleteBtn
    );
    todoListElem.append(newTodoLiElem);
    inputElem.focus();

    console.log(todoListElem);
  });
}

function getLocalStorage() {
  let localStorageTodo = JSON.parse(localStorage.getItem("todos"));
  if (localStorageTodo) {
    todoArray = localStorageTodo;
  } else {
    todoArray = [];
  }
  todoGenerator(todoArray);
}

function submit(event) {
  if (event.code === "Enter") {
    event.preventDefault();
    addNewToDo();
  }
}
function clearTodo() {
  todoArray = [];
  todoGenerator(todoArray);
  localStorage.clear();
}

function completeTodo(todoId) {
  let localStorageTodo = JSON.parse(localStorage.getItem("todos"));
  todoArray = localStorageTodo;

  todoArray.forEach(function (todo) {
    if (todo.id === todoId) {
      todo.complete = !todo.complete;
    }
    setLocalStorage(todoArray);
    todoGenerator(todoArray);
  });
}

function removeTodo(todoId) {
  let localStorageTodo = JSON.parse(localStorage.getItem("todos"));
  todoArray = localStorageTodo;
  let mainTodoIndex = localStorageTodo.findIndex(function (todo) {
    return todo.id === todoId;
  });

  todoArray.splice(mainTodoIndex, 1);
  setLocalStorage(todoArray);
  todoGenerator(todoArray);
}

window.addEventListener("load", getLocalStorage);
addButton.addEventListener("click", addNewToDo);
clearButton.addEventListener("click", clearTodo);
inputElem.addEventListener("keydown", submit);
