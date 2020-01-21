const test = require('tape');
const repository = require('./repository');

 
function runTests(){
 
    var id = null;
 
    test('Repository GetAllClients', (t) => {
        repository.getAllClients((err, clients) => {
            if(clients && clients.length > 0){
                id = clients[0]._id;   
                console.log(id);
            }                       
            t.assert(!err && clients && clients.length > 0, "All Clients returned!");
            t.end();
            process.exit(0);
        })
        
    })
    
    /*test('Repository GetClientsById', (t) => {
        if(!id){
            t.assert(true, "Cliente by Id Returned");
            t.end();
            return;
        }
    })*/

}

module.exports = { runTests }