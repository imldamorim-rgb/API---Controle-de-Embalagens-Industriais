import {Embalagem} from '../model/Embalagem.js'
import validarId from '../model/validarId.js'

import {cadastrarEmbalagem, listarEmbalagens, buscarEmbalagemPorId, atualizarEmbalagem, excluirEmbalagem} from '../repository/embalagemRepository.js'

export async function cadastrar(req, res) {
    try {
        const {descricao, material, capacidade} = req.body
        const embalagem = new Embalagem(descricao, material, capacidade);
        const erro = embalagem.validar();

        if(erro){
            return res.status(400).json({mensagem: erro});
        }

        const resultado = await cadastrarEmbalagem(embalagem);

        return res.status(201).json({mensagem: 'Embalagem cadastrada com sucesso', id: resultado.insertId});

    } catch (erro){
        console.log(erro)
        
        return res.status(500).json({mensagem: 'Erro ao cadastrar embalagem'})
    }
};

export async function listar(req, res) {
    try {
        const embalagens = await listarEmbalagens();
        return res.status(200).json(embalagens);

    } catch (erro) {
        return res.status(500).json({mensagem: 'Erro ao listar embalagem'})
    }
};

export async function buscarPorId(req, res) {
    try {
        const id = req.params.id;

        if(!validarId(id)) {
            return res.status(400).json({mensagem: 'ID inválido'})
        }

        const embalagem = await buscarEmbalagemPorId(id);

        if(!embalagem) {
            return res.status(404).json({mensagem: 'Embalagem não encontrada'});
        }

        return res.status(200).json(embalagem);

    } catch (erro) {
        return res.status(500).json({mensagem: 'Erro ao buscar embalagem'})
    }
};

export async function atualizar(req, res){
    try {
        const id = req.params.id;
        
        if(!validarId(id)) {
            return res.status(400).json({mensagem: 'ID inválido'})
        }
        
        const embalagemAtual = await buscarEmbalagemPorId(id);
        if(!embalagemAtual) {
            return res.status(404).json({mensagem: 'Embalagem não encontrada'});
        }

        const embalagem = new Embalagem(req.body.descricao ?? embalagemAtual.descricao,
            req.body.material ?? embalagemAtual.material,
            req.body.capacidade ?? embalagemAtual.capacidade
        );

        const erro = embalagem.validar();

        if(erro){
            return res.status(400).json({mensagem: erro});
        }

        await atualizarEmbalagem(id, embalagem);

        return res.status(200).json({mensagem: 'Embalagem atualizada com sucesso'});

    } catch (erro) {
        return res.status(500).json({mensagem: 'Erro ao atualizar embalagem'})
    }
};

export async function excluir(req, res){
    try {
        const id = req.params.id;

        if(!validarId(id)) {
            return res.status(400).json({mensagem: 'ID inválido'})
        }

        const embalagemAtual = await buscarEmbalagemPorId(id);
        if(!embalagemAtual) {
            return res.status(404).json({mensagem: 'Embalagem não encontrada'});
        }

        await excluirEmbalagem(id);

        return res.status(200).json({mensagem: 'Embalagem excluída com sucesso'});

    } catch (erro) {
        return res.status(500).json({mensagem: 'Erro ao excluir embalagem'})
    }
};