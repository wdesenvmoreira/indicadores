var express = require('express')
var mcache = require('memory-cache')
var cors = require('cors')
var firebird = require('node-firebird');
const conexao = require('../servidor/conexao')
const conexaoInd = require('../servidor/conexaoInd')
let options = conexao;
let optionsInd = conexaoInd;

var pool = firebird.pool(5, options);
var poolInd = firebird.pool(5, optionsInd);
var ddd

var cache = (duration) => {
    return (req, res, next) => {
        let key = 'http://localhost:3000/indicadores'
        let cachedBody = mcache.get(key)
        if (cachedBody) {
            console.log('cachevody de mcache')
            res.send(cachedBody)
            return
        } else {
            res.sendResponse = res.send
            res.send = (body) => {
                mcache.put(key, body, duration * 1000);
                res.sendResponse(body)
            }
            next()
        }
    }
}



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
            app.get('/indicadores', cache(1), (req, res) => {
                res.json(indicadores);
                // res.status(200).res.send(indicadores);

            });
            app.get('/teste', (req, res) => {
                res.json(indicadores);
                // res.status(200).res.send(indicadores);

            });

            // app.get('/dashbord', (req, res) => {
            //     res.render(dashboard.html)
            // });
            // app.get('/', (req, res) => {
            //     res.location('http://127.0.0.1:8887/dashboard.html');
            // });

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
            db.query(`SELECT * FROM TBL_INDICADORES WHERE KEY=${key}`, function(err, result) {
                console.log('Ultimo registro Alterado', result);


                function fx(v) { return v }
                //localizarIndicador('select * from TBL_INDICADORES', fx, app)
                app.get('/indicadores', cache(10), (req, res) => {

                    res.json(result);

                })
                app.get('/dados', cache(10), (req, res) => {

                    res.json(result);

                })
                db.detach();
            });
        });
    });

    return true
}


let buscaIndicador = function(SQL, funcaoExecute, app) {
    return new Promise((resolve, reject) => {

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

                //console.log('indicadores: ', indicadores)

                app.use(cors({ credentials: true }));
                app.get('/indicadores', cache(1), (req, res) => {
                    res.json(indicadores);
                    // res.status(200).res.send(indicadores);

                });
                app.get('/teste', (req, res) => {
                    res.json(indicadores);
                    // res.status(200).res.send(indicadores);

                });

                // app.get('/dashbord', (req, res) => {
                //     res.render(dashboard.html)
                // });
                // app.get('/', (req, res) => {
                //     res.location('http://127.0.0.1:8887/dashboard.html');
                // });


                db.detach();

                resolve(daros);
            })
        });
    });
}

async function xdx(r) {
    var dddd = await r
    return dddd
}

module.exports = { localizarIndicador, incluir, localizarIndicadorPorKey, editarIndicador, buscaIndicador }