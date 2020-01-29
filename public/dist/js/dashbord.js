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
            //Pelo modelo verifica qual função para plotar indicador irá usar. 
            var funcaoIndicador = verficarFuncaoIndicador(campo.modelo)
                // No indicador verifica qual função de buscar os dados. Em indicadores.js
            let funcaoBuscaDados = await verificarFuncaoBuscarDados(campo.buscarDados, campo.key)
                // var dadosInd = funcaoBuscaDados.dadosIndLinha
            var dadosInd = funcaoBuscaDados
                // var cabecalho = funcaoBuscaDados.cabecalho
            console.log('dados:', dadosInd)
            var cabecalho = campo.optionsInd.cabecalho
                //  var caQuebrado = cabecalho.split(";")
                // console.log(caQuebrado)
            postarIndicador(funcaoIndicador, cabecalho, dadosInd, campo.optionsInd)
        })
    } catch (error) {
        console.log('Erro:', error, 'Erro em: funcao postarInd - indicadores/dashbord.js')
    }

}