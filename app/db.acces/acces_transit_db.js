const TRANSIT = require('../model/transit.model')
const Db_Error = require('../error/db_error');
const WAITING_STATUS = {
    WAITING: 'waiting',
    VALIDATED: 'validated',
    REFUSED: 'refused',
}
async function findTransit(driverID) {
    return await TRANSIT.findOne({driverID:driverID})
    .then(data =>{
        return data;
    }).catch(err =>{
        return new Db_Error(err,new Error().stack);
    })
}
async function updateWaitingStatus(driverID,passagerId,status) {
    var transit = await findTransit(driverID)
    var info
    var pass
    await asyncForEach(transit.passager, async (element) => {
        let passager = element.passagerId;
        if(passager == passagerId){
            pass = passager
            element.passagerStatus = status
            info = element.passagerStatus
        }
    });
    return await TRANSIT.findByIdAndUpdate(transit._id,transit.passager)
    .then(data =>{
        return {
        info:info,
        transit:transit,
        data:data,
        passager:pass
    };
    }).catch(err =>{
        err.name = {"probelamtiq_id":transit._id}
        return new Db_Error(err,new Error().stack);
    })    
    /*return await TRANSIT.update({'passager.passagerId': passagerId},
     {'$set': {'passager.$.passagerStatus': status}})
    .then(data =>{
        return data;
    }).catch(err =>{
        return new Db_Error(err,new Error().stack);
    })*/
}
async function updateTransit(driverID,driver_current_positionID,driver_destination_positionID){
    return await TRANSIT.update({driverID:driverID},
        {driver_current_positionID:driver_current_positionID,driver_destination_positionID:driver_destination_positionID})
        .then(async data => {
            return data;
        }).catch(async err =>{return err})
}
async function createTransit(driverID,driver_current_positionID,driver_destination_positionID) {
    const body = {
        driverID:driverID,
        driver_current_positionID:driver_current_positionID,
        driver_destination_positionID:driver_destination_positionID
    }
    const checkIfUserHasTranSit = await findTransit(driverID);
    if(checkIfUserHasTranSit != null){
        return checkIfUserHasTranSit;
    }else{
        return await TRANSIT.create(body).then(data => {
            return data;
        }).catch(err => {
            return new Db_Error(err,new Error().stack);
        });    
    }
}
async function chekIfTransitHavePassenger(transit,passagerId){
    var isPassager = false;
    if(transit.passager.length <1){
        await asyncForEach(transit.passager, async (element) => {
            let passager = element.passagerId;
            if(passager == passagerId){
                isPassager = true
            }
            driverWithPosition.push(driverUpdate)
        });
        return isPassager
    }else{
        return isPassager
    }
}
async function addPassagerTransit(driverID,passagerId) {
    const transit = await findTransit(driverID)
    const newPassager = {passagerId:passagerId,passagerStatus:WAITING_STATUS.WAITING}
    const isPassager = await chekIfTransitHavePassenger(transit,passagerId)
    if(isPassager){
        return await TRANSIT.findByIdAndUpdate(transit._id,{$push: {passager:newPassager}})
        .then(data =>{
            return data;
        }).catch(err =>{
            err.name = {"probelamtiq_id":transit._id}
            return new Db_Error(err,new Error().stack);
        })    
    }else{
        let dataRandom = {ok:1};
        return dataRandom;
    }
}
async function removePassagerTransit(driverID,passagerId) {
    const transit = await findTransit(driverID)
    return await TRANSIT.update({_id:transit._id},{"$pull":{"passager":{"passagerId":passagerId}}},{safe: true,multi:true})
    .then(data =>{
        return data;
    }).catch(err =>{
        return new Db_Error(err,new Error().stack);
    })
}
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}
async function getAll(){
    return await TRANSIT.find().then(user => {
        console.log('returning all USER')
        return user
    }).catch(err => {
        console.log('Error while fetchng all USER',err)
        return new Db_Error(err,new Error().stack);
    })
}
module.exports = {
    findTransit:findTransit,
    updateWaitingStatus:updateWaitingStatus,
    createTransit:createTransit,
    addPassagerTransit:addPassagerTransit,
    removePassagerTransit:removePassagerTransit,
    getAll:getAll
}
