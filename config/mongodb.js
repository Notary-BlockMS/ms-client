const MongoClient = require("mongodb").MongoClient;
var connection = null;
var db = null;
const url = 'mongodb+srv://admin:p%40ssw0rd%279%27%21@cluster0-q5olm.gcp.mongodb.net/test?retryWrites=true&w=majority'

//const url = 'mongodb://mongo:27017'
const database_name = 'clientes'


 function connect(callback){
   if(connection) return callback(null, db);
 
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async(err, conn) => {
        if(err) {
            console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
            //return callback(err, null);
        }else {
            connection = conn;

            db = conn.db(database_name);

            await conn.close();

            return callback(null, db);
        }
    })
}

function disconnect(){
    if(!connection) return true;
    connection.close();
    connection = null;
    return true;
}

//module.exports = {connect}
module.exports = {connect, disconnect}