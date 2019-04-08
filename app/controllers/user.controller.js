const Db_Error = require('../error/db_error');
const user_acces = require('../db.acces/acces_user_db')
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
        return res.send({user_info:user,token:true});
    }else{
        return res.status(400).send({message:"The password was invalid",err:"pasword invalid"});
    }
}
module.exports.getUser = async (req,res) => {
    if(req.body.email == null || req.body.email == undefined || req.body.token !== true){
        return res.status(400).send({message:"Acces denied token or email invalid",err:"Acces denied token or email invalid"});
    }
    const user = await user_acces.getUser(req.body.email);
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