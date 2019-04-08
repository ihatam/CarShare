const Db_Error = require('../error/db_error');
const user_car_acces = require('../db.acces/acces_user-car_db')

module.exports.checkRegistrationvalidity = async (req, res) => {  
    const registrationvalidity = await user_car_acces.checkregistrationvalidity(req.params._registration);
    if(registrationvalidity instanceof Db_Error){
        console.log('Error: ', registrationvalidity);
        return res.status(400).send(registrationvalidity.formatError());
    }
    if(registrationvalidity === true){
        console.log('registrationvalidity: ', registrationvalidity);
        return res.status(400).send({message:"Registration number invalid",value:registrationvalidity});
    }
    console.log('Registration email: ');
    return res.send({message:"Registration email",value:registrationvalidity});
}
module.exports.updateCarInfo = async (req,res)=>{
    const checkCarValidity = await user_car_acces.findCar(req.params._id);
    if(checkCarValidity instanceof Db_Error){
        console.log('Error: ', checkCarValidity);
        return res.status(400).send(checkCarValidity.formatError());
    }
    if(checkCarValidity === false){
        console.log('checkCarValidity: ', checkCarValidity);
        return res.status(400).send({message:"The car does not exist",value:checkCarValidity});
    }
    const updateCar = await user_car_acces.updateCarinfo(req.params._id,req.body)
    if(updateCar instanceof Db_Error){
        console.log('updateCar: ', updateCar);
        return res.status(400).send(updateCar.formatError());
    }
    console.log("updateCarInfo");
    return res.send({message:"Done"})
}
module.exports.getAllCars = async (req,res)=>{
    
    const allCar = await user_car_acces.getAllCar();
    if(allCar instanceof Db_Error){
        return res.status(400).send(allCar.formatError());
    }
    console.log('getAllCars: ',allCar);
    return res.send({message:"Done",allCar}) 
}
module.exports.getUserCars = async (req,res) => {
    
    const userCars = await user_car_acces.getUserCars(req.params.user_id);
    if(userCars instanceof Db_Error){
        return res.status(400).send(userCars.formatError());
    }
    console.log('getUserCars: ',userCars);
    return res.send({message:"Done",userCars})
}
module.exports.createCar = async (req,res) => {
    req.body.user_id = req.params.user_id;
    const newCar = await user_car_acces.postCar(req.params.user_id,req.body);
    if(newCar instanceof Db_Error){
        return res.status(400).send(newCar.formatError());
    }
    const addCarReferenceToUser = await user_car_acces.updateUserCarRef(req.params.user_id,newCar._id)
    if(addCarReferenceToUser instanceof Db_Error){
        return res.status(400).send(addCarReferenceToUser.formatError());
    }
    console.log('createCar: ');
    return res.send({message:"Done",newCar})
}