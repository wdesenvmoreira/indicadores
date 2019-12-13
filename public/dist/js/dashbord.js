const novoInd = document.getElementById('btNovoInd')

novoInd.addEventListener('click', () => {

    postarInd()
})

async function postarInd() {
    // var dados = await allIndicadores('todos')
    var dados = await allIndicadores()
    var dadoIndicadores = dados.indicadores
    try {
        dadoIndicadores.forEach(async function(campo) {
            var funcaoDados = verficarFuncaoIndicador(campo.modelo)
            let funcaoBuscaDados = await verificarFuncaoBuscarDados(campo.buscarDados)
                // var dadosInd = funcaoBuscaDados.dadosIndLinha
            var dadosInd = funcaoBuscaDados
                // var cabecalho = funcaoBuscaDados.cabecalho
            console.log('dados:', dadosInd)
            var cabecalho = campo.optionsInd.cabecalho
            postarIndicador(funcaoDados, cabecalho, dadosInd, campo.optionsInd)
        })
    } catch (error) {
        console.log('Erro:', error, 'Erro em: funcao postarInd - indicadores/dashbord.js')
    }

}