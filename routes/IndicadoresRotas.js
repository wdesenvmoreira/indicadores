 var executeIndicador = require('../controller/controllerExecutar.js')


 indicadoresRota = (app) => {
     app.get('/', async(req, res) => {
         let op = 'Todos'
         let dado = ''
         SQLBuscaInd = { operacao: op, condicao: dado }

         async function fx(v) { return v }

         let vdados = executeIndicador.buscaIndicadores(SQLBuscaInd, fx)

         var Resultado;

         Resultado = await vdados
             .then((dados) => {
                 return dados;

             });
         SQLBuscaInd = ''
         res.render('home', { 'dados': JSON.stringify(Resultado) })
     })

     app.get('/indicadores', async(req, res) => {
         let op = 'Todos'
         let dado = ''
         SQLBuscaInd = { operacao: op, condicao: dado }

         async function fx(v) { return v }
         console.log('SQLBuscaInd', SQLBuscaInd)
         let vdados = executeIndicador.buscaIndicadores(SQLBuscaInd, fx)

         var Resultado;
         //  let ind = Resultado.indicadores
         //  console.log('indicadores:', ind)
         Resultado = await vdados
             .then((dados) => {
                 return dados;

             });
         SQLBuscaInd = ''
         res.render('painelIndicadores', { 'dados': Resultado })
     })
     app.get('/indicadoresapi', async(req, res) => {
         let op = 'Todos'
         let dado = ''
         SQLBuscaInd = { operacao: op, condicao: dado }

         async function fx(v) { return v }
         console.log('SQLBuscaInd', SQLBuscaInd)
         let vdados = executeIndicador.buscaIndicadores(SQLBuscaInd, fx)

         var Resultado;
         //  let ind = Resultado.indicadores
         //  console.log('indicadores:', ind)
         Resultado = await vdados
             .then((dados) => {
                 return dados;

             });
         SQLBuscaInd = ''
         res.send(Resultado)
     })

     app.post('/indicador/editar', (req, res) => {
         function fx(v) { return v }
         if (req.body.operacao == 'editar') {
             if (executeIndicador.editarIndicador(req.body, app)) {
                 SQLBuscaInd = 'select * from TBL_INDICADORES where key = ' + req.body.chave
                 res.redirect('http://localhost:3000/indicadores')
             }
         } else {
             if (req.body.operacao == 'excluir') {
                 console.log('entrou no excluir:', req.body.chave)
                 executeIndicador.excluirIndicador(req.body.chave, app)

                 res.redirect('http://localhost:3000/indicadores')

             }

         }


     })
 }

 module.exports = indicadoresRota