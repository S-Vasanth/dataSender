const getdb = require("./../db");

const db = getdb.getConnection();

//////////// UPDATE AN ACCOUNT /////////////

module.exports.accountUpdate=(req,res)=>{
    console.log(req.body)

    const { email, accountId } = req.body;
     
     db.run('UPDATE accounts SET email = ? WHERE accountId = ?', [email, accountId], function (err) {
      if (err) {
        console.error(err.message);
        return res.json({ error: 'Internal Server Error' });
      }else{
         res.json({ msg:'Data update successfully in account' });
      }
    })
}

//////////// UPDATE AN DESTINATION /////////////

module.exports.destinationUpdate=(req,res)=>{
    console.log(req.body)
    let { method,destId} = req.body;

    db.run('UPDATE destinations SET method = ? WHERE destId = ?', [method,destId], function (err) {
      if (err) {
        console.error(err.message);
        return res.json({ error: 'Internal Server Error' });
      }else{
         res.json({ msg:'destinations Data updated successfully' });
      }
    })
}