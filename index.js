require("dotenv-safe").config();
const clientes = require('./api/clientes');
const server = require("./server/server");
const repository = require("./repository/repository");

 
server.start(clientes, repository, (err, app) => { 
    // verbose logging when we are starting the server
    console.log('--- Clients Service Connected ---')
});

