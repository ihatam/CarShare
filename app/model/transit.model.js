const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const TransitSchema = mongoose.Schema({
    driverID:{ type: ObjectId, ref: 'user', required: true },
    driver_current_positionID:{ type: ObjectId, ref: 'position', required: true },
    driver_destination_positionID:{ type: ObjectId, ref: 'position', required: true },
    passager:[{
        passagerId:{ type: ObjectId, ref: 'user'},
        passagerStatus:String
    }],
})
module.exports = mongoose.model('carshare-transit',TransitSchema,'transit')
