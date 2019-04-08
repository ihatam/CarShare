const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const UserCarSchema = mongoose.Schema({
        user_id:ObjectId,
        picture:String,
        couleur:String,
        brand:String,
        registration:String,
        categorie:String,
})
module.exports = mongoose.model('carshare-user-car',UserCarSchema,'user_car')
