var model = require('models')

module.exports.list = () =>{
    return model.find({},{"nome":1,"data":1,"resultado":1})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.getExame = id =>{
    return model.findOne({_id:id})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.modalidades = () =>{
    return model.distinct("modalidade")
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.examesOK = () =>{
    return model.find({"resultado":true})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.exameModalidade = (modalidade) =>{
    return model.find({"modalidade":modalidade})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}


module.exports.atletasGenero = (genero) =>{
    return model.find({"género":genero},{"nome":1,"_id":0}).sort("nome.primeiro nome.segundo")
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.atletasClube = (clube) =>{
    return model.find({"clube":clube},{"nome":1,"_id":0}).sort("nome.primeiro nome.segundo")
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}