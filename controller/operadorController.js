import {Operador} from '../model/Operador.js'
import validarId from '../model/validarId.js'

import {cadastrarOperador, listarOperadores, buscarOperadorPorId, atualizarOperador, excluirOperador} from '../repository/operadorRepository.js'

export async function cadastrar(req, res) {
    try {
        const {nome, matricula, turno} = req.body
        const operador = new Operador(nome, matricula, turno);
        const erro = operador.validar();

        if(erro){
            return res.status(400).json({mensagem: erro});
        }

        const resultado = await cadastrarOperador(operador);

        return res.status(201).json({mensagem: 'Operador cadastrada com sucesso', id: resultado.insertId});

    } catch (erro){
        return res.status(500).json({mensagem: 'Erro ao cadastrar operador'})
    }
};

export async function listar(req, res) {
    try {
        const operadores = await listarOperador();
        return res.status(200).json(operadores);

    } catch (erro) {
        return res.status(500).json({mensagem: 'Erro ao listar operador'})
    }
};

export async function buscarPorId(req, res) {
    try {
        const id = req.params.id;

        if(!validarId(id)) {
            return res.status(400).json({mensagem: 'ID inválido'})
        }

        const operador = await buscarOperadorPorId(id);

        if(!operador) {
            return res.status(404).json({mensagem: 'Operador não encontrada'});
        }

        return res.status(200).json(operador);

    } catch (erro) {
        return res.status(500).json({mensagem: 'Erro ao buscar operador'})
    }
};

export async function atualizar(req, res){
    try {
        const id = req.params.id;
        
        if(!validarId(id)) {
            return res.status(400).json({mensagem: 'ID inválido'})
        }
        
        const operadorAtual = await buscarOperadorPorId(id);
        if(!operadorAtual) {
            return res.status(404).json({mensagem: 'Operador não encontrada'});
        }

        const operador = new Operador(req.body.nome ?? operadorAtual.nome,
            req.body.matricula ?? operadorAtual.matricula,
            req.body.turno ?? operadorAtual.turno
        );

        const erro = operador.validar();

        if(erro){
            return res.status(400).json({mensagem: erro});
        }

        await atualizarOperador(id, operador);

        return res.status(200).json({mensagem: 'Operador atualizada com sucesso'});

    } catch (erro) {
        return res.status(500).json({mensagem: 'Erro ao atualizar operador'})
    }
};

export async function excluir(req, res){
    try {
        const id = req.params.id;

        if(!validarId(id)) {
            return res.status(400).json({mensagem: 'ID inválido'})
        }

        const operadorAtual = await buscarOperadorPorId(id);
        if(!operadorAtual) {
            return res.status(404).json({mensagem: 'Operador não encontrada'});
        }

        await excluirOperador(id);

        return res.status(200).json({mensagem: 'Operador excluído com sucesso'});

    } catch (erro) {
        return res.status(500).json({mensagem: 'Erro ao excluir operador'})
    }
};