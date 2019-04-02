const mongoose = require('mongoose');
// TODO: get rid of the full path for env
require('dotenv').config({ path: '/home/matahi/Documents/spring_2019/Projet/CarShare/app/env/.env.db' })

var errHandler = function(err){
    console.log("Error while fetchig db url : ",err)
}
module.exports.disconnect = async () =>{
    mongoose.disconnect()
    console.log("Succesfully disconnect to dataabse")
}
module.exports.ATLASConnection = () => {
    let url = 'mongodb+srv://mat:matahi@cluster0-2maes.mongodb.net/test?retryWrites=true'
    connect(url)
}
module.exports.connection = () => {
    console.log('process.env.MONGO_HOST: ', process.env.MONGO_HOST);
    connect(process.env.MONGO_HOST)
    
}
function connect(url){
    mongoose.Promise = global.Promise;
    mongoose.connect(url,{
        useNewUrlParser: true
    }).then(() => {
        console.log("Succesfully connect to dataabse")
    }).catch(err => {
        console.log("Fail to connect to database url was:",url," error : ",err)
    })
}
