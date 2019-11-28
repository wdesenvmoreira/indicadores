 var executeIndicador = require('../controller/controllerExecutar.js')


 indicadoresRota = (app) => {
     app.get('/', async(req, res) => {
         let op = 'Todos'
         let dado = ''
         SQLBuscaInd = { operacao: op, condicao: dado }

         async function fx(v) { return v }

         let vdados = executeIndicador.buscaIndicadores(SQLBuscaInd, fx, app)

         var Resultado;

         Resultado = await vdados
             .then((dados) => {
                 return dados;

             });
         SQLBuscaInd = ''
         res.render('home', { 'dados': JSON.stringify(Resultado) })
     })
 }

 module.exports = indicadoresRota