export class Operador {
    constructor(nome, matricula, turno){
        this.nome = nome,
        this.matricula = matricula,
        this.turno = turno
    }

    validar() {
        if(!this.nome || this.nome.trim().lenght < 3){
            return 'A nome deve conter pelo menos 3 caracteres'
        };

        if(!this.matricula || !this.matricula.trim()) {
            return 'A matrícula não pode ficar vazio'
        };

        if(!this.turno || !this.turno.trim()) {
            return 'O turno não pode ficar vazio'
        };

        return null;
    }
}