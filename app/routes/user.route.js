module.exports = (app) => {
    const CONTROLLER = require('../controllers/user.controller');
    const jwtCheck = require('../tokenManager/tokenChecker');

    app.post('/user/emailCheck',CONTROLLER.verifyEmail );

    app.post('/user/create',CONTROLLER.createUser);

    app.get('/user/all',CONTROLLER.getAll)

    app.get('/user/byId/:_id', CONTROLLER.getUserById);

    app.post('/user/',jwtCheck.verifyToken, CONTROLLER.getUser);

    app.put('/user/drivingStatus/:_id',jwtCheck.verifyToken, CONTROLLER.updateDriverStatus);

    app.post('/user/login', CONTROLLER.login);
}