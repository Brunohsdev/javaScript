import api from "./api.js"
//interface do usuario
const ui = {

    async preencherFormulario(pensamentoId){
        const pensamento = await api.buscarPensamentoPorId(pensamentoId)
        document.getElementById("pensamento-id").value = pensamento.id;
        document.getElementById("pensamento-conteudo").value = pensamento.conteudo;
        document.getElementById("pensamento-autoria").value = pensamento.autoria;
    },
    async renderizarPensamentos(){
            const listaPensamentos = document.getElementById('lista-pensamentos')
            listaPensamentos.innerHTML = '';
           try{
               const pensamentos = await api.buscarPensamentos()
               pensamentos.forEach(ui.adicionarPensamentoNaLista)
           }
           catch{
            alert("deu erro")
           }
    },

     adicionarPensamentoNaLista(pensamento){
            const listaPensamentos = document.getElementById('lista-pensamentos')
            const li = document.createElement('li');
            li.setAttribute('data-id', pensamento.id)
            li.classList.add("li-pensamento")

            const iconeAspas = document.createElement('img')
            iconeAspas.src = "../frontend/assets/imagens/aspas-azuis.png"
            iconeAspas.alt = "Aspas azuis"
            iconeAspas.classList.add("icone-aspas")

            const pensamentoConteudo = document.createElement('div')
            pensamentoConteudo.textContent = pensamento.conteudo;
            pensamentoConteudo.classList.add("pensamento-conteudo");

            const pensamentoAutoria = document.createElement('div')
            pensamentoAutoria.textContent = pensamento.autoria;
            pensamentoAutoria.classList.add("pensamento-autoria");
            
            const botaoEditar = document.createElement('button')
            botaoEditar.classList.add("botao-editar");
            botaoEditar.onclick = () => ui.preencherFormulario(pensamento.id)
            
            const iconEditar = document.createElement('img')
            iconEditar.src = '../frontend/assets/imagens/icone-editar.png'
            iconEditar.alt = "Ícone de editar";

            botaoEditar.appendChild(iconEditar)

            const icons = document.createElement('div')
            icons.classList.add("icones")
            icons.appendChild(botaoEditar)

            const botaoExcluir = document.createElement('button')
            botaoExcluir.classList.add("botao-excluir");
            botaoExcluir.onclick = async() =>{
                try{
                    await api.excluirPensamento(pensamento.id)
                    ui.renderizarPensamentos()
            }
            catch(error){
                alert("Erro ao excluir pensamento")
            }
        }
            const iconExcluir = document.createElement('img')
            iconExcluir.src = '../frontend/assets/imagens/icone-excluir.png'
            iconExcluir.alt = "Ícone de excluir";

            botaoExcluir.appendChild(iconExcluir)

            icons.appendChild(botaoExcluir)

            li.appendChild(iconeAspas)
            li.appendChild(pensamentoConteudo)
            li.appendChild(pensamentoAutoria)
            li.appendChild(icons)
            listaPensamentos.appendChild(li)
            
        }
    }

           
export default ui;