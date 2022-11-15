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
 route.get('/datatable', services.datatable)

//API
route.get('/api/chars', controller.find);

module.exports = route