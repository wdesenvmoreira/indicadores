const novoInd = document.getElementById('btNovoInd')

novoInd.addEventListener('click', () => {
   postarInd()
})

async function postarInd(){
    var dados = await allIndicadores()
    var dadoIndicadores= dados.indicadores
    dadoIndicadores.forEach(async function(campo, indice, arrayCompleta){
        var funcaoDados = verficarFuncaoIndicador(campo.modelo)
        let funcaoBuscaDados = await verificarFuncaoBuscarDados(campo.buscarDados)
        var  dadosInd = funcaoBuscaDados.dadosIndLinha
        var cabecalho = funcaoBuscaDados.cabecalho
        postarIndicador(funcaoDados,cabecalho, dadosInd, campo.optionsInd)
    })
}
