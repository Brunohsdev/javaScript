import ui from "./ui.js"
import api from "./api.js"

const pensamentosSet = new Set()

async function adicionarChaveAoPensamento(){
  try{
    const pensamentos = await api.buscarPensamentos()
    pensamentos.forEach(pensamento =>{
      const chavePensamento =
    `${pensamento.conteudo.trim().toLowerCase()}-${pensamento.autoria.trim().toLowerCase()}`
      pensamentosSet.add(chavePensamento)
    })
  }
  catch(error){
    alert('Erro ao adicionar chave ao pensamento')
  }
}







const regexConteudo = /^[A-Za-z\s]{10,}$/
function removerEspacos(string){
  return string.replaceAll(/\s+/g, '')
}
function validarConteudo(conteudo){
  return regexConteudo.test(conteudo)
}
const regexAutoria = /^[A-Za-z\s]{3,15}$/

function validarAutoria(autoria){
  return regexAutoria.test(autoria)
}

document.addEventListener("DOMContentLoaded", () => {
  ui.renderizarPensamentos()
  adicionarChaveAoPensamento()

  const formularioPensamento = document.getElementById("pensamento-form")
  const botaoCancelar = document.getElementById("botao-cancelar")
  const inputBusca = document.getElementById('campo-busca')

  formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario)
  botaoCancelar.addEventListener("click", manipularCancelamento)
  inputBusca.addEventListener('input', manipularBusca)
})

async function manipularSubmissaoFormulario(event) {
  event.preventDefault()
  const id = document.getElementById("pensamento-id").value
  const conteudo = document.getElementById("pensamento-conteudo").value
  const autoria = document.getElementById("pensamento-autoria").value
  const data = document.getElementById("pensamento-data").value

  const conteudoSemEspacos = removerEspacos(conteudo)
  const autoriaSemEspacos = removerEspacos(autoria)

  if(!validarConteudo(conteudoSemEspacos)){
    alert("Conteúdo inválido! São só permitidos letras e espaços, O conteúdo deve ter pelo menos 10 caracteres.")
    return
  }
  if(!validarAutoria(autoriaSemEspacos)){
    alert("Autoria inválida! São só permitidos letras e espaços, A autoria deve ter entre 3 e 15 caracteres.")
    return
  }
  if(!validarData(data)){
    alert("Não é permitido datas futuras! Selecione outra data")
    return
  }
  const chaveNovoPensamento =
  `${conteudo.trim().toLowerCase()}-${autoria.trim().toLowerCase()}`

  if(pensamentosSet.has(chaveNovoPensamento)){
    alert('Esse pensamento já existe')
    return
  }
  try {
    if (id) {
      await api.editarPensamento({ id, conteudo, autoria, data })
    } else {
      await api.salvarPensamento({ conteudo, autoria, data })
    }
    ui.renderizarPensamentos()
  } catch {
    alert("Erro ao salvar pensamento")
  }
}

function manipularCancelamento() {
  ui.limparFormulario()
}
async function manipularBusca(){
  const termoBusca = document.getElementById('campo-busca').value

  try{
    const pensamentosFiltrados = await api.buscarPensamentoPorTermo(termoBusca)
    ui.renderizarPensamentos(pensamentosFiltrados)
  }
  catch(error){
  alert('Erro ao realizar busca')
  }
}

function validarData(data){
  const dataAtual = new Date()
  const dataInserida = new Date(data)
  return dataInserida <= dataAtual
}

