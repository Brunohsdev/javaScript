const uploadBtn = document.getElementById('upload-btn');
const inputUpload = document.getElementById('image-upload');

uploadBtn.addEventListener('click', ()=>{
    inputUpload.click();

})

// A FileReader API é uma parte do File API do HTML5 que permite ler o conteúdo de arquivos (ou buffers de dados brutos) armazenados no computador do(a) usuário(a), usando objetos JavaScript. Isso é feito de forma assíncrona, ou seja, o navegador pode continuar trabalhando em outras tarefas enquanto o arquivo está sendo lido. Função pra ler o arquivo, aí mostra o nome do arquivo e o nome do arquivo
function lerConteudoDoArquivo(arquivo){
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        //lê o arquivo
        leitor.onload = () =>{
            resolve({url: leitor.result, nome: arquivo.name})

        }
        //mostra o erro se o arquivo for reijeitado
        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo);
    })
}
const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async(evento) => {
    const arquivo = evento.target.files[0];

    if(arquivo){
        try{
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        }
        catch(erro){
            console.error("Erro na leitura do arquivo:" + erro);
        }
    }
})
const inputTags = document.getElementById('inputTags');
const listaTags = document.getElementById('lista-tags');

listaTags.addEventListener('click', (evento)=>{
    if(evento.target.classList.contains("remove-tag")){
        const tagQueQueremosResolver = evento.target.parentElement;
        listaTags.removeChild(tagQueQueremosResolver);
    }
})

const tagsDisponiveis = ["front-end", "back-end", "full-stack", "design", "mobile", "'Programação", "Data Science", ];


async function verificaTags(tagsTexto){
     return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(tagsDisponiveis.includes(tagsTexto));
        }, 1000)
    })
}


inputTags.addEventListener('keypress', async (evento) =>{
    if(evento.key === "Enter"){
        evento.preventDefault();
        const tagtexto = inputTags.value.trim();
        if(tagtexto !==""){
            try{
            const tagExiste = await verificaTags(tagtexto);
            if(tagExiste) {

            
            const newTag = document.createElement("li");
            newTag.innerHTML = `<p>${tagtexto}</p> <img src="img/close-black.svg" class="remove-tag" alt="Remover tag">`;
            listaTags.appendChild(newTag);
            inputTags.value= "";
            }
            else{
                alert("Tag não foi encontrada");
                inputTags.value = "";
            }
            }
            catch(error){
                console.error("Erro ao verificar a tag:", error);
                alert("Erro ao verificar a tag.");
            }
        }
    }
})


const buttonPublicar = document.querySelector(".botao-publicar");

async function publicarProjeto(nome, descricao, tags) {
    return new Promise((resolve, reject) =>{
        setTimeout(()=>{
            const deuCerto = Math.random()>0.5;

            if(deuCerto){
                resolve("Projeto deu certo")
            }
            else{
                reject("Erro ao publicar projeto")
            }
        }, 1000)
    })
}


buttonPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault();

    const nomedoProjeto = document.getElementById("nome");
    const descricaoProjeto = document.getElementById("descricao");
    const tagsProjetos = Array.from(listaTags.querySelectorAll("p")).map(p => p.textContent);

    try {
        const resultado = await publicarProjeto(nomedoProjeto.value, descricaoProjeto.value, tagsProjetos);
        console.log(resultado);
    } catch (error) {
        console.error(error);
    }try {
        const resultado = await publicarProjeto(nomedoProjeto.value, descricaoProjeto.value, tagsProjetos);
        console.log(resultado);
    } catch(error){
        console.error(error);
        alert("Deu tudo certo!");
    }
})

const botaoDescartar = document.querySelector(".botao-descartar");

botaoDescartar.addEventListener("click", (evento)=>{
    evento.preventDefault();
    const formulario = document.querySelector("form");
    formulario.reset();

    imagemPrincipal.src = "img/imagem1.png";
    nomeDaImagem.textContent = "image_projeto.png"
    listaTags.innerHTML = "";

})