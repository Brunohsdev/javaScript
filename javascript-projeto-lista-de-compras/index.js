import { criarItemDaLista } from "./srcipts/criarNomeDaLista.js";
import verificarListaVazia from "./srcipts/verificarListaVazia.js";
const listaDeCompras = document.getElementById("lista-de-compras");
const buttonAdicionar = document.getElementById("adicionar-item");


buttonAdicionar.addEventListener('click', (evento) => {
   const itemDaLista = criarItemDaLista(evento);
 
   listaDeCompras.appendChild(itemDaLista); 
   verificarListaVazia(listaDeCompras);
})


verificarListaVazia(listaDeCompras);