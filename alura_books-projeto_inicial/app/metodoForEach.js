const elementeParaInserirLivros = document.getElementById("livros");
const elementoValor = document.getElementById("valor_total_livros_disponiveis");
function exibirOsLivrosNaTela(listadeLivros){
  elementoValor.innerHTML = "";
  elementeParaInserirLivros.innerHTML = '';
  listadeLivros.forEach(livro => {
      let disponibilidade = livro.quantidade > 0 ? 'livro_imagens' : 'livros_imagens indisponivel';
        elementeParaInserirLivros.innerHTML +=`
         <div class="livro">
      <img class="${disponibilidade}" src="${livro.imagem}" alt="${livro.alt}" />
      <h2 class="livro__titulo">
       ${livro.titulo}
      </h2>
      <p class="livro__descricao">${livro.autor}</p>
      <p class="livro__preco" id="preco">R$${livro.preco.toFixed(2)}</p>
      <div class="tags">
        <span class="tag">${livro.categoria}</span>
      </div>
    </div>`
    });
}

function verificarDisponibilidadeDoLivro(livro){
  if(livro.quantidade > 0){
    return 'Livro_imagens'
  }
  else{
    return 'Livro_imagens indisponivel'
  }
}
