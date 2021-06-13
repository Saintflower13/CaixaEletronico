const reader = require('readline-sync');
const NotasValidacoes = require('../validations/notas.validations');
const Nota = require('../classes/notas');
var Caixa = require('../classes/caixa');

class SaqueService {
    constructor() {
        this.Caixa = new Caixa();
        this.ResetarSaque();
    }

    ResetarSaque() {
        this.valor_solicitado = 0;
        this.valor_sacar = 0;
        this.notas_saque = [];   
    }

    SolicitarValorSaque() {
        this.ResetarSaque();

        var saque = Number(reader.question('\n> Informe um valor para saque: '));
        
        if (!NotasValidacoes.ValorSaqueEhValido(saque))
            throw new Error('Valor informado para saque eh invalido.');

        this.valor_sacar = saque;
        this.valor_solicitado = this.valor_sacar;
    }

    CalcularQtdNotas(nota_valor) {
        return Math.trunc(this.valor_sacar / nota_valor);
    }
    
    SubtrairValorDoSaque(nota) {
        return this.valor_sacar -= (nota.valor * nota.qtd);
    }
    
    ObterNotas() {
        var i = 0;
        this.notas_saque = [];

        function AdicionarNota(qtd_notas) {
            return qtd_notas >= 1;
        };

        while (i < this.Caixa.notas_disponiveis.length && this.valor_sacar > 0) {
            var qtd_notas = this.CalcularQtdNotas(this.Caixa.notas_disponiveis[i]);
    
            if (AdicionarNota(qtd_notas)) { 
                var nota = new Nota(this.Caixa.notas_disponiveis[i], qtd_notas);
                this.notas_saque.push(nota);
    
                this.SubtrairValorDoSaque(nota);
            }
    
            i++;
        }
    }
    
    SomarNotas() {
        var valor_total_notas = 0;
    
        this.notas_saque.forEach(nota => {
            valor_total_notas += nota.valor * nota.qtd;   
        });
    
        return valor_total_notas;
    }

    EfetuarSaque() {
        this.ObterNotas();

        if (this.SomarNotas() != this.valor_solicitado)
            throw new Error('Houve um erro ao tentar efetual o saque.');
    }
}


module.exports = SaqueService;