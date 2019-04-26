const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const UserShcemea = mongoose.Schema({
    family_name:String,
    name:String,
    phone:String,
    email:String,
    password:String,
    user_photo:String,
    isDriver:Boolean,
    payment_method:[
        {
            type:String,
            card_info:{

            }
        }
    ],
    permis:String,
    car:[{car_id:ObjectId}],
    current_position_id:ObjectId,
    destination_id:ObjectId,
})
module.exports = mongoose.model('carshare-user',UserShcemea,'user')