export function gerarDiaDaSemana() {
     const diaDaSemana = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long'
    });
    const data = new Date().toLocaleDateString("pt-br");
    const horario = new Date().toLocaleTimeString("pt-br");
    const datacompleta = `${diaDaSemana}, (${data}) às ${horario}`;

    return datacompleta;
}

export default gerarDiaDaSemana;