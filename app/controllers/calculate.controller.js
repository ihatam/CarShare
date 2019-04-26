const Db_Error = require('../error/db_error');
const CALCULATE = require('../db.acces/getTransitProche').calculatePosition

module.exports.calculate = async (req, res) => {
    const positionID = req.body.idPositionActuelle
    console.log('req.body.idPositionActuelle: ', req.body.idPositionActuelle);
    const destiantionID = req.body.idDestination
    console.log('req.body.idDestination: ', req.body.idDestination);
    const value = await CALCULATE(positionID,destiantionID)
    console.log('value: ', value);
    if(value instanceof Db_Error){
        console.log('Error: ', value.formatError());
        return res.status(400).send(value.formatError());
    }
    return res.send(value)
}