var express = require('express')
var app = express()
var port = 3000
var firebird = require('node-firebird');
const conexao = require('./conexao.js')
let options = conexao;
let dadosbusca
    // console.log('options', options)
    // 5 = the number is count of opened sockets
var pool = firebird.pool(5, options);


// const localizarDuplicata = async(SQL) => {

//     // Get a free pool
//     const dados = await pool.get(function(err, db) {

//         if (err) {
//             console.log('Erro ao conectar à base de dados.')
//             throw err;
//         }

//         // db = DATABASE
//         db.query(SQL, function(err, result) {

//             dadosbusca = result

//             // console.log('resultado: ', result)

//             db.detach();
//             return result
//         });
//     });
//     return dados
// }

const localizarDuplicata = async(SQL, funcaoX) => {

    // Get a free pool
    const dados = await pool.get(function(err, db) {

        if (err) {
            console.log('Erro ao conectar à base de dados.')
            throw err;
        }

        // db = DATABASE
        db.query(SQL, function(err, result) {

            dadosbusca = result

            console.log('resultado: ', result)

            db.detach();
            return result
        })
    });
    funcaoX('dados')
    return dados
}

// // Get a free pool
// pool.get(function(err, db) {

//     if (err) {
//         console.log('Erro ao conectar à base de dados.')
//         throw err;
//     }

//     // db = DATABASE
//     db.query(SQL, function(err, result) {

//         dados = result

//         // console.log('resultado: ', result)
//         // console.log('Dados: ', dados[0])
//         db.detach();
//         return dados
//     });
// });



// // Destroy pool
// pool.destroy();




let da = localizarDuplicata('select * from alinea')
console.log('Da dentro da função', da.then(res => res).then(res => console.log(res.options)))

module.exports = { localizarDuplicata }