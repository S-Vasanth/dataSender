const getdb = require("./../db");

const  db= getdb.getConnection();


/////////// VIEW AN ACCOUNT ////////////

module.exports.viewAcc=(req,res)=>{
    const {id} = req.query

    const query = 'SELECT * FROM accounts WHERE accountId = ?'
  
    db.all(query, [id], (err, rows) => {
      if (err) {
        console.error( err.message);
        return res.json({ error: 'Internal Server Error when view an account' });
      } else {
        console.log(rows);
        res.json({ msg:rows });
      }
    })
}

//////////// VIEW A DESGTINATION /////////////

module.exports.viewDest=(req,res)=>{
    const {id} = req.query

    const query = 'SELECT * FROM destinations WHERE accountId = ?'
  
    db.all(query, [id], (err, rows) => {
      if (err) {
        console.error( err.message);
        return res.json({ error: 'Internal Server Error when view an destination' });
      } else {
        console.log(rows);
        res.json({ msg:rows });
      }
    })
}
