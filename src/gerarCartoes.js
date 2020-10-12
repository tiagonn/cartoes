const ejs = require('ejs');
const fs = require('fs');
const pdf = require('html-pdf');
const parse = require('csv-parse/lib/sync');

let parametros = process.argv.slice(2);

    // lendo e fazendo parser de arquivos de publicadores
(async function () {
    const publicadoresCSV = fs.readFileSync(parametros[0]);
    const publicadores = parse(publicadoresCSV, {columns: true});
    console.log(publicadores);
})();

    // lendo e fazendo parser de arquivos de relatórios
(async function () {
    const relatoriosCSV = fs.readFileSync(parametros[1]);
    const relatorios = parse(relatoriosCSV, {columns: true});
    console.log(relatorios);
})();

// let parserPublicadores = parse({columns: true}, function (err, records) {
// 	console.log(records);
// });

// fs.createReadStream().pipe(parserPublicadores);

let template = fs.readFileSync(__dirname+'/views/template_cartao.ejs', 'utf8');

let publicador = {
    nome: 'Camila Cristiane Paranhos Monteiro Nascimento',
    dtNascimento: '11/09/1981',
    dtBatismo: '17/08/1996',
    genero: 'Masculino',
    ooUngido: 'Outras Ovelhas',
    privilegio: 'Ancião/Pioneiro Regular'
}

let anoServicoFrente = '2020/2021';
let anoServicoVerso = '2021/2022';

let html = ejs.render(template, {
    filename: 'template_cartao.ejs',
    publicador: publicador,
    anoServicoFrente: anoServicoFrente,
    anoServicoVerso: anoServicoVerso
});

let options = {
    'border': {
        'top': '15mm',
        'left': '7mm',
        'right': '7mm',
        'bottom': '15mm'
    }
};

pdf.create(html, options).toFile(__dirname+'/../output/cartao.pdf', function (err, data) {
    if (err) {
        throw err;
    } else {
        console.log('arquivo criado com sucesso');
    }
});