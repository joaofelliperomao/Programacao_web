const nodemailer = require('nodemailer');
const fs = require('fs');

function sendEmailAlerts() {
  const tasks = JSON.parse(fs.readFileSync('./backend/tasks.json'));
  const pending = tasks.filter(task => !task.completed);

  if (pending.length === 0) return;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'SEU_EMAIL@gmail.com',
      pass: 'SENHA_DO_APP'
    }
  });

  const mailOptions = {
    from: 'SEU_EMAIL@gmail.com',
    to: 'DESTINATARIO@gmail.com',
    subject: 'Tarefas Pendentes',
    text: `Você ainda tem ${pending.length} tarefa(s) pendente(s):\n` +
          pending.map(t => `- ${t.text}`).join('\n')
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.error(error);
    else console.log('Email enviado:', info.response);
  });
}

module.exports = sendEmailAlerts;
