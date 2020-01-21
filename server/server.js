require("dotenv-safe").config();

var bodyParser = require('body-parser')
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
var cors = require('cors');
var server = null;
const PORT =3000;


function start(api, repository, callback) {
    const app = express();
    app.use(morgan('dev'));
    app.use(helmet());
    app.use((err, req, res, next) => {
        callback(new Error('Something went wrong!'));
    })
    app.use(cors());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    

    api(app, repository);

    server = app.listen(process.env.PORT || parseInt(PORT),
    () => callback(null, server));
}

function stop() {
    if(server) server.close();
    return true;
}

module.exports = {start, stop}
