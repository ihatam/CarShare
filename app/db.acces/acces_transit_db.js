const TRANSIT = require('../model/transit.model')
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
async function updateWaitingStatus(passagerId,status) {
    return await TRANSIT.update({'passager.passagerId': passagerId}, {'$set': {'passager.$.passagerStatus': status}})
    .then(data =>{
        return data;
    }).catch(err =>{
        return new Db_Error(err,new Error().stack);
    })
}
async function createTransit(driverID,driver_current_positionID,driver_destination_positionID) {
    const body = {
        driverID:driverID,
        driver_current_positionID:driver_current_positionID,
        driver_destination_positionID:driver_destination_positionID
    }
    return await TRANSIT.create(body).then(data => {
        return data;
    }).catch(err => {
        return new Db_Error(err,new Error().stack);
    });
}
async function addPassagerTransit(driverID,passagerId) {
    const transit = await findTransit(driverID)
    const newPassager = {passagerId:passagerId,passagerStatus:WAITING_STATUS.WAITING}
    return await TRANSIT.findOneAndUpdate(transit._id,{$push: {passager:newPassager}})
    .then(data =>{
        return data;
    }).catch(err =>{
        return new Db_Error(err,new Error().stack);
    })
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
async function getAll(){
    return await TRANSIT.find().then(tra => {
        return tra 
    }).catch(err => {
        console.log('Error while fetchng all transit',err)
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
