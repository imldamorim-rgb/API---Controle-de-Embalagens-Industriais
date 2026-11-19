import {conexao} from '../database/conexao.js';

export async function cadastrarMaquina(maquina) {
    const sql = 'INSERT INTO maquina(nome, patrimonio, status) VALUES (?, ?, ?)';
    const [resultado] = await conexao.execute(sql, [
        maquina.nome,
        maquina.patrimonio,
        maquina.status
    ]);;

    return resultado;

};

export async function listarMaquina() {
    const sql = 'SELECT * FROM maquina';
    const [resultado] = await conexao.execute(sql);

    return resultado;
};

export async function buscarMaquinaPorId(id) {
    const sql = 'SELECT * FROM maquina WHERE id_maquina = ?';
    const [resultado] = await conexao.execute(sql, [id]);

    return resultado[0];

};

export async function atualizarMaquina(id, maquina) {
    const sql = 'UPDATE maquina SET nome = ?, patrimonio = ?, status = ? WHERE id_maquina = ?;'
    const [resultado] = await conexao.execute(sql, [
        maquina.nome,
        maquina.patrimonio,
        maquina.status,
        id
    ]);
    
    return resultado;

};

export async function excluirMaquina(id) {
    const sql = 'DELET FROM maquina WHERE id_maquina = ?'
    const [resultado] = await conexao.execute(sql, [id]);

    return resultado;
};