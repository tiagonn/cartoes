const ejs = require('ejs');
const fs = require('fs');
const pdf = require('html-pdf');
const _ = require('lodash');
const consolidarRelatorio = require('./consolidarRelatorio.js');

const parse = require('csv-parse/lib/sync');

let parametros = process.argv.slice(2);
let arquivoPublicadoresCSV = parametros[0];
let arquivoRelatoriosCSV = parametros[1];
let anoServicoFrente = parametros[2];
let anoServicoVerso = parametros[3];
let prefixoArquivo = parametros[4];

let publicadores;
let relatorios;

    // lendo e fazendo parser de arquivos de publicadores
(async function () {
    const publicadoresCSV = fs.readFileSync(arquivoPublicadoresCSV);
    publicadores = parse(publicadoresCSV, {columns: true});
})();

    // lendo e fazendo parser de arquivos de relatórios
(async function () {
    const relatoriosCSV = fs.readFileSync(arquivoRelatoriosCSV);
    relatorios = parse(relatoriosCSV, {columns: true});
})();

    // inicializando template do cartão
let template = fs.readFileSync(__dirname+'/views/template_cartao.ejs', 'utf8');

    // inicializando opções para PDF
let optionsPDF = {
    'border': {
        'top': '15mm',
        'left': '7mm',
        'right': '7mm',
        'bottom': '15mm'
    },
    "timeout":300000
};

publicadores.forEach(publicador => {
        // obtendo os relatórios do publicador
    let relPub = _.filter(relatorios, r => r.Publicador === publicador['Nome Completo']);
        // verificando se existe mais do que um ano de serviço, se sim obtendo apenas os dois primeiros
    if (relPub.length > 12) {
        let relPubs = relPub.chunk(relPub, 12);
        publicador.relatoriosAnoServicoFrente = consolidarRelatorio(relPubs[0]);
        publicador.relatoriosAnoServicoVerso = consolidarRelatorio(relPubs[1]); 
    } else {
        publicador.relatoriosAnoServicoFrente = consolidarRelatorio(relPub);
    }


        // renderizando html com base no template
    let html = ejs.render(template, {
        filename: 'template_cartao.ejs',
        publicador: publicador,
        anoServicoFrente: anoServicoFrente,
        anoServicoVerso: anoServicoVerso
    });    

        // gerando PDF
    let nomeArquivo = __dirname+'/../output/' + prefixoArquivo + ' - ' + publicador['Nome Completo'] + '.pdf';

    pdf.create(html, optionsPDF).toFile(nomeArquivo, function (err, data) {
        if (err) {
            throw err;
        } else {
            console.log('O seguinte cartão foi criado com sucesso: ' + nomeArquivo);
        }
    });
});