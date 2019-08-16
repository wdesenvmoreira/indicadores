const novoInd = document.getElementById('btNovoInd')

novoInd.addEventListener('click', () => {
   postarInd()
})

async function postarInd(){
    var dados = await allIndicadores()
    var dadoIndicadores= dados.indicadores
    dadoIndicadores.forEach(async function(campo, indice, arrayCompleta){
        var funcaoDados = verficarFuncao(campo.funcaodados)
        let funcaoBuscaDados = await verificarFuncaoBuscarDados(campo.buscarDados)
        var  dadosInd = funcaoBuscaDados.dadosIndLinha
        postarIndicador(funcaoDados,campo.cabecalhoIndLinha, dadosInd, campo.optionsIndLinha)
    })
}
