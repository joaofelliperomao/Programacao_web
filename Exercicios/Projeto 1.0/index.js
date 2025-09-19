const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const tasksRoutes = require('./routes/tasks');
const sendEmailAlerts = require('./emailService');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/tasks', tasksRoutes);

// Agendar envio de alertas (1 vez por dia)
setInterval(sendEmailAlerts, 24 * 60 * 60 * 1000); // a cada 24h

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
