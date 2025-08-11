import gerarDiaDaSemana from "./gerarDiaDaSemana.js";
const inputItem = document.getElementById("input-item");
let contador = 0;

export function criarItemDaLista(evento){
       evento.preventDefault(); //todo botão atualiza tela, 
    // por isso o prevent default ele serve pra não atualizar tela
    if(inputItem.value ==""){
        alert("Por Favor, insira um item!")
        return;
    }
    //elemento dom de container e de input tipo checkbox
    const  itemDaLista = document.createElement("li");
    const containerItemDaLista = document.createElement("div");
    containerItemDaLista.classList.add("lista-item-container");
    const inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.id = `checkbox-${contador++}`;
    const nomeItem = document.createElement("p");
    nomeItem.innerText = inputItem.value;

    inputCheckbox.addEventListener('click', function(){
        if(inputCheckbox.checked){
            nomeItem.style.textDecoration = "line-through";
        }
        else{ nomeItem.style.textDecoration = "none";}
    })
    
    const datacompleta = gerarDiaDaSemana();
    const itemData = document.createElement("p");
    itemData.classList.add("texto-data")
    itemData.innerText = datacompleta;

    containerItemDaLista.appendChild(inputCheckbox);
    containerItemDaLista.appendChild(nomeItem);

    itemDaLista.appendChild(containerItemDaLista);
    itemDaLista.appendChild(itemData);
    
    return itemDaLista;
}