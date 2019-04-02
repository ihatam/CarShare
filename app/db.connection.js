const mongoose = require('mongoose');
// TODO: get rid of the full path for env
require('dotenv').config({ path: 'app/env/.env.db' })

var errHandler = function(err){
    console.log("Error while fetchig db url : ",err)
}
module.exports.disconnect = async () =>{
    mongoose.disconnect()
    console.log("Succesfully disconnect to dataabse")
}
module.exports.ATLASConnection = () => {
    //let url = 'mongodb+srv://mat:matahi@cluster0-2maes.mongodb.net/test?retryWrites=true'
    let url2 = 'mongodb+srv://pcar:MtxfewPecGOOkzgn@pcar-9pg5q.mongodb.net/test?retryWrites=true'
    //let url3 = 'mongodb+srv://admin:admin@pcar-9pg5q.mongodb.net/test?retryWrites=true'
    connect(url2)
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
