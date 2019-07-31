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
// console.log('options', options)
// 5 = the number is count of opened sockets
var pool = firebird.pool(5, options);
var poolInd = firebird.pool(5, optionsInd);
var q = require('q')

var y = null

function ver(t) {
    console.log('vendo:', t[0])
    y = t
}

async function x(d) { y = await d }

function fx(v) { return v }


const localizarDuplicata = async(SQL, funcaoExecute) => {
    var dados
        // Get a free pool



    pool.get(function(err, db) {

        if (err) {
            console.log('Erro ao conectar à base de dados.')
            throw err;
        }

        // db = DATABASE



        db.query(SQL, async function(err, result) {
            if (err) {
                console.log(err)
            } else {

                funcaoExecute(result)
                x(result)
                app.get('/', (req, res) => {
                    res.send(result);
                });

            }
            // console.log('deferred.promisse: ', deferred.promise)

            db.detach();

        })

    });

}




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
                res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                next();
            });
            app.use(cors({ credentials: true }));
            app.get('/indicadores', cors(), (req, res) => {
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
                res.send(indicadores);
            });
            app.get('/dashbord', (req, res) => {
                res.render(dashboard.html)
            });

            db.detach();

        })
    });


    return daros
}

async function newLocalization() {
    var dados
    firebird.attach(optionsInd, function(err, db) {

        if (err)
            throw err;

        db.sequentially('select * from TBL_INDICADORES', async function(row, index) {

                dados = row
            },
            function(err) {
                // END
                // IMPORTANT: close the connection
                db.detach();
            });
    });
    return await dados
}







let da = localizarDuplicata('select * from alinea', ver)

let daInd = localizarIndicador('select * from TBL_INDICADORES', fx)

async function ultimaTentativa() {
    console.log('antes de chamar o da')
    console.log('Localizando alinea', da)
    console.log('daInd', await daInd)
}
console.log('Abaixo ultima Tentativa:')
ultimaTentativa();
firebird.attach(options, function(err, db) {



    if (err)
        throw err;

    // db = DATABASE
    db.query('SELECT * FROM Alinea',
        function(err, result) {
            // IMPORTANT: close the connection
            ver(result)
            db.detach();


        })

});



//module.exports = { localizarDuplicata }