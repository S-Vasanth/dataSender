const sqlite3 = require("sqlite3").verbose()

function getConnection() {
const db=new sqlite3.Database('./datapusher.db',sqlite3.OPEN_READWRITE,(err)=>{
    if(err){
        return console.log(err)
    }
})
 return db
}
module.exports.getConnection = getConnection;