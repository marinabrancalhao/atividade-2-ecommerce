//Estilização categoria do menu ativa
let itens = document.querySelectorAll(".header__categories li");
let links = document.querySelectorAll(".header__categories a");

let paginaAtual = window.location.pathname.split("/").pop();

if (paginaAtual === "") {
  paginaAtual = "index.html";
}

for (let i = 0; i < links.length; i++) {
  let link = links[i].getAttribute("href").replace("./", "");

  if (link === paginaAtual) {
    itens[i].classList.add("active");
  }
}
