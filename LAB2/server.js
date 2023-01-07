const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();


const { auth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: 'http://localhost:8080',
    clientID: 'client',
    issuerBaseURL: 'https://dev-ygr18nvr.eu.auth0.com',
    secret: 'secret'
};

app.use(auth(config));

// app.get('/', (req, res) => {
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
//   });


dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 8080


// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/files', express.static(path.resolve(__dirname, "assets/files")))

// load routers
app.use('/', require('./server/routes/router'))

app.use((req,res,next) =>{
    res.status(404).json({status:"Not implemented", message:"Method not implemented for requested resource", response: null});
    res.end();
})

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});