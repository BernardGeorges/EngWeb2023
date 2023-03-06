var http = require('http')
var axios = require('axios')
var mypages = require('./mypages')
var fs = require('fs')

http.createServer(function(req,res){
    var d = new Date().toISOString().substring(0,16)
    console.log(req.method + " " + req.url + " " + d)
    if(req.url == "/"){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.end(mypages.genIndexPage(d))
    }else if(req.url == '/pessoas'){
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){
                var pessoas = resp.data 
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genMainPage(pessoas, d))
            }).catch(erro => {
                console.log("ERRO: " + erro)
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p> Erro na obtenção de dados: ' + erro + '</p>')
            })
    }else if(req.url == '/pessoasOrdenadas'){
        axios.get('http://localhost:3000/pessoas?_sort=nome')
            .then(function(resp){
                var pessoas = resp.data 
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genMainPage(pessoas, d))
            }).catch(erro => {
                console.log("ERRO: " + erro)
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p> Erro na obtenção de dados: ' + erro + '</p>')
            })}
    else if(req.url == '/pessoasPorSexo'){
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data 
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end(mypages.genSexPage(pessoas, d))
        }).catch(erro => {
            console.log("ERRO: " + erro)
            res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
            res.end('<p> Erro na obtenção de dados: ' + erro + '</p>')
        })}
    else if(req.url == '/pessoasDesportos'){
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data 
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end(mypages.genDesportoPage(pessoas, d))
        }).catch(erro => {
            console.log("ERRO: " + erro)
            res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
            res.end('<p> Erro na obtenção de dados: ' + erro + '</p>')
        })
    }
    else if(req.url.match(/w3\.css$/)){
        fs.readFile("w3.css", function(erro,data){
            if(erro){
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p> Ficheiro não encontrado: ' + erro + '</p>')        
            }else{
                res.writeHead(200, {'Content-Type': 'text/css'})
                res.end(data)
            }
        })
    } else if(req.url.match(/\/pessoas\/p\d+/)){
        axios.get('http://localhost:3000/pessoas/' + req.url.substring(9))
            .then(function(resp){
                var pessoa = resp.data 
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genPersonPage(pessoa, d))
            }).catch(erro => {
                console.log("ERRO: " + erro)
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p> Erro na obtenção de dados: ' + erro + '</p>')
            })
    }else if(req.url.match(/\/pessoas\/S\w+/)){
        axios.get('http://localhost:3000/pessoas?sexo=' + req.url.substring(10))
            .then(function(resp){
                var pessoas = resp.data 
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genMainPage(pessoas, d))
            }).catch(erro => {
                console.log("ERRO: " + erro)
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p> Erro na obtenção de dados: ' + erro + '</p>')
            })
    }else if(req.url.match(/\/pessoas\/D\w+/)){
        axios.get('http://localhost:3000/pessoas/')
            .then(function(resp){
                var pessoas = resp.data 
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genEspecificDesportoPage(pessoas, req.url.substring(10),d))
            }).catch(erro => {
                console.log("ERRO: " + erro)
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p> Erro na obtenção de dados: ' + erro + '</p>')
            })
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
        res.end('<p> Operação não suportada: ' + req.url + '</p>')
    }
}).listen(7777);

console.log("Servidor á escuta na porta 7777")