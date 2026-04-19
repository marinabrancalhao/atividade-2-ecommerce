let inputCep = document.querySelector("#cep");

inputCep.addEventListener("blur", function () {
  let cepDigitado = inputCep.value;

  if (cepDigitado.length != 8) {
    alert("CEP inválido! O CEP precisa ter obrigatoriamente 8 números.");
    return;
  }

  let url = `https://viacep.com.br/ws/${cepDigitado}/json/`;
  fetch(url).then(function (response) {
    response.json().then(function (data) {
      mostrarEndereco(data);
    });
  });
});

function mostrarEndereco(dados) {
  if (dados.erro) {
    alert("CEP não encontrado!");
  } else {
    let rua = document.querySelector("#rua");
    rua.value = dados.logradouro;

    let bairro = document.querySelector("#bairro");
    bairro.value = dados.bairro;

    let cidade = document.querySelector("#cidade");
    cidade.value = dados.localidade;

    let estado = document.querySelector("#estado");
    estado.value = dados.estado;
  }
}
