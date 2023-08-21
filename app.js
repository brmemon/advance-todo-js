const newTodoInput = document.getElementById('newTodo');
const addTodoButton = document.getElementById('addTodo');
const removeAllButton = document.getElementById('removeAll');
const todoList = document.getElementById('todoList');

let todos = [];

let editingIndex = 1;

function yourTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {0
    const listItem = document.createElement('li');
    listItem.textContent = todo;
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => startEdit(index));

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeTodo(index));

        listItem.appendChild(editButton);
        listItem.appendChild(removeButton);
        
        todoList.appendChild(listItem);

        if (editingIndex !== 1 && editingIndex !== index) {
          editButton.disabled = true;
        }
      });

      removeAllButton.disabled = todos.length === 0;
    }

    function addTodo() {
      const newTodo = newTodoInput.value.trim();
      if (newTodo !== '') {
        if (editingIndex === 1) {
          todos.push(newTodo);
        } else {
          todos[editingIndex] = newTodo;
          editingIndex = 1;
        }
        newTodoInput.value = '';
        yourTodos();
      }
    }

    function startEdit(index) {
      newTodoInput.value = todos[index];
      editingIndex = index;

      const editButtons = document.querySelectorAll('button');
      editButtons.forEach((button, i) => {
        button.disabled = i !== index;
      });
    }

    function removeTodo(index) {
      todos.splice(index,1);
      editingIndex = 1;
      yourTodos();
    }

    function removeAllTodos() {
      const confirmDelete = confirm('Are you sure you want to delete all todos?');
      if (confirmDelete) {
        todos = [];
        editingIndex = 1;
        yourTodos();
      }
    }

addTodoButton.addEventListener('click', addTodo);
removeAllButton.addEventListener('click', removeAllTodos);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addTodo();
  }
});

yourTodos();