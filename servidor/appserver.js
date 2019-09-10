var express = require('express')
var app = express()
var port = 3000

var cors = require('cors')

let routerIndicador = express.Router();
let executeIndicador = require('../controller/controllerExecutar.js')
let newController = require('../controller/newController.js')
const bodyParser = require('body-parser')
let SQLBuscaInd = 'select * from TBL_INDICADORES'

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
};

app.use(allowCrossDomain);
app.use(cors({ credentials: true }));

app.listen(port, () => {
    console.log(`Server started on port: 3000 appserver`);
});

app.get('/', (req, res) => {
    function fx(v) { return v }
    SQLBuscaInd = { operacao: "chave", condicao: "12" }
        // executeIndicador.buscaIndicadores('select * from TBL_INDICADORES', fx, app)
    executeIndicador.buscaIndicadores(SQLBuscaInd, fx, app)
    res.redirect('http://127.0.0.1:8887/dashboard.html')
})


routerIndicador.post('/novo', (req, res) => {
    if (executeIndicador.incluir(req.body, app)) {
        res.redirect('http://127.0.0.1:8887/painelindicadores.html')
    }


})


routerIndicador.post('/editar', (req, res) => {
    function fx(v) { return v }
    if (req.body.operacao == 'editar') {
        if (executeIndicador.editarIndicador(req.body, app)) {
            SQLBuscaInd = 'select * from TBL_INDICADORES where key = ' + req.body.chave
            res.redirect('http://127.0.0.1:8887/painelindicadores.html')
        }
    } else {
        if (req.body.operacao == 'excluir') {
            console.log('entrou no excluir:', req.body.chave)
            executeIndicador.excluirIndicador(req.body.chave, app)

            res.redirect('http://127.0.0.1:8887/painelindicadores.html')

        }

    }


})


routerIndicador.get('/listar/:url', (req, res) => {
    SQLBuscaInd = 'select * from TBL_INDICADORES'
    app.get('/indicadores', async(req, res) => {
        async function fx(v) { return v }
        let vdados = executeIndicador.buscaIndicadores(SQLBuscaInd, fx, app)

        var Resultado;

        Resultado = await vdados
            .then((dados) => {
                return dados;

            });

        res.send(Resultado)
    });
    let newUrl = 'http://127.0.0.1:8887/' + req.params.url + '.html'
    res.redirect(newUrl)



})


app.get('/indicadores', async(req, res) => {
    async function fx(v) { return v }
    // SQLBuscaInd = 'select * from TBL_INDICADORES'
    SQLBuscaInd = { operacao: "Todos", condicao: " " }
    let vdados = executeIndicador.buscaIndicadores(SQLBuscaInd, fx, app)

    var Resultado;

    Resultado = await vdados
        .then((dados) => {
            return dados;

        });

    res.send(Resultado)

});

app.get('/indicadores/:condicoes', async(req, res) => {
    let op = req.params.condicoes.slice(0, 5)
    let dado = req.params.condicoes.slice(5, 9)
        // if (req.params.condicoes == 'todos') {
        //     SQLBuscaInd = { operacao: "Todos", condicao: "" }
        // } else {
        //     console.log('condicoes paramentro: ', JSON.stringify(req.params.condicoes))
        //     SQLBuscaInd = { operacao: "chave", condicao: req.params.condicoes }
        // }

    if (op == 'todos') {
        SQLBuscaInd = { operacao: "Todos", condicao: "" }
    } else {
        console.log('op: ', op)
        console.log('dado:', dado)
        SQLBuscaInd = { operacao: op, condicao: dado }
    }
    async function fx(v) { return v }
    // SQLBuscaInd = 'select * from TBL_INDICADORES'

    let vdados = executeIndicador.buscaIndicadores(SQLBuscaInd, fx, app)

    var Resultado;

    Resultado = await vdados
        .then((dados) => {
            return dados;

        });

    res.send(Resultado)

});


app.use('/indicador', routerIndicador);

module.exports = app