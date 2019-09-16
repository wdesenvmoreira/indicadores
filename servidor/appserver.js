var express = require('express')
var app = express()
var port = 3000

var cors = require('cors')

let routerIndicador = express.Router();
let executeIndicador = require('../controller/controllerExecutar.js')
let newController = require('../controller/newController.js')
const bodyParser = require('body-parser')

let SQLBuscaInd = ''

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
    console.log(`Iniciado servidor na porta: 3000 appserver`);
});

app.get('/', (req, res) => {
    function fx(v) { return v }
    SQLBuscaInd = { operacao: "Todos", condicao: "" }
    try {
        executeIndicador.buscaIndicadores(SQLBuscaInd, fx, app)
    } catch (error) {
        console.log('Error: ', error, 'Erro ao executar o indicador')
    }

    res.redirect('http://127.0.0.1:8887/dashboard.html')
})


routerIndicador.post('/novo', (req, res) => {
    if (executeIndicador.incluir(req.body, app)) {
        res.redirect('http://127.0.0.1:8887/painelindicadores.html')
    } else {
        console.log('Error: ', error, 'Erro ao incluir indicador. ')
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
    SQLBuscaInd = { operacao: op, condicao: dado }

    async function fx(v) { return v }

    let vdados = executeIndicador.buscaIndicadores(SQLBuscaInd, fx, app)

    var Resultado;

    Resultado = await vdados
        .then((dados) => {
            return dados;

        });
    SQLBuscaInd = ''
    res.send(Resultado)

});


app.use('/indicador', routerIndicador);

module.exports = app