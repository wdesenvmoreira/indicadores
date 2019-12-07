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

            console.log('indicadores: ', indicadores)

            app.use(cors({ credentials: true }));
            app.get('/indicadores', (req, res) => {

                res.send(indicadores);

            })

            db.detach();

        })
    });
}

const incluir = (dados, app) => {

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


        });

    });

    function fx(v) { return v }
    buscaIndicadores('SELECT * FROM TBL_INDICADORES WHERE key=(select max(key) from TBL_INDICADORES)', fx, app)
    return true
}

const editarIndicador = (dados, app) => {
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
            db.query(`SELECT * FROM TBL_INDICADORES WHERE key=${key}`, function(err, result) {
                console.log('Ultimo registro Alterado', result);


                function fx(v) { return v }

                app.get('/ind', (req, res) => {

                    res.json(result);

                })

                db.detach();
            });
        });
    });

    return true
}


let buscaIndicadores = function(SQLParametro, funcaoExecute) {
    console.log('selectParametro:', SQLParametro)
    let SQL = ''
    if (SQLParametro.operacao == 'Todos') {
        SQL = 'select * from TBL_INDICADORES'
    } else {
        if (SQLParametro.operacao == 'chave') {

            SQL = `select * from TBL_INDICADORES where key=${SQLParametro.condicao}`

        } else {
            if (SQLParametro.operacao == 'descr') {

                SQL = `select * from TBL_INDICADORES where desc_indicador like '%${SQLParametro.condicao}%'`

            } else {
                if (SQLParametro.operacao == 'model') {

                    SQL = `select * from TBL_INDICADORES where modelo like '%${SQLParametro.condicao}%'`

                } else {
                    if (SQLParametro.operacao == 'title') {

                        SQL = `select * from TBL_INDICADORES where title like '%${SQLParametro.condicao}%'`
                    }
                }
            }
        }
    }
    console.log('select:', SQL)
    return new Promise((resolve, reject) => {


        poolInd.get(function(err, db) {

            if (err) {
                console.log('Erro ao conectar à base de dados.')
                throw err;
            }

            // db = DATABASE
            db.query(SQL, async function(err, result) {


                var indicador = []
                var indicadores = { "indicadores": null }


                result.forEach(element => {
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

                //console.log('indicadores: ', indicadores)

                // app.use(cors({ credentials: true }));
                // app.get('/indicadores', (req, res) => {
                //     res.json(indicadores);


                // });

                db.detach();

                resolve(indicadores);

            })
        });
    });
}

const excluirIndicador = function(chave, app) {
    let SQL = `delete from  TBL_INDICADORES where key = ${chave} `
    console.log('Sql dentro do excluir no controller: ', SQL)
    return new Promise((resolve, reject) => {

        //var daros
        // Get a free pool
        poolInd.get(function(err, db) {

            if (err) {
                console.log('Erro ao conectar à base de dados.')
                throw err;
            }

            // db = DATABASE
            db.query(SQL, async function(err, result) {

                app.use(cors({ credentials: true }));
                app.get('/indicadores', (req, res) => {
                    res.json(indicadores);


                });

                db.detach();

                return true
            })
        });
    });
}


module.exports = { localizarIndicador, incluir, localizarIndicadorPorKey, editarIndicador, buscaIndicadores, excluirIndicador }