const express = require('express');
const router = express.Router();

const agendaController = require('../controllers/agenda-controllers');

router.get('/agenda', agendaController.obterAgenda);

router.get('/agenda/nome', agendaController.filtroNome);

router.get('/agenda/telefone', agendaController.filtroTelefone);

router.get("/agenda/:id", agendaController.obterId);

router.post('/agenda', agendaController.criarContato);

router.put('/agenda/:id', agendaController.atualizarAgenda);

router.patch('/agenda/:id', agendaController.atualizarTelefone);

router.delete('/agenda/:id', agendaController.deletarContato);

module.exports = router;