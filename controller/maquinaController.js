import {Maquina} from '../model/Maquina.js'
import validarId from '../model/validarId.js'

import {cadastrarMaquina, listarMaquina, buscarMaquinaPorId, atualizarMaquina, excluirMaquina} from '../repository/maquinaRepository.js'

export async function cadastrar(req, res) {
    try {
        const {nome, patrimonio, status} = req.body
        const maquina = new Maquina(nome, patrimonio, status);
        const erro = maquina.validar();

        if(erro){
            return res.status(400).json({mensagem: erro});
        }

        const resultado = await cadastrarMaquina(maquina);

        return res.status(201).json({mensagem: 'Maquina cadastrada com sucesso', id: resultado.insertId});

    } catch (erro){
        return res.status(500).json({mensagem: 'Erro ao cadastrar maquina'})
    }
};

export async function listar(req, res) {
    try {
        const maquinas = await listarMaquina();
        return res.status(200).json(maquinas);

    } catch (erro) {
        return res.status(500).json({mensagem: 'Erro ao listar maquina'})
    }
};

export async function buscarPorId(req, res) {
    try {
        const id = req.params.id;

        if(!validarId(id)) {
            return res.status(400).json({mensagem: 'ID inválido'})
        }

        const embalagem = await buscarMaquinaPorId(id);

        if(!maquina) {
            return res.status(404).json({mensagem: 'Maquina não encontrada'});
        }

        return res.status(200).json(maquina);

    } catch (erro) {
        return res.status(500).json({mensagem: 'Erro ao buscar maquina'})
    }
};

export async function atualizar(req, res){
    try {
        const id = req.params.id;
        
        if(!validarId(id)) {
            return res.status(400).json({mensagem: 'ID inválido'})
        }
        
        const maquinaAtual = await buscarMaquinaPorId(id);
        if(!maquinaAtual) {
            return res.status(404).json({mensagem: 'Maquina não encontrada'});
        }

        const maquina = new Maquina(req.body.nome ?? maquinaAtual.nome,
            req.body.patrimonio ?? maquinaAtual.patrimonio,
            req.body.status ?? maquinaAtual.status
        );

        const erro = maquina.validar();

        if(erro){
            return res.status(400).json({mensagem: erro});
        }

        await atualizarMaquina(id, maquina);

        return res.status(200).json({mensagem: 'Maquina atualizada com sucesso'});

    } catch (erro) {
        return res.status(500).json({mensagem: 'Erro ao atualizar maquina'})
    }
};

export async function excluir(req, res){
    try {
        const id = req.params.id;

        if(!validarId(id)) {
            return res.status(400).json({mensagem: 'ID inválido'})
        }

        const maquinaAtual = await buscarMaquinaPorId(id);
        if(!maquinaAtual) {
            return res.status(404).json({mensagem: 'Maquina não encontrada'});
        }

        await excluirMaquina(id);

        return res.status(200).json({mensagem: 'Maquina excluída com sucesso'});

    } catch (erro) {
        return res.status(500).json({mensagem: 'Erro ao excluir maquina'})
    }
};