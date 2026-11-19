export class Operador {
    constructor(nome, matricula, status){
        this.nome = nome,
        this.matricula = matricula,
        this.status = status
    }

    validar() {
        if(!this.nome || this.nome.trim().lenght < 3){
            return 'A nome deve conter pelo menos 3 caracteres'
        };

        if(!this.matricula || !this.matricula.trim()) {
            return 'A matrícula não pode ficar vazio'
        };

        if(!this.status || !this.status.trim()) {
            return 'O status não pode ficar vazio'
        };

        return null;
    }
}