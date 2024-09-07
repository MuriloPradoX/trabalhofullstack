const express = require('express');
const app = express();
const { Sequelize } = require('sequelize');


const db = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});


const Pessoa = db.define('Pessoa', {
  nome: {
    type: Sequelize.STRING
  },
  cpf: {
    type: Sequelize.STRING
  },
  telefone: {
    type: Sequelize.STRING
  }
});


app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


app.post('/pessoa', (req, res) => {
  const { nome, cpf, telefone } = req.body;
  Pessoa.create({ nome, cpf, telefone })
    .then(pessoa => res.json(pessoa))
    .catch(err => res.status(500).json({ message: 'Erro ao criar pessoa' }));
});


app.listen(3000, () => console.log('Servidor iniciado na porta 3000'));
