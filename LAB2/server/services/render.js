const axios = require('axios');

exports.index = (req, res) =>{
    res.render('index');
}

exports.datatable = (req, res) => {
    res.render('datatable');

}