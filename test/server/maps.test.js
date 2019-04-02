require('dotenv').config({ path: './.env.key' })
var fs = require('fs');

function writeFile(object,filname){
  fs.writeFile(filname, JSON.stringify(object), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
  }); 
}
const googleMapsClient = require('@google/maps').createClient({
    key: process.env.KEY_GMAP,
    Promise: Promise
  });
// googleMapsClient.geocode({address: '1600 Amphitheatre Parkway, Mountain View, CA'})
//   .asPromise()
//   .then((response) => {
//     //writeFile(response.json.results,"geocode.json");
// }).catch((err) => {
//   console.log(err);
// });
var directionObj = {
  origin:{
    lat: -34.397, lng: 150.644
  },
  destination:{
    lat: -34.39, lng: 150.649
  }
}
googleMapsClient.directions(directionObj)
  .asPromise()
  .then((response)=>{
    console.log(response);
    console.log(response.json);
    writeFile(response,"direction.json")
  }).catch((err)=>{
    console.log(err);
  })