export default function validarId(id) {
    return Number.isInteger(Number(id)) && Number(id) > 0;
}