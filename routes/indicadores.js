const express = require('express')
const indicadoresControllers = require('../controller/controllerExecutar')

const indicadoresRouter = () => {
    const router = express.Router()


    // router.get('/', (req, res) => {
    //     function fx(v) { return v }
    //     executeIndicador.buscaIndicadores('select * from TBL_INDICADORES', fx, app)
    //     res.redirect('http://127.0.0.1:8887/dashboard.html')
    // });

    // router.get('/dashbord', (req, res) => {
    //     res.redirect('http://127.0.0.1:8887/dashboard.html');
    // })

    // router.get('/painel-de-controle', (req, res) => {
    //     res.redirect('http://127.0.0.1:8887/painelindicadores.html');
    // })
}

module.exports = indicadoresRouter