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

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

    characters.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

exports.findOne = (req, res) => {
  const id = req.query.id;
  console.log(req.query);

  characters.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Character not found with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving character with id " + id });
    });
};

exports.findByType = (req, res) => {
    console.log(req.query);
  
    characters.find({types : req.query.type})
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Character not found with type " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving character with type " + id });
      });
  };

exports.findByUniverse = (req, res) => {
    console.log(req.query);
  
    characters.find({universes : req.query.universe})
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Character not found with universe " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving character with universe " + id });
      });
  };

exports.findBySuperpower = (req, res) => {
    console.log(req.query);
  
    characters.find({superpowers : req.query.superpower})
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Character not found with superpower " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving character with superpower " + id });
      });
  };

exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.query.id;

    console.log(req.body);
  
    characters.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: "Cannot update character with id " + id
          });
        } else res.send({ message: "Character was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating character with id" + id
        });
      });
  };

exports.create = (req, res) => {
    console.log(req.body)
    if (!req.body.charname) {
      res.status(400).send({ message: "Charname can not be empty!" });
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
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating new character."
        });
      });
  };

exports.delete = (req, res) => {
    const id = req.query.id;
  
    characters.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: "Cannot delete character with id " + id
          });
        } else {
          res.send({
            message: "Character was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };