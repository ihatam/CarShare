const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const UserShcemea = mongoose.Schema({
    family_name:String,
    name:String,
    phone:Number,
    email:String,
    password:String,
    user_photo:String,
    payment_method:[
        {
            type:String,
            card_info:{

            }
        }
    ],
    permis:String,
    car:[{car_id:ObjectId}],
    position:ObjectId
})
module.exports = mongoose.model('carshare-user',UserShcemea,'user')