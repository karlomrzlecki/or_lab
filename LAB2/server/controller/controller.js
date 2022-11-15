var characters = require('../model/model');

exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        characters.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "No char with id: "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error " + id})
            })

    }else{
        characters.find()
            .then(char => {
                res.send(char)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error" })
            })
    }

    
}