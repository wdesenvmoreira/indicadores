var express = require('express')
var app = express()
var port = 3000
var firebird = require('node-firebird')
let dados
    // const connection = express.Router()

const conexaoInd = () => {
    var options = {};

    options.host = 'NOTE-0097';
    options.port = 3054;
    options.database = 'C:/ProjW/Indicadores/db/Indicadores.fdb';
    // options.database = 'C:/TEK-SYSTEM/DADOS/DADOSMC.fdb';
    options.user = 'SYSDBA';
    options.password = 'masterkey';
    options.lowercase_keys = false; // set to true to lowercase keys
    options.role = null; // default
    options.pageSize = 4096;

    return options
}

module.exports = conexaoInd()