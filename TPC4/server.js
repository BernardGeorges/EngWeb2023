var http = require('http')
var axios = require('axios')
var templates = require('./templates')
var static = require('./static.js')
const { parse } = require('querystring');
const { info } = require('console');

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var alunosServer = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET --------------------------------------------------------------------
                if((req.url == "/")){
                    axios.get("http://localhost:3000/id")
                        .then(resp => {
                            axios.get("http://localhost:3000/tasks")
                            .then(response => {
                                var task = response.data
                                // Render page with the student's list
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write(templates.createDiv(resp.data[0])+templates.defaultEdit()+templates.tasks(task)+templates.footer(d))
                                res.end()
                            })
                            .catch(function(erro){
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Não foi possível obter a lista de alunos... Erro: " + erro)
                                res.end()
                            })
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de alunos... Erro: " + erro)
                            res.end()
                        })
                }
                // GET //complete/${toDo[i].id} --------------------------------------------------------------------
                else if(/\/complete\/[0-9]+$/i.test(req.url)){
                    var id = req.url.split("/")[2]
                    axios.get("http://localhost:3000/tasks/" + id)
                        .then(response => {
                            console.log(response.data)
                            var nova = response.data
                            nova["done"] = 1
                            axios.put('http://localhost:3000/tasks/' + id, nova)
                            .then(resp => {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("Concluido a tarefa")
                                res.end()
                            }).catch(error => {
                                console.log('Erro: ' + error);
                            })
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de alunos... Erro: " + erro)
                            res.end()
                        })
                }
                // GET /edit/:type/:id --------------------------------------------------------------------
                else if(/\/edit\/\w+\/[0-9]+$/i.test(req.url)){
                    // Get aluno record
                    var type = req.url.split("/")[2]
                    var id = req.url.split("/")[3]
                    axios.get('http://localhost:3000/'+type+'/' + id)
                    .then(function(resp){
                        var aluno = resp.data
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.end(templates.studentFormEditPage(aluno,d))
                    })
                    .catch(erro => {
                        console.log("Erro: " + erro)
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.end(templates.errorPage(erro,d))
                    })
                }
                // GET /alunos/delete/:id --------------------------------------------------------------------
                else if(/\/alunos\/delete\/(A|PG)[0-9]+$/i.test(req.url)){
                    var idAluno = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/alunos/'+idAluno)
                    .then(resp => {
                        console.log("Delete "+ idAluno + " :: " +resp.status);
                        res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                        res.end('<p>Registo apagado:'+ idAluno +'</p>')
                    }).catch(error => {
                        console.log('Erro: ' + error);
                        res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                        res.end(templates.errorPage("Unable to delete record...",d))
                    })
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " unsupported on this server.</p>")
                    res.end()
                }
                break
            case "POST":
                if(req.url == '/'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post('http://localhost:3000/tasks', result)
                            .then(resp => {
                                axios.get('http://localhost:3000/id')
                                .then(function(resp){
                                    var id = resp.data
                                    id[0]["value"]++
                                    axios.put('http://localhost:3000/id/'+id[0]["id"], id[0])
                                    .then(resp => {
                                        console.log(resp.data);
                                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                        res.end(templates.createDiv(data["id"])+templates.defaultEdit()+templates.tasks(data["to_do"],data["done"])+templates.footer(d))
                                    }).catch(error => {
                                        console.log('Erro: ' + error);
                                        res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                        res.end("Unable to insert Id...")
                                    });
                                })
                                .catch(erro => {
                                    console.log("Erro: " + erro)
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end("Unable to get Id...")
                                })
                            }).catch(error => {
                                console.log('Erro: ' + error);
                                res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Unable to insert task...</p>")
                                res.end()
                            });
                            
                        } else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                }
                else if(/\/edit\/\w+\/[0-9]+$/i.test(req.url)){
                    collectRequestBodyData(req, result => {
                        if(result){
                            console.dir(result)
                            axios.put('http://localhost:3000/'+ req.url.split("/")[2] +'/'+ result.id, result)
                            .then(resp => {
                                console.log(resp.data);
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                // res.write(studentFormPage(d))
                                res.end('<p>Registo alterado:'+ JSON.stringify(resp.data) +'</p>')
                            }).catch(error => {
                                console.log('Erro: ' + error);
                                res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                res.end(templates.errorPage("Unable to insert record...",d))
                            });
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write('<p>Unsupported POST request: ' + req.url + '</p>')
                    res.write('<p><a href="/">Return</a></p>')
                    res.end()
                }
                break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
    
})

alunosServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})