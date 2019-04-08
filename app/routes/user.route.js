module.exports = (app) => {
    const CONTROLLER = require('../controllers/user.controller');
    
    app.post('/user/emailCheck',CONTROLLER.verifyEmail );

    app.post('/user/',CONTROLLER.createUser);

    app.get('/user/all',CONTROLLER.getAll)

    app.get('/user/', CONTROLLER.getUser);

    app.get('/user/login', CONTROLLER.login);
}