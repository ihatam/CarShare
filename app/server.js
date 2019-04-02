const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const DB_CONNECTION = require('./db.connection').connection;

app.use(cors())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
// parse requests of content-type - application/json
app.use(bodyParser.json())
require('./routes/position.route')(app)

DB_CONNECTION()

app.get('/', (req,res) => {
    res.json({"message": "Welcome !"});
})
app.listen(process.env.PORT || 3000,() => {
    console.log('Server is listening on port', process.env.PORT || 3000 )
})
 