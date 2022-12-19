const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.index);

/**
 *  @description datatable
 *  @method GET /datatable
 */
route.get('/datatable', services.datatable);

//API
route.post('/api/chars', controller.datatablesFind);
// route.post('/api/chars', function (req, res) {
//     var Model = require('../model/model'),
//         datatablesQuery = require('datatables-query'),
//         params = req.body,
//         query = datatablesQuery(Model);

//     query.run(params).then(function (data) {
//         res.json(data);
//     }, function (err) {
//         res.status(500).json(err);
//     });
// });

//LAB3
route.get('/findAll', controller.findAll);
route.get('/findOne', controller.findOne);
route.get('/findByType', controller.findByType);
route.get('/findByUniverse', controller.findByUniverse);
route.get('/findBySuperpower', controller.findBySuperpower);
route.put('/update', controller.update);
route.post('/create', controller.create);
route.delete('/delete', controller.delete);

module.exports = route