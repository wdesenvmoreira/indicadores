var executeIndicador = require('./controllerExecutar.js')


// module.exports = indicadores = function() {
var allIndicadores = () => {
        async function fx(v) { return v }
        var SQLBuscaInd = { operacao: 'Todos', condicao: '' }
            // console.log('dentro allIndicadores condições:', SQLBuscaInd)
        let vdados = executeIndicador.buscaIndicadores(SQLBuscaInd, fx)
            // console.log('vdados:', vdados)
        var Resultado = async() => {
            return await executeIndicador.buscaIndicadores(SQLBuscaInd, fx)
        }

        vdados
            .then((dados) => {
                return dados;

            });
        // console.log('Resultado: ', Resultado())
    }
    // }
module.exports = { allIndicadores }