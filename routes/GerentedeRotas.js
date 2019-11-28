var indicadoresRotas = require('./IndicadoresRotas.js')
var express = require('express')
var app = express()

var gerenteRotas = (app) => {
    app.get('/indicadores', (req, res) => {
        res.render('home');
    })

    indicadoresRotas(app)
}
module.exports = gerenteRotas