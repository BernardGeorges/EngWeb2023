var http = require('http')
var fs = require('fs')
var url = require('url')

http.createServer(function(req,res){
    var pedido = url.parse(req.url, true).pathname.substring(1)
    var d = new Date().toISOString().substring(0,16)
    console.log(req.method + " " + req.url + " " + d)
    if (pedido == ""){
        fs.readFile('index.html', function(err,data) {
            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
            if(err){
                res.write("Erro na leitura do ficheiro: " + err)
            }else{
                res.write(data)
            }
            res.end()
        })
    }else{
        fs.readFile(pedido, function(err,data) {
        res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
        if(err){
            res.write("Erro na leitura do ficheiro: " + err)
        }else{
            res.write(data)
        }
        res.end()
    })
    }
}).listen(7777);

console.log("Servidor á escuta na porta 7777")