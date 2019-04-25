const Db_Error = require('../error/db_error');
const transit_acces = require('../db.acces/acces_transit_db')
module.exports.findTransit = async (req, res) => {
    const driverID = req.params._id;
    const transit = await transit_acces.findTransit(driverID);
    if(transit instanceof Db_Error){
        console.log('Error: ', transit.formatError());
        return res.status(400).send(transit.formatError());
    }
    return res.send(transit)
}
module.exports.updateWaitingStatus = async (req, res) => {
    const passagerId = req.body.passagerId
    const status = req.body.status
    const driverID = req.body.driverID
    const updateTransit = await transit_acces.updateWaitingStatus(driverID,passagerId,status,res);
    /*if(updateTransit instanceof Db_Error){
        console.log('Error: ', updateTransit.formatError());
        return res.status(400).send(updateTransit.formatError());
    }
    return res.send(updateTransit)*/
}
module.exports.createTransit = async (req, res) => {
    const {driverID,driver_current_positionID,driver_destination_positionID} = req.body
    const transit = await transit_acces.createTransit(driverID,driver_current_positionID,driver_destination_positionID);
    if(transit instanceof Db_Error){
        console.log('Error: ', transit.formatError());
        return res.status(400).send(transit.formatError());
    }
    return res.send(transit)
}
module.exports.addPassagerTransit = async (req, res) => {
    const passagerId = req.body.passagerId
    const driverID = req.params._id;
    const transit = await transit_acces.addPassagerTransit(driverID,passagerId)
    if(transit instanceof Db_Error){
        console.log('Error: ', transit.formatError());
        return res.status(400).send(transit.formatError());
    }
    return res.send(transit)
}
module.exports.removePassagerTransit = async (req, res) => {
    const passagerId = req.body.passagerId
    const driverID = req.params._id;    
    const transit = await transit_acces.removePassagerTransit(driverID,passagerId)
    if(transit instanceof Db_Error){
        console.log('Error: ', transit.formatError());
        return res.status(400).send(transit.formatError());
    }
    return res.send(transit)
}

module.exports.getAll = async (res,req) =>{
    //const transit = await transit_acces.getAll()
    TRANSIT.find().then(user => {
        console.log('returning all USER')
        res.send(user)
    }).catch(err => {
        console.log('Error while fetchng all USER',err)
        res.status(400).send(err)
    })
  /**  if(transit instanceof Db_Error){
        console.log('Error: ', transit.formatError());
        return res.status(400).send(transit.formatError());
    }
    return res.send(transit)*/
}
