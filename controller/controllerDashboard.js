var ctrlindicador = require('./controllerIndicadores.js')
const novoInd = document.getElementById('btNovoInd')

novoInd.addEventListener('click', () => {
    postarInd()
})
var indicadores = new ctrlindicador()

async function postarInd() {
    // var dados = await allIndicadores('todos')
    var dados = await allIndicadores()
    var dadoIndicadores = dados.indicadores
    try {
        dadoIndicadores.forEach(async function(campo, indice, arrayCompleta) {
            var funcaoDados = indicadores.verficarFuncaoIndicador(campo.modelo)
            let funcaoBuscaDados = await indicadores.verificarFuncaoBuscarDados(campo.buscarDados)
            var dadosInd = funcaoBuscaDados.dadosIndLinha
            var cabecalho = funcaoBuscaDados.cabecalho
            indicadores.postarIndicador(funcaoDados, cabecalho, dadosInd, campo.optionsInd)
        })
    } catch (error) {
        console.log('Erro:', error, 'Erro em: funcao postarInd - indicadores/dashbord.js')
    }

}

module.exports = { postarInd }