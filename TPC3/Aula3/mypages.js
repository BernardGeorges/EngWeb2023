exports.genMainPage = function(lista,data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title> About People... </title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Lista de Pessoas</h1>
                </header>
                <div class="w3-container">
                <h1>Lista de Pessoas</h1>
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Sexo</th>
                            <th>Cidade</th>
                            <th>Desportos</th>
                        </tr>            
                `

    for(let i=0; i<lista.length; i++){
        pagHTML += `
        <tr>
            <td>${lista[i].id}</td>
            <td>
                <a href="/pessoas/${lista[i].id}">${lista[i].nome}</a>
            </td>
            <td>${lista[i].idade}</td>
            <td>${lista[i].sexo}</td>
            <td>${lista[i].morada.cidade}</td>
            <td>${lista[i].desportos}</td>
        </tr>
        `
    }

    pagHTML += `           
                </table>
            </div>      
            <footer class="w3-container w3-blue">
                <h5>Generated in EngWeb 2023 ${data}</h5>
            </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

exports.genSexPage = function(lista,data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title> About People... </title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Lista de Pessoas</h1>
                </header>
                <div class="w3-container">
                <h1>Lista dos Sexos</h1>
                    <table class="w3-table-all">
                        <tr>
                            <th>Sexo</th>
                            <th>Quantidade</th>
                        </tr>            
                `
    var dict = {}
    for(let i=0; i<lista.length; i++){
       if(!Object.keys(dict).includes(lista[i].sexo)){
            dict[lista[i].sexo] = 0
       } 
       dict[lista[i].sexo] += 1
    }

    for(const key in dict){
        pagHTML += `
        <tr>
            <td>${key}</td>
            <td>
                <a href="/pessoas/S${key}">${dict[key]}</a>
            </td>
        </tr>
        `
    }

    pagHTML += `           
                </table>
            </div>      
            <footer class="w3-container w3-blue">
                <h5>Generated in EngWeb 2023 ${data}</h5>
            </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

exports.genDesportoPage = function(lista,data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title> About People... </title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Lista de Pessoas</h1>
                </header>
                <div class="w3-container">
                <h1>Lista dos Desportos</h1>
                    <table class="w3-table-all">
                        <tr>
                            <th>Desporto</th>
                            <th>Quantidade</th>
                        </tr>            
                `
    var dict = {}
    for(let i=0; i<lista.length; i++){
        for(let j=0; j<lista[i].desportos.length; j++){
            if(!Object.keys(dict).includes(lista[i].desportos[j])){
            dict[lista[i].desportos[j]] = 0
        } 
        dict[lista[i].desportos[j]] += 1
        }
    }

    for(const key in dict){
        pagHTML += `
        <tr>
            <td>${key}</td>
            <td>
                <a href="/pessoas/D${key}">${dict[key]}</a>
            </td>
        </tr>
        `
    }

    pagHTML += `           
                </table>
            </div>      
            <footer class="w3-container w3-blue">
                <h5>Generated in EngWeb 2023 ${data}</h5>
            </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

exports.genPersonPage = function(lista,data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title> About People... </title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>${lista.nome}</h1>
                </header>
                <div class="container">
                <p><div>Idade: </div> ${lista.idade}</p>
                <p><div class="w3-indigo">Sexo:</div>${lista.sexo}</p>
                <p><div class="w3-indigo">Morada: </div>${lista.morada.cidade}, ${lista.morada.distrito}</p>
                <p><div class="w3-indigo">BI: </div>${lista.BI}</p>
                <p><div class="w3-indigo">Profissao: </div>${lista.profissao}</p>
                <p><div class="w3-indigo">Partido Politico: </div>${lista.partido_politico.party_name}</p>
                <p><div class="w3-indigo">Religião: </div>${lista.religiao}</p>
                <p><div class="w3-indigo">Desportos: </div>${lista.desportos}</p>
                <p><div class="w3-indigo">Animais: </div>${lista.animais}</p>
                <p><div class="w3-indigo">Figura Publica: </div>${lista.figura_publica_pt}</p>
                <p><div class="w3-indigo">Marca do Carro: </div>${lista.marca_carro}</p>
                <p><div class="w3-indigo">Destinos Favoritos: </div>${lista.destinos_favoritos}</p>
                <p><div class="w3-indigo">Atributos: </div>${lista.atributos}</p>
                </div>      
                <footer class="w3-container w3-blue">
                    <h5>Generated in EngWeb 2023 ${data}</h5>
                </footer>
                </div>
            </body>
        </html>         
                `
    return pagHTML
}

exports.genIndexPage = function(data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title> About People... </title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Lista de Conteudos</h1>
                </header>
                <div class="w3-container">
                <h1>Links disponiveis</h1>
                    <table class="w3-table-all">
                        <tr>
                            <td>
                                <a href="/pessoas">Pessoas</a>
                            </td>
                            <td>
                                <a href="/pessoasOrdenadas">Pessoas Ordenado</a>
                            </td>
                            <td>
                                <a href="/pessoasPorSexo">Pessoas por Sexo</a>
                            </td>
                            <td>
                                <a href="/pessoasDesportos">Pessoas por Desporto</a>
                            </td>
                            <td>
                                <a href="/pessoasTop10">Top 10 profissões</a>
                            </td>
                        </tr>           
                </table>
            </div>      
            <footer class="w3-container w3-blue">
                <h5>Generated in EngWeb 2023 ${data}</h5>
            </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

exports.genEspecificDesportoPage = function(lista,desporto,data){
    desportoTrue = decodeURI(desporto)
    dataFiltered = []
    for(let i=0; i<lista.length; i++){
        if(lista[i].desportos.includes(desportoTrue)){
            dataFiltered.push(lista[i])
        } 
    }   
    return this.genMainPage(dataFiltered,data)
}