//Ponte de parada 
// Criando linhas do container principal, depois será acrescentado cada indicador à ultima linha
//Depois disso será necessário criar a pagina de painel de controle. 
// Depois o arquivo de inicialização. 
//let todosDados

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
    try {
        indicadorNew(cabecalho, dados, opcoes, dv.id)
    } catch (error) {
        console.log('Erro: ', error, ' - Problemas na funcão indicadorNew')
    }

}

function conteudoTabela(d) {
    const tabela = document.getElementById('tabela_indicadores')
    let dados = d.indicadores
    dados.forEach(function(campo, indice, arrayCompleta) {
        let tr = document.createElement('tr')
        let tdkey = document.createElement('td')
        let tdtitulo = document.createElement('td')
        let tddescricao = document.createElement('td')
        let tdmodelo = document.createElement('td')
        let tdedit = document.createElement('td')
        let tdexcluir = document.createElement('td')
        tdkey.innerHTML = (campo['key'])
        tdtitulo.innerHTML = (campo.optionsInd.chart['title'])
        tddescricao.innerHTML = (campo['DESC_INDICADOR'])
        tdmodelo.innerHTML = (campo['modelo'])
        tdedit.innerHTML = `<a href="#" onclick="editarIndicador(${campo['key']})"   id=edit${campo['key']}  data-toggle="modal" data-target="#ModalEditarIndicador">E</a>`
        tdexcluir.innerHTML = `<a href="#" onclick="excluirIndicador(${campo['key']})"  id=exlui${campo['key']}>X</a>`
        tr.appendChild(tdkey)
        tr.appendChild(tdtitulo)
        tr.appendChild(tddescricao)
        tr.appendChild(tdmodelo)
        tr.appendChild(tdedit)
        tr.appendChild(tdexcluir)
        tabela.appendChild(tr)
    });

}


async function preencherTabela(funcaoBusca) {
    limparTabela()
    try {
        var campo = await funcaoBusca()
        console.log('campo preencher tabela. :', campo)
        conteudoTabela(campo)
        todosDados = campo
    } catch (error) {
        console.log('Erro: ', error, '- Problemas na função preencherTabela')
    }

}

function limparTabela() {
    let tabela = document.getElementById('tabela_indicadores')
    var i = tabela.childElementCount - 1
    for (i; tabela.childElementCount > 2; i--) {
        tabela.removeChild(tabela.children[i])

    }
}

async function editarIndicador(chaveEdicao) {
    let dados = await allIndicadores()
    console.log('dados:', dados.indicadores, chaveEdicao)
    try {
        dados.indicadores.forEach(function(campo, indice, arrayCompleta) {
            if (campo['key'] == chaveEdicao) {
                let formIndicador = document.getElementById('formEditarIndicador')
                formIndicador.reset();
                document.getElementById('btSalvarEdicao').setAttribute('onclick', `salvarEdicao(${chaveEdicao})`)
                let modeloIndicador = document.getElementById('editarModeloIndicador')
                let editDescInd = document.getElementById('editarDescInd')
                let editTitulo = document.getElementById('editarTitulo')
                let editSubtitulo = document.getElementById('editarSubtitulo')
                let editLargura = document.getElementById('editarLargura')
                let editAltura = document.getElementById('editarAltura')
                let editCabecalho = document.getElementById('editarCabecalho')
                let editDados = document.getElementById('editarDados')
                let editsql = document.getElementById('editarsql')
                let chave = document.getElementById('chave')
                let chaveIndicadora = document.getElementById('chaveIndicadora')

                modeloIndicador.value = campo['modelo']
                editDescInd.value = campo['DESC_INDICADOR']
                editTitulo.value = campo['optionsInd'].chart.title
                editSubtitulo.value = campo['optionsInd'].chart.subtitle
                editAltura.value = campo['optionsInd'].height
                editLargura.value = campo['optionsInd'].width
                let cabecaclhoConteudo = ''
                campo['optionsInd'].cabecalho.forEach((conteudo) => {
                    if (typeof(cabecaclhoConteudo) == 'undefined' || cabecaclhoConteudo == '') {
                        cabecaclhoConteudo = conteudo[1];
                    } else {
                        cabecaclhoConteudo = cabecaclhoConteudo + ' ' + conteudo[1]

                    }
                })
                editCabecalho.value = cabecaclhoConteudo
                editDados.value = campo['buscarDados']
                editsql.value = campo['sql']
                chave.value = campo['key']
                chaveIndicadora.innerHTML = ' ' + campo['key']
            }
        });
    } catch (error) {
        console.log('Erro: ', error, '- Problemas na função editarIndicador')
    }



}

function salvarEdicao() {
    let operacao = document.getElementById('operacao')

    operacao.setAttribute('value', `editar`)
    let formIndicador = document.getElementById('formEditarIndicador')
    formIndicador.submit().then(document.location.reload(true))
}

function excluirIndicador(chave) {
    let key = document.getElementById('chave')
    key.value = chave
    let formEditarIndicador = document.getElementById('formEditarIndicador')
    let operacao = document.getElementById('operacao')
    formIndicador.method = 'POST'
    operacao.setAttribute('value', `excluir`)
    formEditarIndicador.submit().then(document.location.reload())
}