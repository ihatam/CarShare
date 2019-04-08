module.exports = (app) => {
    const CONTROLLER = require('../controllers/user-car.controller');

    app.post('/car/:user_id',CONTROLLER.createCar );    // create

    app.get('/car/all',CONTROLLER.getAllCars )   // get all car in db

    app.get('/car/:user_id',CONTROLLER.getUserCars)   // get all car for a specifie user

    app.put('/car/:_id',CONTROLLER.updateCarInfo );     //Update  car info take the id of the car

    app.get('/car/registration/:_registration',CONTROLLER.checkRegistrationvalidity); // check if the registration number is valid
}
