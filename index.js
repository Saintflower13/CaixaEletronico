const reader = require('readline-sync');
const SaqueService = require('./services/saque');

do {
    
    try {
        var CaixaEletronico = new SaqueService();

        CaixaEletronico.SolicitarValorSaque();
        CaixaEletronico.EfetuarSaque();
        ImprimirNotas(CaixaEletronico.notas_saque);
    } catch (e) {
        console.log(e.message);
    }

    var resposta = reader.question('\n- Finalizar aplicacao? (S)')
    console.log('\n');
} while (resposta.toUpperCase() != 'S');


function ImprimirNotas(notas) {
    console.log(''.padStart(29, '='));
    console.log('|' + ''.padStart(6) + 'NOTAS RETIRADAS' + ''.padStart(6) + '|');
    console.log('|' + ''.padStart(27, '=') + '|');
    console.log('|' + ''.padStart(1) + 'Nota'.padEnd(13) + 'Qtd'.padEnd(13) + '|');
    console.log('|' + ''.padStart(27, '-') + '|');

    notas.forEach(nota => {
        console.log('|' + ''.padStart(1) + 
            nota.valor.toString().padEnd(13) + 
            nota.qtd.toString().padEnd(13) + '|');
    });

    console.log(''.padStart(29, '='));
}


