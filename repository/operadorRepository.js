import {conexao} from '../database/conexao.js';

export async function cadastrarOperador(operador) {
    const sql = 'INSERT INTO operador(nome, matricula, turno) VALUES (?, ?, ?)';
    const [resultado] = await conexao.execute(sql, [
        operador.nome,
        operador.matricula,
        operador.turno
    ]);;

    return resultado;

};

export async function listarOperadores() {
    const sql = 'SELECT * FROM operador';
    const [resultado] = await conexao.execute(sql);

    return resultado;
};

export async function buscarOperadorPorId(id) {
    const sql = 'SELECT * FROM operador WHERE id_operador = ?';
    const [resultado] = await conexao.execute(sql, [id]);

    return resultado[0];

};

export async function atualizarOperador(id, operador) {
    const sql = 'UPDATE operador SET nome = ?, matricula = ?, turno = ? WHERE id_maquina = ?;'
    const [resultado] = await conexao.execute(sql, [
        operador.nome,
        operador.matricula,
        operador.turno,
        id
    ]);
    
    return resultado;

};

export async function excluirOperador(id) {
    const sql = 'DELET FROM operador WHERE id_operador = ?'
    const [resultado] = await conexao.execute(sql, [id]);

    return resultado;
};