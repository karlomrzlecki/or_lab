const characters = require('../model/model');
const datatablesQuery = require('datatables-query');


exports.datatablesFind = (req, res, next)=>{

    params = req.body;
    query = datatablesQuery(characters);

    query.run(params).then(function (data) {
        res.json(data);
    }, function (err) {
        res.status(500).json(err);
    });
}

exports.findAll = (req, res) => {

    characters.find()
      .then(data => {
        res.send({"status": "OK", "message": "Fetched all characters", "response":data});
      })
      .catch(err => {
        res.status(500).send({ status: "Unexpected error", message: "Error retrieving all character", response:null });
      });
  };

exports.findOne = (req, res) => {
  const id = req.query.id;
  console.log(req.query);

  characters.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ status: "Not found", message: "Error retrieving character with id " + id, response:null });
      else res.send({status: "OK", message: "Fetched character with id " + id, response:data});
    })
    .catch(err => {
      res
        .status(500)
        .send({ status: "Unexpected error", message: "Error retrieving character with id " + id, response:null });
    });
};

exports.findByType = (req, res) => {
    console.log(req.query);
  
    characters.find({types : req.query.type})
      .then(data => {
        if (!data)
          res.status(404).send({ status: "Not found", message: "Error retrieving character with type " + req.query.type, response:null });
        else res.send({status: "OK", message: "Fetched character with type " + req.query.type, response:data});
      })
      .catch(err => {
        res
          .status(500)
          .send({ status: "Unexpected error", message: "Error retrieving character with type " + req.query.type, response:null });
      });
  };

exports.findByUniverse = (req, res) => {
    console.log(req.query);
  
    characters.find({universes : req.query.universe})
      .then(data => {
        if (!data)
          res.status(404).send({ status: "Not found", message: "Error retrieving character with universe " + req.query.universe, response:null });
        else res.send({status: "OK", message: "Fetched character with universe " + req.query.universe, response:data});
      })
      .catch(err => {
        res
          .status(500)
          .send({ status: "Unexpected error", message: "Error retrieving character with universe " + req.query.universe, response:null });
      });
  };

exports.findBySuperpower = (req, res) => {
    console.log(req.query);
  
    characters.find({superpowers : req.query.superpower})
      .then(data => {
        if (!data)
          res.status(404).send({ status: "Not found", message: "Error retrieving character with universe " + req.query.superpower, response:null });
        else res.send({status: "OK", message: "Fetched character with superpower " + req.query.superpower, response:data});
      })
      .catch(err => {
        res
          .status(500)
          .send({ status: "Unexpected error", message: "Error retrieving character with superpower " + req.query.superpower, response:null });
      });
  };

exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({ status: "Data to update cannot be empty", message: "Error updating character", response:null });
    }
  
    const id = req.query.id;

    console.log(req.body);
  
    characters.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({ status: "Not found", message: "Error updating character with id " + id, response:null });
        } else res.send({status: "OK", message: "Character was updated sucessfully " + req.query.superpower, response: req.body});
      })
      .catch(err => {
        res.status(500).send({ status: "Unexpected error", message: "Error updating character with id " + id, response:null });
      });
  };

exports.create = (req, res) => {
    console.log(req.body)
    if (!req.body.charname) {
      res.status(400).send({ status: "Charname to create cannot be empty", message: "Error creating character", response:null });
      return;
    }
  
    const character = new characters({
        charname: req.body.charname,
        birthname: req.body.birthname,
        types: req.body.types,
        universes: req.body.universes,
        birthplace: req.body.birthplace,
        superpowers: req.body.superpowers,
        religions: req.body.religions,
        gender: req.body.gender,
        occupation: req.body.occupation,
        memberof: req.body.memberof
    });
  
    character.save(character)
      .then(data => {
        res.send({status: "OK", message: "New character was created sucessfully", response: data});
      })
      .catch(err => {
        res.status(500).send({ status: "Unexpected error", message: "Error creating new character", response:null });
      });
  };

exports.delete = (req, res) => {
    const id = req.query.id;
  
    characters.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({ status: "Not found", message: "Error deleting character with id " + id, response:null });
        } else {
          res.send({status: "OK", message: "Character was deleted sucessfully", response: data});
        }
      })
      .catch(err => {
        res.status(500).send({ status: "Unexpected error", message: "Error deleting a character", response:null });
      });
  };