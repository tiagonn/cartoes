const ejs = require('ejs');
const fs = require('fs');
const pdf = require('html-pdf');
const _ = require('lodash');

const parse = require('csv-parse/lib/sync');

let parametros = process.argv.slice(2);
let publicadores;
let relatorios;

    // lendo e fazendo parser de arquivos de publicadores
(async function () {
    const publicadoresCSV = fs.readFileSync(parametros[0]);
    publicadores = parse(publicadoresCSV, {columns: true});
})();

    // lendo e fazendo parser de arquivos de relatórios
(async function () {
    const relatoriosCSV = fs.readFileSync(parametros[1]);
    relatorios = parse(relatoriosCSV, {columns: true});
})();

    // inicializando template do cartão
let template = fs.readFileSync(__dirname+'/views/template_cartao.ejs', 'utf8');

    // inicializando opções para PDF
let options = {
    'border': {
        'top': '15mm',
        'left': '7mm',
        'right': '7mm',
        'bottom': '15mm'
    },
    "timeout":300000
};

    // inicializando anos de serviços
let anoServicoFrente = '2020/2021';
let anoServicoVerso = '2021/2022';
let prefixoArquivo = '2020-2022 - '

publicadores.forEach(publicador => {
    let relPub = _.filter(relatorios, r => r.Publicador === publicador['Nome Completo']);
    publicador.relatoriosAnoServicoFrente = relPub;
    let html = ejs.render(template, {
        filename: 'template_cartao.ejs',
        publicador: publicador,
        anoServicoFrente: anoServicoFrente,
        anoServicoVerso: anoServicoVerso
    });    

    let fileName = __dirname+'/../output/' + prefixoArquivo + publicador['Nome Completo'] + '.pdf';

    pdf.create(html, options).toFile(fileName, function (err, data) {
        if (err) {
            throw err;
        } else {
            console.log('O seguinte cartão foi criado com sucesso: ' + fileName);
        }
    });
});





