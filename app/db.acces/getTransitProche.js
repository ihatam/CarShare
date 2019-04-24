const POSITION = require('../model/position.model');
const TRANSIT = require('../model/transit.model')
const Db_Error = require('../error/db_error');

async function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) { 
    var R = 6371; // Radius of the earth in km 
    var dLat = deg2rad(lat2-lat1); // deg2rad below 
    var dLon = deg2rad(lon2-lon1); 
    var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) + 
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km 
    return d;
} 
async function getPositionByID(position) {
    return await POSITION.findById(position)
    .then((data)=>{return data})
    .catch(err => {
        return new Db_Error(err,new Error().stack);
    })
}
async function getAllTransit() {
    return await TRANSIT.find()
    .then((data)=>{return data})
    .catch(err => {
        return new Db_Error(err,new Error().stack);
    })
}
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}
async function getDriverPosition(transits) {
    let driverWithPosition = [];
    await asyncForEach(transits, async (element) => {
        let curPos = await getPositionByID(element.driver_current_positionID)
        let destinationPos = await getPositionByID(element.driver_destination_positionID)
        let driverID = element.driverID
        let driverUpdate = {
            position:curPos,
            destination:destinationPos,
            driverId:driverID
        }
        driverWithPosition.push(driverUpdate)
    });
    return driverWithPosition
}
async function calculeDistanceTransitUser(driverPositionArray,userCurrentPosition,userDestinationPosition) {
    const currentPositionLat = userCurrentPosition.lat;
    const currentPositionlng = userCurrentPosition.lng;
    
    const userDestinationPositionLat = userDestinationPosition.lat;
    const userDestinationPositionlng = userDestinationPosition.lng;
    let arrayUserValide = [];
    await asyncForEach(driverPositionArray, async (element) => {
        let distanceCurrentPosition = await getDistanceFromLatLonInKm(currentPositionLat,currentPositionlng,
            element.position.lat,element.position.lng)
        let distanceDestinationPosition = await getDistanceFromLatLonInKm(userDestinationPositionLat,userDestinationPositionlng,
            element.destination.lat,element.destination.lng)
        if(distanceCurrentPosition<10 && distanceDestinationPosition<10 ){
            arrayUserValide.push({driverId:element.driverId})
        }
    });
    return arrayUserValide;
}
async function calculatePosition(positionUser,destinationUser) {
    const userCurrentPosition = await getPositionByID(positionUser)
    const userDestinationPosition = await getPositionByID(destinationUser)
    const transits = await getAllTransit();
    const driverPositionArray = await getDriverPosition(transits)
    const list_driver_proximiter = await calculeDistanceTransitUser(driverPositionArray,userCurrentPosition,userDestinationPosition)
    return list_driver_proximiter;
}
function deg2rad(deg) { 
    return deg * (Math.PI/180) 
} 

module.exports = {
    calculatePosition:calculatePosition
}