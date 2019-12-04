var indicadoresRotas = require('./IndicadoresRotas.js')
var express = require('express')
var app = express()

var gerenteRotas = (app) => {


    indicadoresRotas(app)
}
module.exports = gerenteRotas