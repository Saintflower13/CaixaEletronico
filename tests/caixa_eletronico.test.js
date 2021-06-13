const NotasValidacoes = require('../validations/notas.validations');
const SaqueService = require('../services/saque');
const Nota = require('../classes/notas');

test('Valor do saque nao eh um numero inteiro.', () => {
    expect(() => {
        NotasValidacoes.EhValorInteiro(10.50)
    }).toThrow();
});

test('Nao existem notas disponiveis para o valor do saque.', () => {
    expect(() => {
        NotasValidacoes.HaNotasDisponiveis(51)
    }).toThrow();
});

test('Valor para saque eh valido para saque.', () => {
    expect(NotasValidacoes.ValorSaqueEhValido(250)).toBe(true);
});

test('Qtd de cedulas necessarias de uma nota esta correta.', () => {
    var CaixaEletronico = new SaqueService();
    CaixaEletronico.valor_sacar = 160;
    nota_valor = 100;

    expect(CaixaEletronico.CalcularQtdNotas(nota_valor)).toBe(1);
});

test('Formato da nota para saque esta correto.', () => {
    var nota = new Nota(100, 1);
    propriedades_existem = nota.valor != undefined && nota.qtd != undefined;

    expect(propriedades_existem).toBe(true);
});

test('Valor restante do saque apos retida do valor de uma nota esta correto.', () => {
    var CaixaEletronico = new SaqueService();
    CaixaEletronico.valor_sacar = 160;
    var nota = new Nota(100, 1);

    CaixaEletronico.SubtrairValorDoSaque(nota);

    expect(CaixaEletronico.valor_sacar).toBe(60);
});

test('A menor quantidade de notas para um saque foi obtida corretamente.', () => {
    notas_esperadas = [ 
        new Nota(100, 1),
        new Nota(50, 1),
        new Nota(20, 1),
        new Nota(10, 1) 
    ];

    var CaixaEletronico = new SaqueService();
    CaixaEletronico.valor_sacar = 180;
    CaixaEletronico.ObterNotas();

    expect(CaixaEletronico.notas_saque).toEqual(notas_esperadas);
});

test('Valor calculado para saque eh igual valor solicitado.', () => {
    var valor_solicitado = 260;
    var CaixaEletronico = new SaqueService();
    CaixaEletronico.valor_sacar = valor_solicitado;
    
    CaixaEletronico.ObterNotas();
    var valor_total_notas = CaixaEletronico.SomarNotas();

    expect(valor_total_notas).toBe(valor_solicitado);
});