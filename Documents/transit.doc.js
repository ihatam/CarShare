    const WAITING_STATUS = {
        WAITING: 'waiting',
        VALIDATED: 'validated',
        REFUSED: 'refused',
    }
    post('/transit/add',()=>{
        const body = {
            "driverID":"5cb108645a33a30017af6e7d",
            "driver_current_positionID":"5cb108645a33a30017af6e7e",
            "driver_destination_positionID":"5cb108645a33a30017af6e7f"
        }
        const response = {
            "_id": "5cbf9b3689d5f30017e05c1e",
            "driverID": "5cb108645a33a30017af6e7d",
            "driver_current_positionID": "5cb108645a33a30017af6e7e",
            "driver_destination_positionID": "5cb108645a33a30017af6e7f",
            "passager": [],
            "__v": 0
          }   
    });
    // _id: conducteur
    get('/transit/get/:_id',()=>{
        const response = {
            "_id": "5cbf77515dbf100017ec7ab0",
            "driverID": "5cb108645a33a30017af6e7d",
            "driver_current_positionID": "5cb108645a33a30017af6e7e",
            "driver_destination_positionID": "5cb108645a33a30017af6e7f",
            "passager": [
              {
                "_id": "5cbf83e089d5f30017e05c1d",
                "passagerId": "5cbf6de5294550001707e016",
                "passagerStatus": "validated"
              }
            ],
            "__v": 0
        }
    })

    // update le status
    put('/transit/status',()=>{
        const body = {
            "status":"validated",
            "passagerId":"5cbf6de5294550001707e016"
        }
        //reponse inutile
        const response = {
            "n": 1,
            "nModified": 1,
            "opTime": {
              "ts": "6683205425971593217",
              "t": 3
            },
            "electionId": "7fffffff0000000000000003",
            "ok": 1,
            "operationTime": "6683205425971593217",
            "$clusterTime": {
              "clusterTime": "6683205425971593217",
              "signature": {
                "hash": "zOj7M437B61C0HMOkrTwThJCIcg=",
                "keyId": "6675285197040123905"
              }
            }
        }  
    });

    /**
     * _id: conducteur
     */
    post('/transit/passager/add/:_id',() =>{ 
        const body = {
            "passagerId":"5cbf6de5294550001707e016"
        }
        const response = {
            "_id": "5cbf77515dbf100017ec7ab0",
            "driverID": "5cb108645a33a30017af6e7d",
            "driver_current_positionID": "5cb108645a33a30017af6e7e",
            "driver_destination_positionID": "5cb108645a33a30017af6e7f",
            "passager": [
              {
                "_id": "5cbf83e089d5f30017e05c1d",
                "passagerId": "5cbf6de5294550001707e016",
                "passagerStatus": "validated"
              }
            ],
            "__v": 0
          }
    })

    /**     
     * _id = driverID
     */
    post('/transit/passager/del/:_id',()=>{
        const body = {
            "passagerId":"5cbf6de5294550001707e016"
        }
        const response = {
            "n": 1,
            "nModified": 1,
            "opTime": {
              "ts": "6683204652877479937",
              "t": 3
            },
            "electionId": "7fffffff0000000000000003",
            "ok": 1,
            "operationTime": "6683204652877479937",
            "$clusterTime": {
              "clusterTime": "6683204652877479937",
              "signature": {
                "hash": "wkZIWY7jVknQM+0uUrBmDvOGR+4=",
                "keyId": "6675285197040123905"
              }
            }
          }
    })
