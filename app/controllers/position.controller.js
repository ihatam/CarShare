const POSITION = require('../model/position.model');

module.exports.insertMany = (req, res) => {
    console.log('req.body: ', req.body);

    POSITION.insertMany(req.body).then(data => {
        res.send({message:"Done"})
    }).catch(err => {
        console.log(err)
        res.status(500).send({err,
            message: err.message || "Some error occured while creating the Position"
        });
    });   
};
module.exports.create = (req, res) => {
    console.log('req.body: ', req.body);

    POSITION.create(req.body).then(data => {
        res.send({message:"Done"})
    }).catch(err => {
        console.log(err)
        res.status(500).send({err,
            message: err.message || "Some error occured while creating the Position"
        });
    });   
};
module.exports.getById = async (req,res) => {
    await POSITION.findById(req.params._id, req.body, {new: true}).then(pos => {
        console.log('returning a Position')
        res.send(pos)
    }).catch(err => {
        console.log('Error while fetchng Position',err)
        res.status(500).send({
            message: err.message || "Error while retriving data"
        })
    })
}
module.exports.getAll = async (req,res) => {
    await POSITION.find().then(pos => {
        console.log('returning all Position')
        res.send(pos)
    }).catch(err => {
        console.log('Error while fetchng all Position',err)
        res.status(500).send({
            message: err.message || "Error while retriving data"
        })
    })
}
module.exports.update = (req,res) => {
    POSITION.findByIdAndUpdate(req.params._id, req.body, {new: true}).then(pos => {
        if(!pos){
            return res.send({
                message:"User not found "+req.params._id
            })
        }
        res.send(pos)
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Position not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Error updating Position with id " + req.params._id
        });
    })
}