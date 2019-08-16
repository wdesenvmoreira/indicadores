const express = require('express')
const indicadoresControllers = require('../controller/controllerExecutar')

const indicadoresRouter = () => {
    const router = express.Router()


    router.get('/', (req, res) => {
        res.send('Barra indicadores.');
    });
}