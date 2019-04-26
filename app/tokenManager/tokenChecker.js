const jwt = require('jsonwebtoken')
const tokenConfig = require('./token.config');

 exports.verifyToken = (req,res,next) =>{
    if(!req.headers.authorization){
        return res.status(401).send({message:'Unautorized request'})
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send({message:'Unautorized request'})
    }
    let payload = jwt.verify(token,tokenConfig.secret)
    if(!payload){
        return res.status(401).send({message:'Unautorized request'})
    }
    next()
}