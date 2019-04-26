module.exports = (app) => {
    const CONTROLLER = require('../controllers/calculate.controller');    
    /**
     *     const positionID = req.body.idPositionActuelle
const destiantionID = req.body.idDestination        
     */
    app.post('/calculate/',CONTROLLER.calculate );
}