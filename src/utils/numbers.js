export function asCurrency(number) {
    return 'R$ ' + number.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
}