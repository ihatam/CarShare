const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const PositionSchema = mongoose.Schema({
    lat:Number,
    lng:Number,
    userId:ObjectId
})
module.exports = mongoose.model('carshare',PositionSchema,'position')
