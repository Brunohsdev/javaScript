const apiURL = 'http://localhost:3000/pensamentos'

const api = {
    async buscarPensamentos(){
        try{
            const response = await axios.get(apiURL)
            return await response.data
        }
        catch(error){
            alert('Erro ao buscar pensamentos')
            throw error
        }
    },
    
    async SalvarPensamento(pensamento){
        try{
                const response = await axios.post(apiURL, pensamento)
                return await response.data
            }
        
        catch(error){
            alert('Erro ao salvar pensamentos')
            throw error
        }
    },
     async buscarPensamentoPorId(id){
        try{
            const response = await axios.get(`${apiURL}/${id}`)
            return await response.data
        }
        catch(error){
            alert('Erro ao buscar pensamento')
            throw error
        }
    },


    async editarPensamento(pensamento){
        try{
            const response = await axios.put(`${apiURL}/${pensamento.id}`,pensamento)
            return await response.data
        }
        catch(error){
            alert('Erro ao editar pensamentos')
            throw error
        }
    },
    async excluirPensamento(id){
        try{
            const response = await axios.delete(`${apiURL}/${id}`)
            return await response.data
        }
        catch(error){
            alert('Erro ao excluir pensamento')
            throw error
        }
    }

}

export default api;