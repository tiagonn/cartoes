module.exports = function(relatorios) {
        // gerando totalizações;
        // Publicações,Vídeos,Horas,Revisitas,Estudos Bíblicos
    let qtdeMeses = 0;
    let totalPublicacoes = 0;
    let totalVideos = 0;
    let totalHoras = 0;
    let totalRevisitas = 0;
    let totalEstudosBiblicos = 0;

    relatorios.forEach(item => {
        if (item.Horas) {
            qtdeMeses++;
            totalHoras += Number(item.Horas);
        }
        if (item['Publicações']) {
            totalPublicacoes += Number(item['Publicações']);
        }
        if (item['Vídeos']) {
            totalVideos += Number(item['Vídeos']);
        }
        if (item.Revisitas) {
            totalRevisitas += Number(item.Revisitas);
        }
        if (item['Estudos Bíblicos']) {
            totalEstudosBiblicos += Number(item['Estudos Bíblicos']);
        }
    });
    relatorios.push({
        'Mês': '',
        'Mês Extenso': 'Total',
        'Grupo': '',
        Publicador: '',
        Tipo: '',
        'Publicações': totalPublicacoes,
        'Vídeos': totalVideos,
        Horas: totalHoras,
        Revisitas: totalRevisitas,
        'Estudos Bíblicos': totalEstudosBiblicos,
        'Observação': ''
    });
    relatorios.push({
        'Mês': '',
        'Mês Extenso': 'Média',
        'Grupo': '',
        Publicador: '',
        Tipo: '',
        'Publicações': totalPublicacoes / qtdeMeses,
        'Vídeos': totalVideos / qtdeMeses,
        Horas: totalHoras / qtdeMeses,
        Revisitas: totalRevisitas / qtdeMeses,
        'Estudos Bíblicos': totalEstudosBiblicos / qtdeMeses,
        'Observação': ''
    });

    return relatorios;
}
