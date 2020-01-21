const mongodb = require("../config/mongodb")

function getAllClients(callback){
    mongodb.connect((err, db) => {
        db.collection("clientes-collection").find().toArray(callback);
    })
}

function getClientsById(id, callback){
    mongodb.connect((err, db) => {
        db.collection("clientes-collection").findOne({
            _id: require("mongodb").ObjectId(id)}, callback);
    });
}

function insertCliente(cliente, callback){
    mongodb.connect((err, db) => {
        db.collection("clientes-collection").insertOne(cliente, callback)
    });
}

function deleteCliente(id, callback){
    mongodb.connect((err, db) => {
        db.collection("clientes-collection").deleteOne({
            _id: require("mongodb").ObjectId(id)}, callback)
    });
}

function updateCliente(id, cliente, callback){
    mongodb.connect((err, db) => {
        db.collection("clientes-collection").updateOne({
            _id: require("mongodb").ObjectId(id)}, cliente, callback)
    });
}

function patchCliente(id, updates, callback){
    mongodb.connect((err, db) => {
        db.collection("clientes-collection").updateOne({
            _id: require("mongodb").ObjectId(id)}, {$set: updates}, callback)
    });
}

function disconnect() {
    return mongodb.disconnect();
}

module.exports = {getAllClients, getClientsById, disconnect, insertCliente, deleteCliente, patchCliente, updateCliente}