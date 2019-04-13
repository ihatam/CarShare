module.exports = (app) => {
    const CONTROLLER = require('../controllers/user.controller');
    const jwtCheck = require('../tokenManager/tokenChecker');

    app.post('/user/emailCheck',CONTROLLER.verifyEmail );

    app.post('/user/create',CONTROLLER.createUser);

    app.get('/user/all',CONTROLLER.getAll)

    app.post('/user/',jwtCheck.verifyToken, CONTROLLER.getUser);

    app.post('/user/login', CONTROLLER.login);
}