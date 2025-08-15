import ui from  "./ui.js"
import api from "./api.js"

document.addEventListener("DOMContentLoaded", ()=>{
   ui.renderizarPensamentos()

   const formularioPensamento = document.getElementById('pensamento-form')
   formularioPensamento.addEventListener('submit', manipularSubmicaoFormulario)
   
   async function manipularSubmicaoFormulario(event){
    event.preventDefault();
    const id = document.getElementById("pensamento-id").value;
    const conteudo = document.getElementById("pensamento-conteudo").value;
    const autoria = document.getElementById("pensamento-autoria").value;
    
    try{
        if(id){
            await api.editarPensamento({id, conteudo, autoria})
        }
        else{
            await api.SalvarPensamento({conteudo, autoria })
        }
        ui.renderizarPensamentos()
    }
    catch{
        alert("Erro ao salvar pensamento")
    }
    
    
}
   const botaoCancelar = document.getElementById('botao-cancelar');
    if (botaoCancelar) {
        botaoCancelar.addEventListener('click', () => {
            limparTela();
        });
    }
})

function limparTela(){
   document.getElementById("pensamento-conteudo").value = ""
   document.getElementById("pensamento-autoria").value = ""

}
    
