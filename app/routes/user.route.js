module.exports = (app) => {
    const CONTROLLER = require('../controllers/user.controller');
    
    app.post('/user/emailCheck',CONTROLLER.verifyEmail );

    app.post('/user/create',CONTROLLER.createUser);

    app.get('/user/all',CONTROLLER.getAll)

    app.post('/user/', CONTROLLER.getUser);

    app.post('/user/login', CONTROLLER.login);
}