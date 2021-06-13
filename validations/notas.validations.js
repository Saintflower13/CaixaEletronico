var Caixa = require('../classes/caixa');

function EhValorInteiro(valor) {
    if (!Number.isInteger(valor))
        throw new Error('Valor informado eh invalido.');
}

function HaNotasDisponiveis(valor) {
    var caixa = new Caixa();
    divisivel_pela_menor_nota = valor % caixa.notas_disponiveis[caixa.notas_disponiveis.length - 1] == 0;
    
    if (!divisivel_pela_menor_nota || valor <= 0)
        throw new Error('Nao existem notas disponiveis para esse valor.');
}

function ValorSaqueEhValido(valor) {
    try {
        EhValorInteiro(valor);
        HaNotasDisponiveis(valor);
        return true;
    } catch (e) {
        console.error('- Erro ao validar notas: ' + e.message);
        return false;
    }
}

module.exports = { 
    ValorSaqueEhValido, 
    EhValorInteiro, 
    HaNotasDisponiveis
};