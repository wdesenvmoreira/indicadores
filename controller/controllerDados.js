var express = require('express')
var cors = require('cors')
var firebird = require('node-firebird');
const conexao = require('../servidor/conexao')
const conexaoInd = require('../servidor/conexaoInd')
let options = conexao;
let optionsInd = conexaoInd;

var pool = firebird.pool(5, options);
var poolInd = firebird.pool(5, optionsInd);





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

            // console.log('indicadores: ', indicadores)

            app.use(cors({ credentials: true }));
            app.get('/indicadores', (req, res) => {
                res.json(indicadores);
                // res.status(200).res.send(indicadores);

            });

            db.detach();
            return indicadores
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

            //   console.log('indicadores: ', indicadores)

            app.use(cors({ credentials: true }));
            app.get('/indicadores', (req, res) => {

                res.send(indicadores);

            })

            db.detach();

        })
    });
}


let buscarDados = function(SQL) {

    //  console.log('select:', SQL)
    return new Promise((resolve, reject) => {


        pool.get(function(err, db) {

            if (err) {
                console.log('Erro ao conectar à base de dados.')
                throw err;
            }

            // db = DATABASE
            db.query(SQL, async function(err, result) {




                db.detach();

                resolve(result);

            })
        });
    });
}



module.exports = { buscarDados }