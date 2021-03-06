const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const DB_CONNECTION = require('./app/db.connection');

app.use(cors())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
// parse requests of content-type - application/json
app.use(bodyParser.json())
require('./app/routes/position.route')(app)
require('./app/routes/user.route')(app)
require('./app/routes/user-car.route')(app)
require('./app/routes/transit.route')(app)
require('./app/routes/calculate-distance')(app)

DB_CONNECTION.ATLASConnection();
//DB_CONNECTION.connection();
app.get('/', (req,res) => {
    res.json({"message": "Welcome !"});
})
app.listen(process.env.PORT || 3000,() => {
    console.log('Server is listening on port', process.env.PORT || 3000 )
})