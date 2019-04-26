module.exports = (app) => {
    const CONTROLLER = require('../controllers/position.controller');
    const jwtCheck = require('../tokenManager/tokenChecker');

  //  app.post('/position/',CONTROLLER.insertMany );
    
    app.post('/position/',CONTROLLER.create );

    app.get('/position/',CONTROLLER.getAll)

    app.get('/position/:_id',jwtCheck.verifyToken,CONTROLLER.getById)

    app.put('/position/:_id',jwtCheck.verifyToken, CONTROLLER.update);
}