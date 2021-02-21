const agendaModel = require('../models/agenda-models');
const helper = require('../helpers/helper');

const obterAgenda = (req, res) => {
    res.status(200).json(agendaModel);
}

const obterId = (req, res) => {
    const { id } = req.params;
    const contato = agendaModel.find((contato) => contato.id == id);

    res.status(200).json(contato);
};

const filtroNome = (req, res) => {
    const { nome } = req.query;
    
    const nomeFiltrado = agendaModel.find(agenda => agenda.nome == nome);
    res.status(200).json(nomeFiltrado);
};

const filtroTelefone = (req, res) => {
    const { telefone } = req.query;

    const telefoneFiltrado = agendaModel.find(agenda => agenda.telefone == telefone);
    res.status(200).json(telefoneFiltrado);
};

const criarContato = (req, res) => {
    let { nome, telefone, email, outrosTelefones } = req.body;

    //utilizando o helper
    if (helper.conferirTelefone(agendaModel, telefone)) {
        res.status(400).json({ mensagem: "Esse número já existe!" });
    } else {
        let novoContato = {
            id: helper.incrementarId(agendaModel),
            nome: nome,
            telefone: telefone,
            email: email,
            outrosTelefones: outrosTelefones,
        };

        agendaModel.push(novoContato);
        res.status(201).json(novoContato);
    }
};

const atualizarAgenda = (req, res) => {
    const { id } = req.params;

    const filtrarContatoAtualizado = agendaModel.filter(agenda => agenda.id == id)[0];

    const indice = agendaModel.indexOf(filtrarContatoAtualizado);

    const obterChaves = Object.keys(req.body);
    
    obterChaves.forEach(chave => {
        filtrarContatoAtualizado[chave] = req.body[chave];
    })
        agendaModel[indice] = filtrarContatoAtualizado;
        res.status(200).json(agendaModel[indice])
};

const atualizarTelefone = (req, res) => {
    const { id } = req.params;
    const { telefone } = req.body;

    const encontrarContato = agendaModel.find(contato => contato.id == id);

    if (encontrarContato == null) {
        res.status(404).send({ mensagem: `Contato não encontrado` })
    } else {
        telefoneExiste = agendaModel.findIndex(contato => contato.telefone == telefone);

        if (telefoneExiste == -1) {
            encontrarContato.telefone = telefone;
            res.status(200).send({ mensagem: `Contato atualizado` })
        } else {
            res.status(400).send({ mensagem: `O telefone ${telefone} já existe` });
        }
    }
};

const deletarContato = (req, res) => {
    const { id } = req.params;

    const agendaFiltrada = agendaModel.filter(agenda => agenda.id == id)[0];

    const indice = agendaModel.indexOf(agendaFiltrada);

    agendaModel.splice(indice, 1);

    res.json(agendaModel);
}

module.exports = {
    obterAgenda,
    obterId,
    filtroNome,
    filtroTelefone,
    criarContato,
    atualizarAgenda,
    atualizarTelefone,
    deletarContato
}