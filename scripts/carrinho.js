// Script para excluir card de produto do carrinho
let modal = document.querySelectorAll(".basket-item");
let excluir = document.querySelectorAll(".basket-item__remove");

for (let i = 0; i < excluir.length; i++) {
  excluir[i].addEventListener("click", function () {
    modal[i].remove();
    atualizarTotalItens();
    calcularTotalPedido();
  });
}

//Script para incrementar e decrementar o número de produtos e preço
let botoesMenos = document.querySelectorAll(".basket-item__minus");
let botoesMais = document.querySelectorAll(".basket-item__plus");
let quantidades = document.querySelectorAll(".basket-item__quantity");

//Atualizar valor do card
let precos = document.querySelectorAll(".basket-item__unit-price");
let valorTotalCard = document.querySelectorAll(".basket-item__total-price");

//Decrementar
for (let i = 0; i < botoesMenos.length; i++) {
  botoesMenos[i].addEventListener("click", function () {
    let quantidade = converterQuantidade(quantidades[i].textContent);

    if (quantidade <= 0.5) {
      alert("A quantidade não pode ser menor que 0.5kg");
    } else {
      quantidade = quantidade - 0.5;
      quantidades[i].textContent = formatarQuantidade(quantidade);

      let preco = converterPreco(precos[i].textContent);
      let total = preco * quantidade;

      valorTotalCard[i].textContent = formatarPreco(total);
      calcularTotalPedido();
    }
  });
}

//Incrementar
for (let i = 0; i < botoesMais.length; i++) {
  botoesMais[i].addEventListener("click", function () {
    let quantidade = converterQuantidade(quantidades[i].textContent);
    quantidade = quantidade + 0.5;
    quantidades[i].textContent = formatarQuantidade(quantidade);

    let preco = converterPreco(precos[i].textContent);
    let total = preco * quantidade;

    valorTotalCard[i].textContent = formatarPreco(total);
    calcularTotalPedido();
  });
}

//Atualizar número de itens no resumo do pedido
let itensTotais = document.querySelector("#basket__count");
function atualizarTotalItens() {
  let itens = document.querySelectorAll(".basket-item");
  itensTotais.textContent = itens.length;
}

//Atualizar valor total do pedido
let valorTotalProdutos = document.querySelector("#basket__total-products");
let valorTotalPedido = document.querySelector(".basket__total-value");

//FUNÇÕES
//Função para converter o preço em numero
function converterPreco(texto) {
  return parseFloat(texto.replace("R$", "").replace(",", ".").trim());
}

//Função para formatar o preço
function formatarPreco(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

//Função para converter quantidade em número
function converterQuantidade(quantidade) {
  return parseFloat(quantidade.replace("kg", "").trim());
}

//Função para formatar quantidade
function formatarQuantidade(valor) {
  return valor + " kg";
}

//Função somar produtos
function calcularTotalProdutos() {
  let soma = 0;
  let cards = document.querySelectorAll(".basket-item__total-price");

  for (let i = 0; i < cards.length; i++) {
    let valor = converterPreco(cards[i].textContent);
    soma += valor;
  }

  valorTotalProdutos.textContent = formatarPreco(soma);
  return soma;
}

//Função calcular total do pedido
function calcularTotalPedido() {
  let totalProdutos = calcularTotalProdutos();
  let itens = document.querySelectorAll(".basket-item");

  console.log("Itens encontrados na cesta:", itens.length);

  if (itens.length === 0) {
    valorTotalProdutos.textContent = formatarPreco(0);
    valorTotalPedido.textContent = formatarPreco(0);
    return;
  }

  let desconto = 8;
  let frete = 10;
  let totalFinal = totalProdutos - desconto + frete;

  valorTotalPedido.textContent = formatarPreco(totalFinal);
}
