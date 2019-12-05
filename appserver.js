const express = require('express')
const app = express()
const port = 3000

let path = require('path')
let routerIndicador = express.Router();

let GerentedeRotas = require('./routes/GerentedeRotas.js')
let executeIndicador = require('./controller/controllerExecutar.js')
let dadosIndicadores = require('./controller/controllerDadosIndicadores.js')

const bodyParser = require('body-parser')

app.use(express.static('public'))
app.use(bodyParser.json())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

let SQLBuscaInd = ''

app.use(bodyParser.urlencoded({
    extended: true
}))



app.listen(port, () => {
    console.log(`Iniciado servidor na porta: 3000 appserver`);
});












// routerIndicador.get('/listar/:url', (req, res) => {
//     SQLBuscaInd = 'select * from TBL_INDICADORES'
//     app.get('/indicadores', async(req, res) => {
//         async function fx(v) { return v }
//         let vdados = executeIndicador.buscaIndicadores(SQLBuscaInd, fx, app)

//         var Resultado;

//         Resultado = await vdados
//             .then((dados) => {
//                 return dados;

//             });

//         res.send(Resultado)
//     });
//     let newUrl = 'http://127.0.0.1:8887/' + req.params.url + '.html'
//     res.redirect(newUrl)



// })


// app.get('/indicadores', async(req, res) => {
//     async function fx(v) { return v }
//     SQLBuscaInd = 'select * from TBL_INDICADORES'
//     SQLBuscaInd = { operacao: "Todos", condicao: " " }

//     let vdados = executeIndicador.buscaIndicadores(SQLBuscaInd, fx, app)

//     var Resultado;

//     Resultado = await vdados
//         .then((dados) => {
//             return dados;

//         });

//     res.send(Resultado)

// });


GerentedeRotas(app)
    //app.use('/indicador', routerIndicador());

module.exports = app