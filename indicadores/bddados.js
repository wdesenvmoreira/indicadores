
 async function dadoslinha() {
    let allInd = await fetch('http://127.0.0.1:8887/indicadores/dados.json')
        .then(response => response.json())
        .then(data => {
            return data // Prints result from `response.json()` in getRequest
        })
        .catch(error => console.error(error))
    return allInd
}

 async function dadosIndicadores() {
     var urlx = 'http://127.0.0.1:8887/indicadores/dadosindicadores2.json'
     return fetch(urlx)
         .then(res => res.json())
         .then(json => { return json })
 }

 function verficarFuncao(idfuncao) {
     switch (idfuncao) {
         case 1:
             return indicadoresLinha
             break;
        case 2:
            return indicadoresBarra
            break;

         default:
             break;
     }
 }

 async function allIndicadores() {
    let allInd = await fetch('http://127.0.0.1:8887/indicadores/dadosindicadores2.json')
        .then(response => response.json())
        .then(data => {
            return data // Prints result from `response.json()` in getRequest
        })
        .catch(error => console.error(error))
    return allInd
}