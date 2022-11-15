const axios = require('axios');

exports.index = (req, res) =>{
    res.render('index');
}

exports.datatable = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:8080/api/chars')
        .then(function(response){
            res.render('datatable', { chars : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}