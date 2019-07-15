const novoInd = document.getElementById('btNovoInd')

novoInd.addEventListener('click', () => {
   postarInd()
})

// async function postarInd2(){
//     var dadoIndicadores = await allIndicadores()
//     var dLinha = await dadoslinha()
//     var funcaoDados = verficarFuncao(dadoIndicadores.funcaodados)
//     postarIndicador(funcaoDados,dadoIndicadores.cabecalhoIndLinha, dLinha.dadosIndLinha, dadoIndicadores.optionsIndLinha)
   
// }
async function postarInd(){
    var dados = await allIndicadores()
    var dadoIndicadores= dados.indicadores
    var dLinha = await dadoslinha()
    dadoIndicadores.forEach(function(campo, indice, arrayCompleta){
        
        var funcaoDados = verficarFuncao(campo.funcaodados)
        postarIndicador(funcaoDados,campo.cabecalhoIndLinha, dLinha.dadosIndLinha, campo.optionsIndLinha)
  
    })
 
}
