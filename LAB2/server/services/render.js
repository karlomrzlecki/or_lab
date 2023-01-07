const axios = require('axios');

const { requiresAuth } = require('express-openid-connect');

exports.index = (req, res) =>{
    console.log(req.oidc.isAuthenticated());
    res.render('index', {isAuthenticated: req.oidc.isAuthenticated()});
}

exports.datatable = (req, res) => {
    res.render('datatable', {isAuthenticated: req.oidc.isAuthenticated()});

}

exports.profile = (requiresAuth(), (req, res) => {
    res.render('profile', {isAuthenticated: req.oidc.isAuthenticated(), user: req.oidc.user})
    // res.send(JSON.stringify(req.oidc.user));
  });