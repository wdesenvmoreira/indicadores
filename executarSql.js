var express = require('express')
var app = express()
var port = 3000
var cors = require('cors')
var firebird = require('node-firebird');
const conexao = require('./conexao.js')
const conexaoInd = require('./conexaoInd.js')
let options = conexao;
let optionsInd = conexaoInd;
let dadosbusca
let dadosbuscaInd


const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
};

app.use(allowCrossDomain);



app.use(cors())
app.listen(port, () => {
    console.log(`Server started on port`);
});

var pool = firebird.pool(5, options);
var poolInd = firebird.pool(5, optionsInd);


var y = null

function ver(t) {
    console.log('vendo:', t[0])
    y = t
}

async function x(d) { y = await d }

function fx(v) { return v }




const localizarIndicador = (SQL, funcaoExecute) => {
    var daros
        // Get a free pool
    poolInd.get(function(err, db) {

        if (err) {
            console.log('Erro ao conectar à base de dados.')
            throw err;
        }

        // db = DATABASE
        db.query(SQL, async function(err, result) {

            daros = await funcaoExecute(result)

            var indicador = []
            var indicadores = { "indicadores": null }


            daros.forEach(element => {
                var objDados = new Object()
                objDados.key = element.KEY
                objDados.DESC_INDICADOR = element.DESC_INDICADOR
                objDados.modelo = element.MODELO
                objDados.buscarDados = element.BUSCARDADOS
                objDados.optionsInd = JSON.parse(element.OPTIONSIND)
                indicador.push(objDados)

            });

            indicadores.indicadores = indicador
            indicadores = JSON.stringify(indicadores)
            indicadores = JSON.parse(indicadores)

            console.log('indicadores: ', indicadores)



            app.use(function(req, res, next) {
                res.header("Access-Control-Request-Headers", "origin")
                res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.header("Access-Control-Allow-Credentials", true)
                next();
            });
            //app.use(cors({ credentials: true }));
            app.get('/indicadores', (req, res) => {
                res.send(indicadores);
            });
            app.get('/dashbord', (req, res) => {
                res.render(dashboard.html)
            });
            app.get('/', (req, res) => {
                res.location('http://127.0.0.1:8887/dashboard.html');
            });

            db.detach();

        })
    });


    return daros
}



let daInd = localizarIndicador('select * from TBL_INDICADORES', fx)

//module.exports = { localizarDuplicata }