var express = require('express')
var app = express()
var port = 3000
var firebird = require('node-firebird');
const conexao = require('./conexao.js')
const conexaoInd = require('./conexaoInd.js')
let options = conexao;
let optionsInd = conexaoInd;
let dadosbusca
let dadosbuscaInd
    // console.log('options', options)
    // 5 = the number is count of opened sockets
var pool = firebird.pool(5, options);
var poolInd = firebird.pool(5, optionsInd);
var q = require('q')

const localizarDuplicata = (SQL) => {
    var deferred = q.defer()
        // Get a free pool
    pool.get(function(err, db) {

        if (err) {
            console.log('Erro ao conectar à base de dados.')
            throw err;
        }

        // db = DATABASE
        db.query(SQL, function(err, result) {
            if (err) {
                deferred.reject(new Error(err))
            } else {
                q.when()
                deferred.resolve(result)
            }
            // console.log('deferred.promisse: ', deferred.promise)

            db.detach();

        })

    });
    //  funcaoX('dados')
    //return deferred.promise.thenResolve((value) => { return this.then(function() { return value; }) });
    return deferred.promise
}


const localizarIndicador = async(SQL) => {
    var defered = q.defer()
        // Get a free pool
    poolInd.get(function(err, db) {

        if (err) {
            console.log('Erro ao conectar à base de dados.')
            throw err;
        }

        // db = DATABASE
        db.query(SQL, function(err, result) {
            defered.resolve(result)


            // console.log('resultado Indicadores: ', JSON.stringify(result))


            db.detach();

        })
    });
    //  funcaoX('dados')

    return defered.promise
}

async function newLocalization() {
    var dados
    firebird.attach(optionsInd, function(err, db) {

        if (err)
            throw err;

        // db = DATABASE
        db.sequentially('select * from TBL_INDICADORES', async function(row, index) {

                // EXAMPLE
                // console.log("Linhas: ", JSON.stringify(row))
                // dados = stream.write(JSON.stringify(row));

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







let da = localizarDuplicata('select * from alinea')
    // .then(function(data) {
    //     return data
    // })
let daInd = localizarIndicador('select * from TBL_INDICADORES').then(async(result) => { return await result })

//console.log('Da dentro da função', da.then(res => res).then(res => console.log(res.options)))
//console.log('Indicadores', daInd.then(res => res).then(res => console.log(res.optionsInd)))
//console.log('Indicadores parse', daInd.then(res => res).then(res => console.log(JSON.stringify(res.optionsInd))))
console.log('antes de chamar o da')
console.log('Localizando alinea', da)
console.log('depois de chamar da')



//module.exports = { localizarDuplicata }