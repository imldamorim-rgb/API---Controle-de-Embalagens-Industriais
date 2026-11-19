export class Maquina {
    constructor(nome, patrimonio, status) {
        this.nome = nome,
        this.patrimonio = patrimonio,
        this.status = status
    };

    validar() {
        if(!this.nome || this.nome.trim().lenght < 3){
            return 'A nome deve conter pelo menos 3 caracteres'
        };

        if(!this.patrimonio || !this.patrimonio.trim()) {
            return 'O patrimonio não pode ficar vazio'
        };

        if(!this.status || !this.status.trim()) {
            return 'O status não pode ficar vazio'
        };

        return null;

    }   
};