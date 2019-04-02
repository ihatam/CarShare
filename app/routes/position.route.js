module.exports = (app) => {
    const CONTROLLER = require('../controllers/position.controller');

  //  app.post('/position/',CONTROLLER.insertMany );
    
    app.post('/position/',CONTROLLER.create );

    app.get('/position/',CONTROLLER.getAll)

    app.get('/position/:_id',CONTROLLER.getById)

    app.put('/position/:_id', CONTROLLER.update);
}
