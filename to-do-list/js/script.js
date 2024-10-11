const addtaskForm = document.querySelector('.addTask-form');
const inputTask = document.querySelector('.input-task');
const btnSubmit = document.querySelector('.btn-submit');
const tbody = document.querySelector('tbody');
const rows = tbody.querySelectorAll('tr');

const tasks = [];
let idAutoIncrement = 1;

let draggedRow;

const dragStart = (e) => {
  draggedRow = e.target.closest('tr');
  e.dataTransfer.effectAllowed = 'move';
};

const dragOver = (e) => {
  e.preventDefault();
  const targetRow = e.target.closest('tr');

  const { height, top } = targetRow.getBoundingClientRect();

  if (targetRow && targetRow !== draggedRow) {
    const middle = height / 2 + top;

    if (e.clientY < middle) {
      targetRow.classList.add('tr-highlight-top');
      targetRow.classList.remove('tr-highlight-bottom');
    } else {
      targetRow.classList.add('tr-highlight-bottom');
      targetRow.classList.remove('tr-highlight-top');
    }
  }
};

const dragLeave = (e) => {
  const targetRow = e.target.closest('tr');

  const { height, top } = targetRow.getBoundingClientRect();

  if (targetRow && targetRow !== draggedRow) {
    const middle = height / 2 + top;

    if (e.clientY < middle) {
      targetRow.classList.remove('tr-highlight-top');
    } else {
      targetRow.classList.remove('tr-highlight-bottom');
    }
  }
};

const drop = (e) => {
  const targetRow = e.target.closest('tr');

  const { height, top } = targetRow.getBoundingClientRect();

  if (targetRow && targetRow !== draggedRow) {
    const middle = height / 2 + top;

    if (e.clientY < middle) {
      targetRow.classList.remove('tr-highlight-top');
      if (targetRow.previousElementSibling !== draggedRow) {
        draggedRow.remove();
        targetRow.insertAdjacentElement('beforebegin', draggedRow);
      }
    } else {
      targetRow.classList.remove('tr-highlight-bottom');
      if (targetRow.nextElementSibling !== draggedRow) {
        draggedRow.remove();
        targetRow.insertAdjacentElement('afterend', draggedRow);
      }
    }
  }
};

const dragAndDropHandlers = (tag) => {
  tag.addEventListener('dragstart', dragStart);
  tag.addEventListener('dragover', dragOver);
  tag.addEventListener('dragleave', dragLeave);
  tag.addEventListener('drop', drop);
};

const addTask = (e) => {
  e.preventDefault();

  if (inputTask.value === '') {
    alert('Insira uma tarefa primeiro!');
    return;
  }

  const task = {
    id: idAutoIncrement++,
    title: inputTask.value,
    created_at: createDate(),
    status: 'pendente',
  };

  tasks.push(task);

  inputTask.value = '';

  loadTasks();
};

const updateTask = (task) => {
  const { id, title, status } = task;

  const taskIdx = tasks.findIndex((task) => task.id === id);

  if (taskIdx !== -1) {
    tasks[taskIdx].title = title;
    tasks[taskIdx].status = status;
  }

  loadTasks();
};

const deleteTask = (id) => {
  const taskIdx = tasks.findIndex((task) => task.id === id);

  if (taskIdx !== -1) {
    tasks.splice(taskIdx, 1);
  }

  loadTasks();
};

const createDate = () => {
  const newDate = new Date().toUTCString().toString();

  return newDate;
};

const formatDate = (dateUTC) => {
  const options = { dateStyle: 'long', timeStyle: 'short' };

  const newDate = new Date(dateUTC).toLocaleString('pt-br', options);

  return newDate;
};

const createSelect = (status) => {
  const options = `
    <option value="pendente">Pendente</option>
    <option value="em andamento">Em andamento</option>
    <option value="concluída">Concluída</option>
  `;

  const select = createElement('select', '', options);

  select.value = status;

  return select;
};

const createElement = (tag, innerText = '', innerHTML = '') => {
  const element = document.createElement(tag);

  if (innerText) {
    element.innerText = innerText;
  }

  if (innerHTML) {
    element.innerHTML = innerHTML;
  }

  return element;
};

const createRow = (task) => {
  const { id, title, created_at, status } = task;

  const tr = createElement('tr');
  tr.draggable = true;
  dragAndDropHandlers(tr);

  const tdTitle = createElement('td', title);

  const tdDate = createElement('td', formatDate(created_at));

  const tdStatus = createElement('td', '');
  const select = createSelect(status);
  select.addEventListener('change', (e) =>
    updateTask({ ...task, status: e.target.value })
  );

  const tdActions = createElement('td');
  const btnEdit = createElement(
    'button',
    '',
    '<span class="material-symbols-outlined">edit</span>'
  );
  const btnDelete = createElement(
    'button',
    '',
    '<span class="material-symbols-outlined">delete</span>'
  );

  const editForm = createElement('form');
  const editInput = createElement('input');

  editInput.value = title;
  editForm.appendChild(editInput);

  editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    updateTask({ id, title: editInput.value, status });
  });

  btnEdit.classList.add('btn-actions');
  btnDelete.classList.add('btn-actions');

  btnEdit.addEventListener('click', () => {
    tdTitle.innerText = '';
    tdTitle.appendChild(editForm);
  });
  btnDelete.addEventListener('click', () => deleteTask(id));

  tdStatus.appendChild(select);

  tdActions.appendChild(btnEdit);
  tdActions.appendChild(btnDelete);

  tr.appendChild(tdTitle);
  tr.appendChild(tdDate);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  return tr;
};

const loadTasks = () => {
  tbody.innerHTML = '';

  tasks.forEach((task) => {
    const tr = createRow(task);
    tbody.appendChild(tr);
  });
};

loadTasks();

addtaskForm.addEventListener('submit', addTask);
