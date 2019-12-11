var indicadoresRotas = require('./IndicadoresRotas.js')
var dadosRotas = require('./dadosRota.js')

var express = require('express')
var app = express()

var gerenteRotas = (app) => {


    indicadoresRotas(app)
    dadosRotas(app)
}
module.exports = gerenteRotas