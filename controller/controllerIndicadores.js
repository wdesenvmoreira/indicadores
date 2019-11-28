        module.exports = function() {
            function indicadoresLinha(cabecalho, dados, opcoes, elemento) {

                google.charts.load('current', { 'packages': ['line'] });
                google.charts.setOnLoadCallback(drawChart);

                function drawChart() {

                    var data = new google.visualization.DataTable();
                    cabecalho.forEach(element => {
                        data.addColumn(element[0], element[1])
                    });


                    data.addRows(dados);

                    var chart = new google.charts.Line(document.getElementById(`${elemento}`));

                    chart.draw(data, google.charts.Line.convertOptions(opcoes));
                }


            }


            function indicadorLinha() {
                google.charts.load('current', { 'packages': ['line'] });
                google.charts.setOnLoadCallback(drawChart);

                async function drawChart() {

                    var data = new google.visualization.DataTable();
                    data.addColumn('number', 'Day');
                    data.addColumn('number', 'Guardians of the Galaxy');
                    data.addColumn('number', 'The Avengers');
                    data.addColumn('number', 'Transformers: Age of Extinction');

                    var d = await dadoslinha()
                    data.addRows(d.dadosIndLinha);

                    var options = {
                        chart: {
                            title: 'Box Office Earnings in First Two Weeks of Opening'
                                // subtitle: 'in millions of dollars (USD)'
                        },
                        width: 400,
                        height: 300
                    };

                    var chart = new google.charts.Line(document.getElementById('indLinha'));

                    chart.draw(data, google.charts.Line.convertOptions(options));
                }


            }

            function indicadorVelocimetro() {
                google.charts.load('current', { 'packages': ['gauge'] });
                google.charts.setOnLoadCallback(drawChart);

                function drawChart() {

                    var data = google.visualization.arrayToDataTable([
                        ['Label', 'Value'],
                        ['Memory', 80]
                        // ['CPU', 55],
                        // ['Network', 68]
                    ]);

                    var options = {
                        width: 400,
                        height: 120,
                        redFrom: 90,
                        redTo: 100,
                        yellowFrom: 75,
                        yellowTo: 90,
                        minorTicks: 5
                    };

                    var chart = new google.visualization.Gauge(document.getElementById('indVelocimetro'));

                    chart.draw(data, options);

                    setInterval(function() {
                        data.setValue(0, 1, 40 + Math.round(60 * Math.random()));
                        chart.draw(data, options);
                    }, 13000);
                    // setInterval(function() {
                    //     data.setValue(1, 1, 40 + Math.round(60 * Math.random()));
                    //     chart.draw(data, options);
                    // }, 5000);
                    // setInterval(function() {
                    //     data.setValue(2, 1, 60 + Math.round(20 * Math.random()));
                    //     chart.draw(data, options);
                    // }, 26000);
                }
            }

            function indicadorPizza() {
                google.charts.load('current', { 'packages': ['corechart'] });
                google.charts.setOnLoadCallback(drawChart);

                function drawChart() {

                    var data = google.visualization.arrayToDataTable([
                        ['Task', 'Hours per Day'],
                        ['Work', 11],
                        ['Eat', 2],
                        ['Commute', 2],
                        ['Watch TV', 2],
                        ['Sleep', 7]
                    ]);

                    var options = {
                        title: 'My Daily Activities'
                    };

                    var chart = new google.visualization.PieChart(document.getElementById('indPizza'));

                    chart.draw(data, options);
                }
            }

            function indicadorBarra() {
                google.charts.load('current', { 'packages': ['bar'] });
                google.charts.setOnLoadCallback(drawChart);

                function drawChart() {
                    var data = google.visualization.arrayToDataTable([
                        ['Year', 'Sales', 'Expenses', 'Profit'],
                        ['2014', 1000, 400, 200],
                        ['2015', 1170, 460, 250],
                        ['2016', 660, 1120, 300],
                        ['2017', 1030, 540, 350]
                    ]);

                    var options = {
                        chart: {
                            title: 'Company Performance',
                            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                        },
                        bars: 'vertical' // Required for Material Bar Charts.
                    };

                    var chart = new google.charts.Bar(document.getElementById('indBarra'));

                    chart.draw(data, google.charts.Bar.convertOptions(options));
                }
            }


            function criarDados() {
                let options = {
                    "modelo": document.getElementById("modeloIndicador").value,
                    "buscarDados": document.getElementById("editDados").value,
                    "optionsInd": {
                        "chart": {
                            "title": document.getElementById("editTitulo").value,
                            "subtitle": document.getElementById("editSubtitulo").value
                        },
                        "width": document.getElementById("editLargura").value,
                        "height": document.getElementById("editAltura").value
                    }
                }
                return options
            }


            function verficarFuncaoIndicador(modeloIndicador) {
                switch (modeloIndicador) {
                    case "linha":
                        return indicadoresLinha
                        break;
                    case "barra":
                        return indicadorBarra
                        break;

                    default:
                        break;
                }
            }


            function verificarFuncaoBuscarDados(nomeFuncao) {
                switch (nomeFuncao) {
                    case "dadoslinha":
                        try {
                            return dadoslinha()
                        } catch (error) {
                            console.log("Erro: ", error, 'Problemas na função VerificarFuncaoBuscarDados')
                        }
                        break;
                    case "indicadorBarra":
                        try {
                            return indicadorBarra()
                        } catch (error) {
                            console.log("Erro: ", error, 'Problemas na função VerificarFuncaoBuscarDados')
                        }
                        break;

                    default:
                        break;
                }
            }

            function localizarIndicador() {
                preencherTabela(oneIndicadores)
            }
        }