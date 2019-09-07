var express = require('express')
var app = express()
var port = 3000

var cors = require('cors')

let routerIndicador = express.Router();
let executeIndicador = require('../controller/controllerExecutar.js')
let newController = require('../controller/newController.js')
const bodyParser = require('body-parser')

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

app.listen(port, () => {
    console.log(`Server started on port: 3000 appserver`);
});

app.get('/', (req, res) => {
    function fx(v) { return v }
    executeIndicador.localizarIndicador('select * from TBL_INDICADORES', fx, app)
    var dados = executeIndicador.localizarIndicador('select * from TBL_INDICADORES', fx, app)
    console.log('dados: ', dados)
    res.redirect('http://127.0.0.1:8887/dashboard.html')
})

app.get('/dashbord', (req, res) => {
    res.redirect('http://127.0.0.1:8887/dashboard.html');
})

app.get('/painel-de-controle', (req, res) => {
    res.redirect('http://127.0.0.1:8887/painelindicadores.html');
})

app.get('/router', (req, res) => {
    res.render();
});

routerIndicador.post('/novo', (req, res) => {
    if (executeIndicador.incluir(req.body)) {
        res.redirect('http://127.0.0.1:8887/painelindicadores.html')
    }


})


routerIndicador.post('/editar', (req, res) => {
    if (executeIndicador.editarIndicador(req.body, app)) {


        res.redirect('http://127.0.0.1:8887/painelindicadores.html')
    }

})

routerIndicador.get('/novo', (req, res) => {

    res.send('Estudar mais get');
})
routerIndicador.get('/lista', (req, res) => {
    function fx(v) { return v }

    res.send('Lista de indicadores', executeIndicador.localizarIndicador('select * from TBL_INDICADORES', fx, app));


})

app.get('/teste', async(req, res) => {
    async function fx(v) { return v }
    let vdados = executeIndicador.buscaIndicador('select * from TBL_INDICADORES', fx, app)

    var Resultado;

    Resultado = await vdados
        .then((dados) => {
            return dados;

        });
    console.log(Resultado);
    console.log(Resultado[0])
});
app.use('/indicador', routerIndicador);

module.exports = app