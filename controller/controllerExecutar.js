var express = require('express')
var cors = require('cors')
var firebird = require('node-firebird');
const conexao = require('../servidor/conexao')
const conexaoInd = require('../servidor/conexaoInd')
const controllerDados = require('../controller/controllerDados')
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

const localizarIndicadorPorKey = (SQL) => {
    var daros
        // Get a free pool
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
                objDados.sql = element.SQL
                indicador.push(objDados)

            });

            indicadores.indicadores = indicador
            indicadores = JSON.stringify(indicadores)
            indicadores = JSON.parse(indicadores)

            db.detach();

            resolve(result);

        })

        db.detach();


    });
}

const incluir = async(dados) => {
    async function tratandodados() {
        return await tratarDadosInd(dados)
    }
    let dadosInd = await tratandodados()



    firebird.attach(optionsInd, function(err, db) {

        if (err) {
            throw err;
            console.log('Erro:', err)
        }




        let SQL = `insert into
               TBL_INDICADORES
               (DESC_INDICADOR,MODELO,BUSCARDADOS,OPTIONSIND,SQL)
               values
               ('${dados.editDescInd}', '${dados.modeloIndicador}','${dados.editDados}','${dadosInd.optionsInd}','${dadosInd.script}')`
            //console.log('SQL: ', SQL)

        // db = DATABASE
        db.query(SQL, null, async function(err, result) {


        });

    });
    let SQLParametro = { operacao: "ULTIMO", condicao: "ULTIMO" }


    if (buscaIndicadores(SQLParametro)) {
        return true
    } else {
        return false
    }

}

const tratarDadosInd = async(dados) => {

    let dadosInd = {

        "optionsInd": null,
        "script": null,

    }

    async function cont() { return await controllerDados.buscarDados(dados.editsql) }
    let script = dados.editsql.replace(/'/g, () => { return "''" });
    let conteudo = await cont()
    console.log('conteudo:', conteudo)
    let eX = dados.editEixoX


    let cab = []
    cab.push([dados.tipoCabecalho, 'MÊS'])
    console.log('primeiro cabecalho: ', cab)
    conteudo.forEach(dadosconteudo => {
        cab.push([dados.tipoCabecalho, dadosconteudo.RAZAOSOCIAL_PESSOA])
    })


    var optionsIndicador = {
        "chart": {
            "title": `${dados.editTitulo}`,
            "subtitle": `${dados.editSubtitulo}`
        },
        "width": dados.editLargura,
        "height": dados.editAltura,
        "cabecalho": cab,
        "tipoCabecalho": dados.tipoCabecalho,
        "eixoX": eX

    }

    let opcoes = JSON.stringify(optionsIndicador)



    dadosInd.optionsInd = opcoes
    dadosInd.script = script.trim()

    return dadosInd
}

const editarIndicador = async(dados, app) => {

    async function pegarDados() {
        async function cont() { return await controllerDados.buscarDados(dados.editarsql) }
        let conteudo = await cont()
        console.log('conteudo:', conteudo.length)
        return conteudo
    }
    let vetDados = await pegarDados()
    console.log('Total:', vetDados)



    let cabecalhoArray = dados.editarCabecalho.split(";")
    let cab = []

    if (cabecalhoArray.length != vetDados.length) {
        console.log(`Incompatibilidade no novo cabeçalho: Quantidade Atual ${vetDados.length}. Informado ${cabecalhoArray.length}`)
        cab.push(["number", 'MÊS'])
        vetDados.forEach(element => {
            cab.push(["number", element.RAZAOSOCIAL_PESSOA])
        });
    } else {

        cab.push(["number", 'MÊS'])
        cabecalhoArray.forEach(element => {
            cab.push(["number", element])
        });
    }
    let key = dados.chave
    console.log('cab:', cab)
    firebird.attach(optionsInd, function(err, db) {
        var optionsIndicador = {
            "chart": {
                "title": `${dados.editarTitulo}`,
                "subtitle": `${dados.editarSubtitulo}`
            },
            "width": dados.editarLargura,
            "height": dados.editarAltura,
            "cabecalho": cab,
            "eixoX": dados.editarEixoX
        }

        let opcoes = JSON.stringify(optionsIndicador)

        if (err) {
            throw err;
            console.log('Erro:', err)
        }
        var script = dados.editarsql.replace(/'/g, () => { return "''" }).trim()

        let SQL = `update
               TBL_INDICADORES
               set DESC_INDICADOR ='${dados.editarDescInd}' ,
               MODELO ='${dados.editarModeloIndicador}',
               BUSCARDADOS ='${dados.editarDados}',
               OPTIONSIND ='${opcoes}',
               SQL = '${script}'
               where KEY = ${key}`
            //console.log('update: ', SQL)
            // db = DATABASE
        try {


            db.query(SQL, null, function(err, result) {
                db.query(`SELECT * FROM TBL_INDICADORES WHERE key=${key}`, function(err, result) {
                    console.log('Ultimo registro Alterado', result);


                    function fx(v) { return v }

                    app.get('/ind', (req, res) => {

                        res.json(result);

                    })

                    db.detach();
                })
                db.detach()
            })
        } catch (error) {
            console.log('Erro ao Alterar Indicador.')
        }

    });


    return true
}


let buscaIndicadores = function(SQLParametro) {
    // console.log('selectParametro:', SQLParametro)
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
                    if (SQLParametro.operacao == 'ULTIMO') {

                        SQL = 'SELECT * FROM TBL_INDICADORES WHERE key=(select max(key) from TBL_INDICADORES)'
                    }
                }
            }
        }
    }
    // console.log('select:', SQL)
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

                // console.log('result:', result)
                result.forEach(element => {
                    var objDados = new Object()
                    objDados.key = element.KEY
                    objDados.DESC_INDICADOR = element.DESC_INDICADOR
                    objDados.modelo = element.MODELO
                    objDados.buscarDados = element.BUSCARDADOS
                    objDados.optionsInd = JSON.parse(element.OPTIONSIND)
                    objDados.sql = element.SQL
                    indicador.push(objDados)

                });

                indicadores.indicadores = indicador
                indicadores = JSON.stringify(indicadores)
                indicadores = JSON.parse(indicadores)


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