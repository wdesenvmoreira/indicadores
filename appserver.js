const express = require('express')
const app = express()
const port = 3000

let path = require('path')
let routerIndicador = express.Router();

let GerentedeRotas = require('./routes/GerentedeRotas.js')
let executeIndicador = require('./controller/controllerExecutar.js')
let dadosIndicadores = require('./controller/controllerDadosIndicadores.js')

const bodyParser = require('body-parser')

app.use(express.static('public'))
app.use(bodyParser.json())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

let SQLBuscaInd = ''

app.use(bodyParser.urlencoded({
    extended: true
}))



app.listen(port, () => {
    console.log(`Iniciado servidor na porta: 3000 appserver`);
});



app.get('/listarIndicadores/:condicoes', (req, res) => {
    let dados

    console.log('tipobusca', req.params.condicoes)
    if (req.params.condicoes == 'Todos') {
        dados = dadosIndicadores.allIndicadores()
        console.log('dados', dados)
    }

    res.render('home', { 'dados': dados })
});


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
    SQLBuscaInd = 'select * from TBL_INDICADORES'
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
        //res.send(Resultado)
    res.render('home', { 'dados': Resultado });

});

GerentedeRotas(app)
    //app.use('/indicador', routerIndicador());

module.exports = app