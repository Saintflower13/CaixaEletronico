# CaixaEletronico

Simula a entrega de cédulas dado um valor de saque. O objetivo é sempre disponibilizar o menor número de notas possíveis.  
**Desenvolvido em NodeJS.**  
Fonte: [DojoPuzzles](https://dojopuzzles.com/problems/caixa-eletronico/)

Pontos importantes:
* Saldo do cliente infinito;  
* Quantidade infinita de notas;  
* Notas disponíveis de R$ 100, R$ 50, R$ 20 e R$ 10.  

**To Do:**   
- [ ] Adicionar limite de notas disponíveis
- [ ] Adicionar limite do saldo de cliente 


## Descrição do projeto
  A parte central deste projeto é a distribuição de notas, devendo sempre ser entregue o menor número de cédulas possível.  
  
  Para isso, deve-se verificar com quantas notas é possível atingir o valor do saque, sempre validando a partir da nota mais alta (isso garante que menos notas sejam utilizadas) e subtraindo o valor que já foi retirado em cédulas do valor que ainda queremos extrair as notas.  
  
  Quando todo o valor que pode ser contemplado pela nota mais alta já tiver sido retirado, passa-se então para a segunda nota mais alta, repetindo o processo até que o todo valor tenha sido retirado.  
  
  O código abaixo (*services/saque.js*) descreve como está implementada esta funcionalidade:
  
```javascript
// Para descobrir qual é o maior número de notas possíveis utilizáveis dado um determinado valor de nota,  
// divide-se o valor do saque pelo valor da nota, pegando apenas a parte inteira, que significa quantas notas podemos utilizar
 CalcularQtdNotas(nota_valor) {
   return Math.trunc(this.valor_sacar / nota_valor);
 }
 
 // Subtrai do valor do saque o valor que foi retirado em determina nota
 SubtrairValorDoSaque(nota) {
   return this.valor_sacar -= (nota.valor * nota.qtd);
 }

  ObterNotas() {
    var i = 0;
    this.notas_saque = [];

    function AdicionarNota(qtd_notas) {
      return qtd_notas >= 1;
    };

    // this.Caixa.notas_disponiveis é um array com as notas disponíveis no caixa.
    // O loop se repete enquanto houver um valor restante para se sacar e estiver dentro da contagem de notas disponíveis.
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
```


## Testes

Também estão disponibilizados testes unitários para as funcionalidades do sistema. Estão localizados em *tests/caixa_eletronico.test.js*.

Os testes cobrem os seguintes cenários:  

* Valor de saque não é um valor inteiro (Não é possível sacar moedas no caixa);
* Não existem notas suficientes para formar o valor solicitado (ex: valor solicitado 55, porém no caixa não estão disponíveis notas de 5);
* Valor de saque é válido (ambos os testes acima passaram com sucesso);
* O cálculo que define a quantidade de notas necessárias está correto;
* O formato do objeto Nota possui todos os campos necessários;
* Valor a sacar resultante após retirada de notas está correto;
* A menor quantidade de notas foi obtida corretamente;
* Valor retirado em notas é igual ao valor solicitado.

O tópico abaixo descreve o passo a passo para rodar os testes.

## Instruções para execução do código  

Antes de qualquer coisa, certifique-se que você tenha o node instalado em sua máquina.  
Após isso, clone este repositório:  

```
git clone https://github.com/Saintflower13/CaixaEletronico.git CaixaEletronico
```

entre na pasta CaixaEletronico criada:

```
cd CaixaEletronico
```

e rode o seguinte comando para instalar as dependências do projeto:  

```
npm install
```

Para executar os testes unitários disponibilizados:

```
npm test
```

Para rodar a aplicação:

```
npm start
```

