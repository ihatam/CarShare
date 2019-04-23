module.exports = (app) => {
    const CONTROLLER = require('../controllers/transit.controller');    
    /**         POST:Body
     * 
     *      driverID,
     *      driver_current_positionID,
     *      driver_destination_positionID
     * 
     */
    app.post('/transit/add',CONTROLLER.createTransit );

    // req.params._id: conducteur
    app.get('/transit/get/:_id',CONTROLLER.findTransit) 

    /**     PUT:Body
     * req.body.status
     * req.body.passagerId    
     */
    app.put('/transit/status',CONTROLLER.updateWaitingStatus);

    /**     POST:Body
     * req.body.passagerId
     * req.params._id = driverID
     */
    app.post('/transit/passager/add/:_id',CONTROLLER.addPassagerTransit)

    /**     POST:Body
     * req.body.passagerId
     * req.params._id = driverID
     */
    app.post('/transit/passager/del/:_id',CONTROLLER.removePassagerTransit)

    /** Debug route */
    app.get('/transit/getAll',CONTROLLER.getAll) 
}