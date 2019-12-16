var buscarDados = require('../controller/controllerDados.js')
var indicadores = require('../controller/controllerExecutar')


dadosRota = (app) => {
    app.get('/dados', async(req, res) => {

        //SQL, Pontos, tipo de dados

        var SQL = `select
        df.cliente_docfat,
        cliente.razaosocial_pessoa,
        iif( sum(df.vlrliquido_docfat) <> 0, sum(df.vlrliquido_docfat), 0 ) total,
        extract(month from df.dtemissao_docfat) mes,
        extract(year from df.dtemissao_docfat) ano
      from documento_fatura df
      left join pessoa  cliente  on (cliente.codigo_pessoa = df.cliente_docfat)
      where df.dtemissao_docfat between '01/01/2019' and '12/31/2019' and cliente.codigo_pessoa in(1,100,2000) 
        group by 5,4,2,1`

        let vdados = buscarDados.buscarDados(SQL)

        var Resultado;

        Resultado = await vdados
            .then((dados) => {
                return dados;

            });
        console.log('Resultado em rotoas:', Resultado)
        let dadosIndicador = [
            [1],
            [2],
            [3],
            [4],
            [5],
            [6],
            [7],
            [8],
            [9],
            [10],
            [11],
            [12],
        ]

        Resultado.forEach(element => {
            dadosIndicador[element.MES - 1].push(element.TOTAL)

        })


        for (let index = 0; index < dadosIndicador.length; index++) {

            for (let j = 1; j < 4; j++) {
                if (!dadosIndicador[index][j]) {
                    dadosIndicador[index][j] = 0
                }

            }

        }
        console.log('dadosIndicador em rotas:', dadosIndicador)


        res.send(dadosIndicador);
    })

    app.get('/dados/:chave', async(req, res) => {

        //SQL, Pontos, tipo de dados
        var SQLInd = `SELECT SQL FROM TBLINDICADORES WHERE chave = ${req.params.chave}`
        console.log('SQLInd:', SQLInd)
        SQLInd = `select
        df.cliente_docfat,
        cliente.razaosocial_pessoa,
        iif( sum(df.vlrliquido_docfat) <> 0, sum(df.vlrliquido_docfat), 0 ) total,
        extract(month from df.dtemissao_docfat) mes,
        extract(year from df.dtemissao_docfat) ano
      from documento_fatura df
      left join pessoa  cliente  on (cliente.codigo_pessoa = df.cliente_docfat)
      where df.dtemissao_docfat between ''01/01/2019'' and ''12/31/2019'' and cliente.codigo_pessoa in(1,100,2000) 
        group by 5,4,2,1`

        // var SQL = indicadores.localizarIndicadorPorKey(SQLInd)   



        let vdados = buscarDados.buscarDados(SQLInd)

        var Resultado;

        Resultado = await vdados
            .then((dados) => {
                return dados;

            });
        console.log('Resultado em rotoas:', Resultado)
        let dadosIndicador = [
            [1],
            [2],
            [3],
            [4],
            [5],
            [6],
            [7],
            [8],
            [9],
            [10],
            [11],
            [12],
        ]

        Resultado.forEach(element => {
            dadosIndicador[element.MES - 1].push(element.TOTAL)

        })


        for (let index = 0; index < dadosIndicador.length; index++) {

            for (let j = 1; j < 4; j++) {
                if (!dadosIndicador[index][j]) {
                    dadosIndicador[index][j] = 0
                }

            }

        }
        console.log('dadosIndicador em rotas:', dadosIndicador)


        res.send(dadosIndicador);
    })

    // app.get('/indicadores', async(req, res) => {
    //     let op = 'Todos'
    //     let dado = ''
    //     SQLBuscaInd = { operacao: op, condicao: dado }

    //     async function fx(v) { return v }
    //     console.log('SQLBuscaInd', SQLBuscaInd)
    //     let vdados = executeIndicador.buscaIndicadores(SQLBuscaInd, fx)

    //     var Resultado;
    //     //  let ind = Resultado.indicadores
    //     //  console.log('indicadores:', ind)
    //     Resultado = await vdados
    //         .then((dados) => {
    //             return dados;

    //         });
    //     SQLBuscaInd = ''
    //     res.render('painelIndicadores', { 'dados': Resultado })
    // })
    // app.get('/indicadoresapi', async(req, res) => {
    //     let op = 'Todos'
    //     let dado = ''
    //     SQLBuscaInd = { operacao: op, condicao: dado }

    //     async function fx(v) { return v }
    //     console.log('SQLBuscaInd', SQLBuscaInd)
    //     let vdados = executeIndicador.buscaIndicadores(SQLBuscaInd, fx)

    //     var Resultado;
    //     //  let ind = Resultado.indicadores
    //     //  console.log('indicadores:', ind)
    //     Resultado = await vdados
    //         .then((dados) => {
    //             return dados;

    //         });
    //     SQLBuscaInd = ''
    //     res.send(Resultado)
    // })

    // app.post('/indicador/editar', (req, res) => {
    //     function fx(v) { return v }
    //     if (req.body.operacao == 'editar') {
    //         if (executeIndicador.editarIndicador(req.body, app)) {
    //             SQLBuscaInd = 'select * from TBL_INDICADORES where key = ' + req.body.chave
    //             res.redirect('http://localhost:3000/indicadores')
    //         }
    //     } else {
    //         if (req.body.operacao == 'excluir') {
    //             console.log('entrou no excluir:', req.body.chave)
    //             executeIndicador.excluirIndicador(req.body.chave, app)

    //             res.redirect('http://localhost:3000/indicadores')

    //         }

    //     }


    // })

    // app.post('/indicador/novo', (req, res) => {
    //     if (executeIndicador.incluir(req.body, app)) {
    //         res.redirect('http://localhost:3000/indicadores')
    //     } else {
    //         console.log('Error: ', error, 'Erro ao incluir indicador. ')
    //     }


    // })

    // app.get('/listarIndicadores/:condicoes', (req, res) => {
    //     let dados

    //     console.log('tipobusca', req.params.condicoes)
    //     if (req.params.condicoes == 'Todos') {
    //         dados = dadosIndicadores.allIndicadores()
    //         console.log('dados', dados)
    //     }

    //     res.render('home', { 'dados': dados })
    // });



    // app.get('/indicadores/:condicoes', async(req, res) => {
    //     let op = req.params.condicoes.slice(0, 5)
    //     let dado = req.params.condicoes.slice(5, 9)
    //     SQLBuscaInd = { operacao: op, condicao: dado }

    //     async function fx(v) { return v }
    //     console.log(SQLBuscaInd)
    //     console.log('parametro', req.params.condicoes)
    //     let vdados = executeIndicador.buscaIndicadores(SQLBuscaInd, fx, app)

    //     var Resultado;

    //     Resultado = await vdados
    //         .then((dados) => {
    //             return dados;

    //         });
    //     SQLBuscaInd = ''
    //         //res.send(Resultado)
    //     console.log('Resultado:', Resultado)
    //     res.render('painelIndicadores', { 'dados': Resultado })


    // });

    // app.get('/indicador/localizar', async(req, res) => {
    //     let op = req.query.tipoBusca
    //     let dado = req.query.editLocalizar
    //     SQLBuscaInd = { operacao: op, condicao: dado }
    //     console.log('body', req.query.tipoBusca)
    //     async function fx(v) { return v }
    //     console.log(SQLBuscaInd)

    //     let vdados = executeIndicador.buscaIndicadores(SQLBuscaInd, fx, app)

    //     var Resultado;

    //     Resultado = await vdados
    //         .then((dados) => {
    //             return dados;

    //         });
    //     SQLBuscaInd = ''
    //         //res.send(Resultado)
    //     console.log('Resultado:', Resultado)
    //     res.render('painelIndicadores', { 'dados': Resultado })


    // });

}

module.exports = dadosRota