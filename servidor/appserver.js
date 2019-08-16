var express = require('express')
var app = express()
var port = 3000

var cors = require('cors')
    //var firebird = require('node-firebird');
    //const conexao = require('../servidor/conexao.js')
    //const conexaoInd = require('../servidor/conexaoInd.js')
    //let options = conexao;
    //let optionsInd = conexaoInd;
let routerIndicador = express.Router();
let executeIndicador = require('../controller/controllerExecutar.js')
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

//var pool = firebird.pool(5, options);
//var poolInd = firebird.pool(5, optionsInd);



// app.use(cors())
app.listen(port, () => {
    console.log(`Server started on port: 3000 appserver`);
});

app.get('/', (req, res) => {
    function fx(v) { return v }
    executeIndicador.localizarIndicador('select * from TBL_INDICADORES', fx, app)
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

//Inserindo dados na base de dados indicador. 
// > Após colocar informações no formulário será precionado o botão Salva
// > Após precionado o botão salvar é feito criado um objeto com os dados do novo indicador. 
// > Deve ser feita uma validação desses dados
//  > Após validação dos dados é enviado esses dados para o arquivo que executa a insersão dos dados na base de dados
// > O retorno informará se foi inserido ou não. 


routerIndicador.post('/novo', (req, res) => {
    //   res.render(executeIndicador, req.params);
    //console.log('Request Type:', req.method);
    //console.log('MODELO:', req.body.modeloIndicador);
    //res.status(200).send(req.body);
    //res.render(executeIndicador.incluir(req.body))
    if (executeIndicador.incluir(req.body)) {
        res.redirect('http://127.0.0.1:8887/painelindicadores.html')
    }


})
routerIndicador.get('/novo', (req, res) => {
    // res.render(executeIndicador, req.params);
    res.send('Estudar mais get');
})
routerIndicador.get('/lista', (req, res) => {
    function fx(v) { return v }

    res.send('Lista de indicadores', executeIndicador.localizarIndicador('select * from TBL_INDICADORES', fx, app));


})

app.use('/indicador', routerIndicador);

module.exports = app