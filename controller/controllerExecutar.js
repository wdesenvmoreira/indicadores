var express = require('express')
    //var app = express()
var cors = require('cors')
var firebird = require('node-firebird');
const conexao = require('../servidor/conexao')
const conexaoInd = require('../servidor/conexaoInd')
let options = conexao;
let optionsInd = conexaoInd;



// const allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     next();
// };

// app.use(allowCrossDomain);



// app.use(cors())
// app.listen(port, () => {
//     console.log(`Server started on port`);
// });

var pool = firebird.pool(5, options);
var poolInd = firebird.pool(5, optionsInd);


var y = null

function ver(t) {
    console.log('vendo:', t[0])
    y = t
}

async function x(d) { y = await d }

function fx(v) { return v }




const localizarIndicador = (SQL, funcaoExecute, app) => {
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



            // app.use(function(req, res, next) {
            //     res.header("Access-Control-Request-Headers", "origin")
            //     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
            //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            //     res.header("Access-Control-Allow-Credentials", true)
            //     next();
            // });


            app.use(cors({ credentials: true }));
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


    //return daros
}

const incluir = (dados) => {

    console.log('Dentro de incluir')
    firebird.attach(optionsInd, function(err, db) {
        var optionsIndicador = {
            "chart": {
                "title": `${dados.editTitulo}`,
                "subtitle": `${dados.editSubtitulo}`
            },
            "width": dados.editLargura,
            "height": dados.editAltura

        }

        let opcoes = JSON.stringify(optionsIndicador)

        if (err) {
            throw err;
            console.log('Erro:', err)
        }
        // let SQL = "insert into  TBL_INDICADORES (DESC_INDICADOR,MODELO,BUSCARDADOS,OPTIONSIND) values(" + dados.editDescInd + "," + dados.modeloIndicador + "," + dados.editDados + "," + opcoes + ")"
        let SQL = `insert into
               TBL_INDICADORES
               (DESC_INDICADOR,MODELO,BUSCARDADOS,OPTIONSIND)
               values
               ('${dados.editDescInd}', '${dados.modeloIndicador}','${dados.editDados}','${opcoes}')`
        console.log('SQL: ', SQL)
            // db = DATABASE
        db.query(SQL, null, function(err, result) {
            console.log('Resultado da inserção', result);
            var LastKey = result
            db.query(`SELECT * FROM TBL_INDICADORES WHERE KEY=${LastKey}`, function(err, result) {
                console.log('Ultimo registro inserido', result);
                db.detach();
            });
        });
    });

    console.log('Dados', dados)
    return true
}

const inclui = (dados) => {
    poolInd.get(function(err, db) {
        var optionsIndicador = {
            "chart": {
                "title": `${dados.editTitulo}`,
                "subtitle": `${dados.editSubtitulo}`
            },
            "width": dados.editLargura,
            "height": dados.editAltura
        }

        let opcoes = JSON.stringify(optionsIndicador)
        if (err) {
            console.log('Erro ao conectar à base de dados.')
            throw err;
        }
        let SQL = `insert into
        TBL_INDICADORES
        (DESC_INDICADOR,MODELO,BUSCARDADOS,OPTIONSIND)
        values
        ('descrição', 'line','fx','${opcoes}')`
            // values(,${dados.modeloIndicador},${dados.editDados},
        console.log(SQL)
            // db = DATABASE
        db.query(SQL, async function(err, result) {

            console.log('teste com poll', result)
        })
    })
}



//let daInd = localizarIndicador('select * from TBL_INDICADORES', fx)

module.exports = { localizarIndicador, incluir }