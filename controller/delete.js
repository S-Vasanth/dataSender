const getdb = require("./../db");

const db = getdb.getConnection();

////////////////////// DELETE AN ACCOUNT FROM ACCOUNTS AND DESTINATION TABEL   /////////////////////

module.exports.deleteAccDest=(req,res)=>{
    const {id} = req.body
    
    db.run('DELETE from accounts WHERE accountID = ?',[id],function(error){
     if (error) {
       console.error(error.message);
       return res.json({ error: 'Internal Server Error,when delete an account' });
     }else{
         db.run('DELETE from destinations WHERE accountID = ?',[id],function(error,result){
            if (error) {
              console.error(error.message);
              return res.json({ error: error.message});
            }
            if(!result)
            {
              return res.json({ error: 'There no accountID in Destination' });
            }else{
              res.json({ msg:' account and destinations Data deleted successfully' });
            }
        })
     }
    })
}
