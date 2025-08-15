const URL_BASE = "http://localhost:3000/pensamentos"

const converterStringParaData = (dataString) => {
  const [ano, mes , dia] =  dataString.split('-')
  return new Date(Date.UTC(ano, mes - 1, dia))
}
const api = {
  async buscarPensamentos() {
    try {
      const response = await axios.get(URL_BASE)
      const pensamentos =  await response.data

      return pensamentos.map(pensamento => { 
        return{
          ...pensamento,
           data: new Date(pensamento.data)  
        }
      })
    }
    catch {
      alert('Erro ao buscar pensamentos')
      throw error
    }
  },

  async salvarPensamento(pensamento) {
    try {
      const data = converterStringParaData(pensamento.data)
      const response = await axios.post(`${URL_BASE}`, {
        //tres pontinhos são espalhadores, ele sobrescreve o campo no caso o de data
        ...pensamento,
        data: data.toISOString()
      })
      return await response.data
    }
    catch {
      alert('Erro ao salvar pensamento')
      throw error
    }
  },

  async buscarPensamentoPorId(id) {
    try {
      const response = await axios.get(`${URL_BASE}/${id}`)
      return await response.data
    }
    catch {
      alert('Erro ao buscar pensamento')
      throw error
    }
  },

  async editarPensamento(pensamento) {
    try {
      const response = await axios.put(`${URL_BASE}/${pensamento.id}`, pensamento)
      const pensamento = await response.data
      return{
        ...pensamento,
        data: new Date(pensamento.data)
      }
    }
    catch {
      alert('Erro ao editar pensamento')
      throw error
    }
  },

  async excluirPensamento(id) {
    try {
      const response = await axios.delete(`${URL_BASE}/${id}`)
    }
    catch {
      alert('Erro ao excluir um pensamento')
      throw error
    }
  },

  async buscarPensamentoPorTermo(termo){
    try{
      const pensamentos = await this.buscarPensamentos()
      const termoEmMinusculas = termo.toLowerCase()
      const pensamentosFiltrados = pensamentos.filter(pensamento =>{
        return(pensamento.conteudo.toLowerCase().includes(termoEmMinusculas)) || pensamento.autoria.toLowerCase().includes(termoEmMinusculas)
      })
      return pensamentosFiltrados

    }
    catch(error){
      alert('Erro ao filtrar pensamentos')
    }
  },

  async atualizarFavorito(id, favorito){
    try{
      const response = await axios.patch(`${URL_BASE}/${id}`, { favorito })
      return response.data
    }
    catch(error){
      alert('Erro ao atualizar favorito')
      throw error
    }
  }
}

export default api