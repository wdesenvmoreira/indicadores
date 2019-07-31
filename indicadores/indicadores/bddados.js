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


async function allIndicadores() {
    // let allInd = await fetch('http://127.0.0.1:8887/indicadores/dadosindicadores2.json')
    let allInd = await fetch('http://localhost:3000/indicadores', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                mode: 'cors'
            }
        })
        .then(response => response.json())
        .then(data => {
            return data // Prints result from `response.json()` in getRequest
        })
        .catch(error => console.error(error))
    return allInd
}

// Teste 
// let xxx = await fetch("http://localhost:3000/indicadores", {
//   method: "POST",
//   headers: [
//     ["Content-Type", "application/json"],
//     ["Content-Type", "text/plain"]
//   ],
//   credentials: "include"

// });