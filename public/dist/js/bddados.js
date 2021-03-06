async function dadoslinha(chave) {
    // let allInd = await fetch('/dist/js/dados.json')
    let urlDados = 'http://localhost:3000/dados/' + chave
    let allInd = await fetch(urlDados)
        .then(response => response.json())
        .then(data => {
            return data // Prints result from `response.json()` in getRequest
        })
        .catch(error => console.error(error))
    return allInd
}

async function dadosIndicadores() {
    var urlx = 'http://localhost:3000/indicadoresapi'
    return fetch(urlx)
        .then(res => res.json())
        .then(json => { return json })
}


async function allIndicadores() {
    let allInd = await fetch('http://localhost:3000/indicadoresapi', {
            method: 'GET',
            headers: {
                "Accept": 'application/json',
                "mode": 'cors',
                "Content-Type": "application/json",
                "Content-Type": "text/plain"
            },
            // credentials: "include",
            withCredentials: false
        })
        .then(response => response.json())
        .then(data => {
            return data // Prints result from `response.json()` in getRequest
        })
        .catch(error => console.error(error))
    return allInd
}

async function oneIndicadores() {
    let dadoBusca = document.getElementById('editLocalizar').value
    let tipoBusca = document.getElementById('tipoBusca').value
    let condicao = tipoBusca + dadoBusca

    let allInd = await fetch(`http://localhost:3000/indicadores/${condicao}`, {
            method: 'GET',
            headers: {
                "Accept": 'application/json',
                "mode": 'cors',
                "Content-Type": "application/json",
                "Content-Type": "text/plain"
            },
            // credentials: "include",
            withCredentials: false
        })
        .then(response => response.json())
        .then(data => {
            return data // Prints result from `response.json()` in getRequest
        })
        .catch(error => console.error(error))
    return allInd
}