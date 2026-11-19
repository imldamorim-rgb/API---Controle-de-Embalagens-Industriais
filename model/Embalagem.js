export class Embalagem {
    constructor(descricao, material, capacidade){
        this.descricao = descricao,
        this.material = material,
        this.capacidade = capacidade;
    }

    validar(){
        if(!this.descricao || this.descricao.trim().lenght < 3){
            return 'A descrição deve conter pelo menos 3 caracteres'
        }

        if(!this.material || !this.material.trim()) {
            return 'O material não pode ficar vazio'
        }

        if(!this.capacidade === '' || this.capacidade === null || this.capacidade === undefined || 
            isNaN(Number(this.capacidade)) || Number(this.capacidade) <= 0
        ) {
            return 'A capacidade deve ser um número maior que zero'
        }

        return null

    }
};