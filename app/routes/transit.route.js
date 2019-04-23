module.exports = (app) => {
    const CONTROLLER = require('../controllers/transit.controller');    
    /** 
     *     const {driverID,driver_current_positionID,driver_destination_positionID} = req.body
     */
    app.post('/transit/',CONTROLLER.createTransit );

    // req.params._id: conducteur
    app.get('/transit/:_id',CONTROLLER.findTransit) 

    /**     PUT:Body
     * req.body.status
     * req.body.passagerId
     */
    app.put('/transit/',CONTROLLER.updateWaitingStatus);

    /**     POST:Body
     * req.body.passagerId
     * req.params._id = driverID
     */
    app.post('/transit/passager/add/:_id',CONTROLLER.addPassagerTransit)

    /**     POST:Body
     * req.body.passagerId
     * req.params._id = driverID
     */
    app.post('/transit/passager/del/:_id',CONTROLLER.addPassagerTransit)

    /** Debug route */
    app.get('/transit/getAll',CONTROLLER.getAll) 
}