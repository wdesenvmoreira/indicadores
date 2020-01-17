var buscarDados = require('../controller/controllerDados.js')
var indicadores = require('../controller/controllerExecutar.js')


dadosRota = (app) => {
    app.get('/dados', async(req, res) => {

    })

    app.get('/dados/:chave', async(req, res) => {

        //SQL, Pontos, tipo de dados
        var SQLInd = `SELECT * FROM TBL_INDICADORES WHERE key = ${req.params.chave}`

        // var SQL = await indicadores.localizarIndicadorPorKey(SQLInd)
        var SQL = await indicadores.buscaIndicadores({ "operacao": "chave", "condicao": req.params.chave }, '')


        let vdados = buscarDados.buscarDados(SQL.indicadores[0].sql)

        var Resultado;

        Resultado = await vdados
            .then((dados) => {
                return dados;

            });

        console.log('cabecalho:', SQL.indicadores[0].optionsInd.cabecalho.length)

        let dadosEixo = SQL.indicadores[0].optionsInd.eixoX.split(' ')
        let dadosIndicador = []
        dadosEixo.forEach(newArr => {
            dadosIndicador.push([parseInt(newArr)])
        })

        Resultado.forEach(mes => {

            if (mes.JANEIRO || mes.JANEIRO == 0) {
                dadosIndicador[0].push(mes.JANEIRO)
            }
            if (mes.FEVEREIRO || mes.FEVEREIRO == 0) {
                dadosIndicador[1].push(mes.FEVEREIRO)
            }
            if (mes.MARCO || mes.MARCO == 0) {
                dadosIndicador[2].push(mes.MARCO)
            }
            if (mes.ABRIL || mes.ABRIL == 0) {
                dadosIndicador[3].push(mes.ABRIL)
            }
            if (mes.MAIO || mes.MAIO == 0) {
                dadosIndicador[4].push(mes.MAIO)
            }
            if (mes.JUNHO || mes.JUNHO == 0) {
                dadosIndicador[5].push(mes.JUNHO)
            }
            if (mes.JULHO || mes.JULHO == 0) {
                dadosIndicador[6].push(mes.JULHO)
            }
            if (mes.AGOSTO || mes.AGOSTO == 0) {
                dadosIndicador[7].push(mes.AGOSTO)
            }
            if (mes.SETEMBRO || mes.SETEMBRO == 0) {
                dadosIndicador[8].push(mes.SETEMBRO)
            }
            if (mes.OUTUBRO || mes.OUTUBRO == 0) {
                dadosIndicador[9].push(mes.OUTUBRO)
            }
            if (mes.NOVEMBRO || mes.NOVEMBRO == 0) {
                dadosIndicador[10].push(mes.NOVEMBRO)
            }
            if (mes.DEZEMBRO || mes.DEZEMBRO == 0) {
                dadosIndicador[11].push(mes.DEZEMBRO)
            }
        })

        console.log("dadosIndicador", dadosIndicador)
        res.send(dadosIndicador);
    })

    app.get('/indicadores', async(req, res) => {
        let op = 'Todos'
        let dado = ''
        SQLBuscaInd = { operacao: op, condicao: dado }

        async function fx(v) { return v }
        //console.log('SQLBuscaInd', SQLBuscaInd)
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
        //console.log('SQLBuscaInd', SQLBuscaInd)
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

    app.post('/indicador/novo', (req, res) => {
        if (executeIndicador.incluir(req.body, app)) {
            res.redirect('http://localhost:3000/indicadores')
        } else {
            console.log('Error: ', error, 'Erro ao incluir indicador. ')
        }


    })

    app.get('/listarIndicadores/:condicoes', (req, res) => {
        let dados

        console.log('tipobusca', req.params.condicoes)
        if (req.params.condicoes == 'Todos') {
            dados = dadosIndicadores.allIndicadores()
            console.log('dados', dados)
        }

        res.render('home', { 'dados': dados })
    });



    app.get('/indicadores/:condicoes', async(req, res) => {
        let op = req.params.condicoes.slice(0, 5)
        let dado = req.params.condicoes.slice(5, 9)
        SQLBuscaInd = { operacao: op, condicao: dado }

        async function fx(v) { return v }
        console.log(SQLBuscaInd)
        console.log('parametro', req.params.condicoes)
        let vdados = executeIndicador.buscaIndicadores(SQLBuscaInd, fx, app)

        var Resultado;

        Resultado = await vdados
            .then((dados) => {
                return dados;

            });
        SQLBuscaInd = ''
            //res.send(Resultado)
        console.log('Resultado:', Resultado)
        res.render('painelIndicadores', { 'dados': Resultado })


    });

    app.get('/indicador/localizar', async(req, res) => {
        let op = req.query.tipoBusca
        let dado = req.query.editLocalizar
        SQLBuscaInd = { operacao: op, condicao: dado }
        console.log('body', req.query.tipoBusca)
        async function fx(v) { return v }
        console.log(SQLBuscaInd)

        let vdados = executeIndicador.buscaIndicadores(SQLBuscaInd, fx, app)

        var Resultado;

        Resultado = await vdados
            .then((dados) => {
                return dados;

            });
        SQLBuscaInd = ''
            //res.send(Resultado)
        console.log('Resultado:', Resultado)
        res.render('painelIndicadores', { 'dados': Resultado })


    });

}

module.exports = dadosRota