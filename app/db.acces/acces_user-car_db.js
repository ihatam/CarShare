const USER_CAR = require('../model/user-car.model')
const USER = require('../model/user.model');
const Db_Error = require('../error/db_error');
async function getAllCar(){
    return await USER_CAR.find().then(cars => {
        console.log('returning all USER')
        return cars
    }).catch(err => {
        console.log('Error while fetchng all USER',err)
        return new Db_Error(err,new Error().stack);
    })
}
async function checkregistrationvalidity(registration){
    let registrationFound = false;
    return await USER_CAR.findOne({registration:registration})
    .then(data => {
        if(data !== null){
            registrationFound = true;           
        }
        return registrationFound;
    }).catch(err => {
        return new Db_Error(err,new Error().stack);
    });
}
async function getUserCars(user_id) {
    return await USER_CAR.find({user_id:user_id})
    .then(user_car =>{
        return user_car;
    })
    .catch(err => {
        console.log('err: ', err);
        return new Db_Error(err,new Error().stack)
    });
}
async function updateCarinfo(car_id,body) {
    return USER_CAR.findByIdAndUpdate(car_id,body)
    .then(data =>{
        return data;
    }).catch(err =>{
        return new Db_Error(err,new Error().stack);
    })
}
async function updateUserCarRef(user_id,car_id) {
    //const user = await finduser(user_id);
    const newCar = {car_id:car_id}
    //user.car.push(newCar)
    return USER.findOneAndUpdate(user_id,{$push: {car:newCar}})
    .then(data =>{
        return data;
    }).catch(err =>{
        return new Db_Error(err,new Error().stack);
    })
}
async function finduser(user_id) {
    let userFound = false
    return USER.findById(user_id)
    .then(data =>{
        if(data !== null){
            userFound = true;           
        }
        return userFound;
    }).catch(err =>{
        return new Db_Error(err,new Error().stack);
    })
}
async function findCar(car_id) {
    let carFound = false
    return USER_CAR.findById(car_id)
    .then(data =>{
        if(data !== null){
            carFound = true;           
        }
        return carFound;
    }).catch(err =>{
        return new Db_Error(err,new Error().stack);
    })
}
async function postCar(user_id,body) {
    const {registration} = body;
    const carRegistration = await checkregistrationvalidity(registration);
    if(carRegistration == true){
        let err = new Error();
        err.message = 'The registration number is invalid'
        return new Db_Error(err,new Error().stack);
    }
    if(carRegistration instanceof Db_Error){
        return carRegistration
    }
    const validUser = await finduser(user_id);
    if(validUser == false){
        let err = new Error();
        err.message = 'The USER ID is invalid'
        return new Db_Error(err,new Error().stack);
    }
    if(validUser instanceof Db_Error){
        return validUser
    }
    return await USER_CAR.create(body).then(data => {
        return data;
    }).catch(err => {
        return new Db_Error(err,new Error().stack);
    });
}
module.exports = {
    getAllCar:getAllCar,
    checkregistrationvalidity:checkregistrationvalidity,
    updateCarinfo:updateCarinfo,
    getUserCars:getUserCars,
    postCar:postCar,
    finduser:finduser,
    findCar:findCar,
    updateUserCarRef:updateUserCarRef
}