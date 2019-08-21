var express = require('express')
    //var app = express()
var cors = require('cors')
var firebird = require('node-firebird');
const conexao = require('../servidor/conexao')
const conexaoInd = require('../servidor/conexaoInd')
let options = conexao;
let optionsInd = conexaoInd;

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
}

const localizarIndicadorPorKey = (SQL, funcaoExecute, app) => {
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

            app.use(cors({ credentials: true }));
            app.get('/indicadores/editar', (req, res) => {

                res.send(indicadores);

            })

            db.detach();

        })
    });
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

                //antes
                daros = result;
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

                app.use(cors({ credentials: true }));
                app.get('/indicadores/editar', (req, res) => {

                    res.send(indicadores);

                })



                //dpoie
                db.detach();
            });
        });
    });

    console.log('Dados', dados)
    return true
}

const editarIndicador = (dados) => {
    let key = dados.chave
    console.log('Dentro de Edição')
    firebird.attach(optionsInd, function(err, db) {
        var optionsIndicador = {
            "chart": {
                "title": `${dados.editarTitulo}`,
                "subtitle": `${dados.editarSubtitulo}`
            },
            "width": dados.editarLargura,
            "height": dados.editarAltura

        }

        let opcoes = JSON.stringify(optionsIndicador)

        if (err) {
            throw err;
            console.log('Erro:', err)
        }
        let SQL = `update
               TBL_INDICADORES
               set DESC_INDICADOR ='${dados.editarDescInd}' ,
               MODELO ='${dados.editarModeloIndicador}',
               BUSCARDADOS ='${dados.editarDados}',
               OPTIONSIND ='${opcoes}'
               where KEY = ${key}`
        console.log('SQL: ', SQL)
            // db = DATABASE
        db.query(SQL, null, function(err, result) {
            db.query(`SELECT * FROM TBL_INDICADORES WHERE KEY=${key}`, function(err, result) {
                console.log('Ultimo registro Alterado', result);

                db.detach();
            });
        });
    });

    console.log('Dados', dados)
    return true
}

module.exports = { localizarIndicador, incluir, localizarIndicadorPorKey, editarIndicador }