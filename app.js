const express = require('express');
const app = express();
const ejs = require("ejs");
const pdf = require("html-pdf");
const port = 3000;
const path = require('path');

// Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let publicador = {
    nome: "Tiago Neves do Nascimento",
    dtNascimento: "11/09/1981",
    dtBatismo: "17/08/1996",
    genero: "Masculino",
    ooUngido: "Outras Ovelhas",
    privilegio: "Ancião"
}

let anoServicoFrente = "2020/2021";
let anoServicoVerso = "2021/2022";

app.get('/', function(req, res, next) {
    res.render('index', {
        publicador: publicador,
        anoServicoFrente: anoServicoFrente,
        anoServicoVerso: anoServicoVerso
        }
        , function (err, html) {
            if (err) {
                res.send(err);
            } else {
                pdf.create(html).toFile("cartao.pdf", function (err, data) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send("arquivo criado com sucesso");
                    }
                })
            }
        }
    );
});

app.listen(port, err => {
    console.log(`Server is listening on ${port}`);
});