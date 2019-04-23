const WAITING_LIST = require('../model/waitingList.model')

async function findWaitingList(driverID,passagerID) {
    return await TRANSIT.findOne({driverID:driverID,passagerID:passagerID})
    .then(data =>{
        return data;
    }).catch(err =>{
        return new Db_Error(err,new Error().stack);
    })
}
async function updateWaitingList(driverID,passagerID,drivers_response) {
    const status = await findWaitingList(driverID,passagerID)
    return await TRANSIT.findByIdAndUpdate(status._id, {drivers_response:drivers_response}, {new: true})
    .then(data =>{
        return data;
    }).catch(err =>{
        return new Db_Error(err,new Error().stack);
    })
}
async function createWaitingList(driverID,passagerID) {
    const body = {
        driverID:driverID,passagerID,
        passagerID:driverID,passagerID,
        drivers_response:"waiting"
    }
    return await TRANSIT.create(body).then(data => {
        return data;
    }).catch(err => {
        return new Db_Error(err,new Error().stack);
    });
}
async function deleteWaitingList(driverID,passagerID) {
    return await TRANSIT.deleteOne({driverID:driverID,passagerID:passagerID})
    .then(data =>{
        return data;
    }).catch(err =>{
        return new Db_Error(err,new Error().stack);
    })
}

module.exports = {
    findWaitingList:findWaitingList,
    updateWaitingList:updateWaitingList,
    createWaitingList:createWaitingList,
    deleteWaitingList:deleteWaitingList
}