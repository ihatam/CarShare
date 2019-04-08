const USER = require('../model/user.model');
const Db_Error = require('../error/db_error');
const POSITION = require('../model/position.model');
async function createPosition(userId){
    const position = {
            lat: 0,
            lng: 0,
            userId:userId
    }
    const userPosition = await checkIfUserHasPosition(userId);
    if(userPosition.validation == true){
        return userPosition.pos;
    }
    return await POSITION.create(position).then(data => {
        return data;
    }).catch(err => {
        return new Db_Error(err,new Error().stack);
    });
}
async function checkIfUserHasPosition(userId){
    return await POSITION.findOne({userId:userId})
    .then(position =>{
        if(position !== null){
            return {pos:position,
                validation:true};
        }else{
            return {validation:false};
        }
    })
    .catch(err => {
        return new Db_Error(err,new Error().stack);
    });
}
async function findUserByIdAndUpdatePositionReference(userId,userPos) {
    return USER.findByIdAndUpdate(userId,{position:userPos._id})
    .then(data =>{
        return data;
    }).catch(err =>{
        return new Db_Error(err,new Error().stack);
    })
}
async function emailCheck(email){
    let userFound = false;
    return await USER.findOne({email:email})
    .then(data => {
        if(data !== null){
            userFound = true;           
        }
        return userFound;
    }).catch(err => {
        return new Db_Error(err,new Error().stack);
    });
}
async function getAllUser(){
    return await USER.find().then(user => {
        console.log('returning all USER')
        return user
    }).catch(err => {
        console.log('Error while fetchng all USER',err)
        return new Db_Error(err,new Error().stack);
    })
}
async function createUserWithPosition(body) {
    return USER.create(body).then(async data => {
        const userPos = await createPosition(data._id);
        if(userPos instanceof Db_Error){
            return userPos;
        }
        const updatePosRef = await findUserByIdAndUpdatePositionReference(data._id,userPos);
        return updatePosRef;
    }).catch(err => {
       return new Db_Error(err,new Error().stack);
    }); 
}
async function getUser(email) {
    return await USER.findOne({email:email})
    .then(user =>{
        return user;
    })
    .catch(err => {
        console.log('err: ', err);
        return new Db_Error(err,new Error().stack)
    });
}
module.exports = {
    createUserWithPosition:createUserWithPosition,
    emailCheck:emailCheck,
    getAllUser:getAllUser,
    getUser:getUser
}