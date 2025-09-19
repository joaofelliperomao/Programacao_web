const API_URL = 'http://localhost:3000/api/tasks';

async function fetchTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();
  renderTasks(tasks);
}

function renderTasks(tasks) {
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.text + (task.completed ? ' ✅' : '');
    if (!task.completed) {
      const doneBtn = document.createElement('button');
      doneBtn.textContent = 'Concluir';
      doneBtn.onclick = () => markAsDone(task.id);
      li.appendChild(doneBtn);
    }
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Excluir';
    delBtn.onclick = () => deleteTask(task.id);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value;
  if (!text) return;
  await fetch(API_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ text })
  });
  input.value = '';
  fetchTasks();
}

async function markAsDone(id) {
  await fetch(`${API_URL}/${id}`, { method: 'PUT' });
  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchTasks();
}

fetchTasks();
