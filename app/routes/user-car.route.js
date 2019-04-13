module.exports = (app) => {
    const CONTROLLER = require('../controllers/user-car.controller');
    const jwtCheck = require('../tokenManager/tokenChecker');

    app.post('/car/:user_id',jwtCheck.verifyToken,CONTROLLER.createCar );    // create

    app.get('/car/all',CONTROLLER.getAllCars )   // get all car in db

    app.get('/car/:user_id',jwtCheck.verifyToken,CONTROLLER.getUserCars)   // get all car for a specifie user

    app.put('/car/:_id',jwtCheck.verifyToken,CONTROLLER.updateCarInfo );     //Update  car info take the id of the car

    app.get('/car/registration/:_registration',CONTROLLER.checkRegistrationvalidity); // check if the registration number is valid
}
