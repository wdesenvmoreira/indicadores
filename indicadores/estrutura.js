//Ponte de parada 
// Criando linhas do container principal, depois será acrescentado cada indicador à ultima linha
//Depois disso será necessário criar a pagina de painel de controle. 
// Depois o arquivo de inicialização. 


const primeDiv = document.getElementById('principalDiv')


// Cria nova div para um novo indicador e retorna  o novoelemento
function novoContainer(wdt, hgt) {
    var dv = document.createElement('div')
    let proxInd = nIndicadores() + 1
    dv.setAttribute('class', 'col quadroIndicador ')
    dv.id = 'ind' + proxInd
    primeDiv.appendChild(dv)
    if (wdt)
        dv.style.width = `${wdt}px`
    if (hgt)
        dv.style.height = `${hgt}px`
    return dv
}

// retorna quantos indicadores o dashbord possui
const nIndicadores = () => {
    const quadroIndicador = document.getElementsByClassName('quadroIndicador')
    return quadroIndicador.length
}

// Inclui a nova div com indicador na linha, caso já tenha 4 indicadores na linha cria uma nova linha com indicador
function incluirDivLinha(dv) {
    let linhasPrincipal = document.getElementsByClassName('linhasPrincipal')
    let nLinhas = linhasPrincipal.length
    let ultimaLinha = linhasPrincipal[nLinhas - 1]
    if (ultimaLinha.children.length < 4) {
        linhasPrincipal[nLinhas - 1].appendChild(dv)
    } else {
        let novaLinha = document.createElement('div')
        novaLinha.setAttribute('class', 'row linhasPrincipal')
        primeDiv.appendChild(novaLinha)
        novaLinha.append(dv)
    }

}

function postarIndicador(indicadorNew, cabecalho, dados, opcoes) {
    var dv = novoContainer();
    incluirDivLinha(dv)
        // indicadoresLinha(cabecalho, dados, opcoes, dv.id)
    indicadorNew(cabecalho, dados, opcoes, dv.id)
}

function conteudoTabela(d) {
    const tabela = document.getElementById('tabela_indicadores')
    let dados = d.indicadores
    dados.forEach(function(campo, indice, arrayCompleta){
        let tr = document.createElement('tr')
        let tdkey = document.createElement('td')
        let tdtitulo = document.createElement('td')
        let tdmodelo = document.createElement('td')
        let tdedit = document.createElement('td')
        let tdexcluir = document.createElement('td')
        tdkey.innerHTML = (campo['key'])
        tdtitulo.innerHTML = (campo.optionsIndLinha.chart['title'])
        tdmodelo.innerHTML = (campo['modelo'])
        tdedit.innerHTML = `<a href=# id=edit${campo['key']}>E</a>`
        tdexcluir.innerHTML= `<a href=#  id=exlui${campo['key']}>X</a>`
        tr.appendChild(tdkey)
        tr.appendChild(tdtitulo)
        tr.appendChild(tdmodelo)
        tr.appendChild(tdedit)
        tr.appendChild(tdexcluir)
        tabela.appendChild(tr)
      });
    
}


async function preencherTabela() {
    limparTabela()
    var campo = await allIndicadores()
    conteudoTabela(campo)
}

function limparTabela() {
    const tabela = document.getElementById('tabela_indicadores')
    var i = tabela.childElementCount - 1
    for (i; tabela.childElementCount > 2; i--) {
        tabela.removeChild(tabela.children[i])

    }
}

preencherTabela()