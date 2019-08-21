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
let indicadorRouter = require('../routes/indicadores.js')
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

routerIndicador.post('/novo', (req, res) => {
        if (executeIndicador.incluir(req.body)) {
            res.redirect('http://127.0.0.1:8887/painelindicadores.html')
        }


    })
    // routerIndicador.post('/editar/:key', (req, res) => {
    //     if (executeIndicador.editarIndicador(req.params.key, req.body)) {
    //         res.redirect('http://127.0.0.1:8887/painelindicadores.html')
    //     }

// })

routerIndicador.post('/editar', (req, res) => {
        if (executeIndicador.editarIndicador(req.body)) {
            res.redirect('http://127.0.0.1:8887/painelindicadores.html')
        }

    })
    //routerIndicador.get('/editar', (req, res) => {
    // if (executeIndicador.editarIndicador(req.body)) {
    //     res.redirect('http://127.0.0.1:8887/painelindicadores.html')
    // }
    //res.send('valor com get: ');
    //})
routerIndicador.get('/novo', (req, res) => {
    // res.render(executeIndicador, req.params);
    res.send('Estudar mais get');
})
routerIndicador.get('/lista', (req, res) => {
        function fx(v) { return v }

        res.send('Lista de indicadores', executeIndicador.localizarIndicador('select * from TBL_INDICADORES', fx, app));


    })
    // routerIndicador.get('/:key', (req, res) => {
    //     function fx(v) { return v }
    //     let SQL = `select * from TBL_INDICADORES where key= ${req.params.key}`
    //     console.log('SQL:', SQL)
    //     executeIndicador.localizarIndicadorPorKey(SQL, fx, app)
    //     res.redirect('http://127.0.0.1:8887/edicaoIndicadores.html')
    // });

app.use('/indicador', routerIndicador);

module.exports = app