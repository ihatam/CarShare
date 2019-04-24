const Db_Error = require('../error/db_error');
const user_acces = require('../db.acces/acces_user_db')
const jwt = require('jsonwebtoken')
const tokenConfig = require('../tokenManager/token.config')
module.exports.verifyEmail = async (req, res) => {
    const checkEmailAvailability = await user_acces.emailCheck(req.body.email);
    if(checkEmailAvailability instanceof Db_Error){
        console.log('Error: ', checkEmailAvailability);
        return res.status(400).send(checkEmailAvailability.formatError());
    }
    if(checkEmailAvailability === true){
        return res.status(400).send({message:"Email already exist",value:checkEmailAvailability});
    }
    return res.send({message:"Valid email",value:checkEmailAvailability});
}
module.exports.updateDriverStatus = async (req, res) => {
    const userId = req.params._id;
    const userStatus = req.body.isDriver;
    const updateUser = await user_acces.findUserByIdAndUpdateDriverStatus(userId,userStatus);
    if(updateUser instanceof Db_Error){
        console.log('Error: ', updateUser.formatError());
        return res.status(400).send(updateUser.formatError());
    }
    return res.send(updateUser)
}
module.exports.createUser = async (req,res) => {
    const { family_name, name, phone, email, password } = req.body
    const checkEmailAvailability = await user_acces.emailCheck(req.body.email);
    if(checkEmailAvailability instanceof Db_Error){
        console.log('Error: ', checkEmailAvailability);
        return res.status(400).send(checkEmailAvailability.formatError());
    }
    if(checkEmailAvailability === true){
        return res.status(400).send({message:"Email already exist",err:"Email already exist"});
    }
    let createUserWithPosition;
    if(family_name && name && phone && email && password){
        createUserWithPosition = await user_acces.createUserWithPosition(req.body);
    }else{
        return res.status(400).send({message:"Invalid data format",err:"Invalid data format"});
    }
    if(createUserWithPosition instanceof Db_Error){
        console.log('Error: ', createUserWithPosition.formatError());
        return res.status(400).send(createUserWithPosition.formatError());
    }
    return res.send({message:"Done"})
}
module.exports.login = async (req,res) => {
    const {email, password } = req.body;
    if(!email || !password){
        return res.status(400).send({message:"Invalid data",err:"email or password mot defined"});
    }
    const user = await user_acces.getUser(req.body.email);
    if(user instanceof Db_Error){
        return res.status(400).send(user.formatError());
    }
    if(user.password == req.body.password){
        let payload ={subject:user._id}
        let token = jwt.sign(payload,tokenConfig.secret)
        let tokenWithBearer = `Bearer ${token}`;
        return res.send({user_info:user,authorization:tokenWithBearer});
    }else{
        return res.status(400).send({message:"The password was invalid",err:"pasword invalid"});
    }
}
module.exports.getUser = async (req,res) => {
    if(req.body.email == null || req.body.email == undefined){
        return res.status(400).send({message:"Acces denied token or email invalid",err:"Acces denied token or email invalid"});
    }
    const user = await user_acces.getUser(req.body.email);
    if(user instanceof Db_Error){
        return res.status(400).send(user.formatError());
    }
    return res.send({user_info:user});
}
module.exports.getUserById = async (req,res) => {
    if(req.params._id == null || req.params._id == undefined){
        return res.status(400).send({message:"invalidId",err:""});
    }
    const user = await user_acces.getUserById(req.params._id);
    if(user instanceof Db_Error){
        return res.status(400).send(user.formatError());
    }
    return res.send({user_info:user});
}

module.exports.getAll = async (req,res) => {
    const allUser = await user_acces.getAllUser();
    if(allUser instanceof Db_Error){
        return res.status(400).send(allUser.formatError());
    }
    return res.send(allUser)
}