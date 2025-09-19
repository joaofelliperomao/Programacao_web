const express = require('express');
const router = express.Router();
const fs = require('fs');
const filePath = './backend/tasks.json';

// Carregar tarefas
router.get('/', (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(filePath));
  res.json(tasks);
});

// Adicionar nova tarefa
router.post('/', (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(filePath));
  const newTask = { id: Date.now(), text: req.body.text, completed: false };
  tasks.push(newTask);
  fs.writeFileSync(filePath, JSON.stringify(tasks));
  res.status(201).json(newTask);
});

// Marcar como concluída
router.put('/:id', (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(filePath));
  const task = tasks.find(t => t.id == req.params.id);
  if (task) task.completed = true;
  fs.writeFileSync(filePath, JSON.stringify(tasks));
  res.json(task);
});

// Excluir tarefa
router.delete('/:id', (req, res) => {
  let tasks = JSON.parse(fs.readFileSync(filePath));
  tasks = tasks.filter(t => t.id != req.params.id);
  fs.writeFileSync(filePath, JSON.stringify(tasks));
  res.status(204).send();
});

module.exports = router;
