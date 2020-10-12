const ejs = require("ejs");
const fs = require("fs");
const pdf = require("html-pdf");
const port = 3000;
const path = require('path');

let template = fs.readFileSync(__dirname+"/views/template_cartao.ejs", "utf8");

let publicador = {
    nome: "Camila Cristiane Paranhos Monteiro Nascimento",
    dtNascimento: "11/09/1981",
    dtBatismo: "17/08/1996",
    genero: "Masculino",
    ooUngido: "Outras Ovelhas",
    privilegio: "Ancião/Pioneiro Regular"
}

let anoServicoFrente = "2020/2021";
let anoServicoVerso = "2021/2022";

let html = ejs.render(template, {
    filename: "template_cartao.ejs",
    publicador: publicador,
    anoServicoFrente: anoServicoFrente,
    anoServicoVerso: anoServicoVerso
});

let options = {
    "border": {
        "top": "15mm",
        "left": "7mm",
        "right": "7mm",
        "bottom": "15mm"
    }
};

pdf.create(html, options).toFile(__dirname+"/../output/cartao.pdf", function (err, data) {
    if (err) {
        throw err;
    } else {
        console.log("arquivo criado com sucesso");
    }
});