const crypto = require('crypto');

const getdb = require("./../db");

const db = getdb.getConnection();

function generateSecretToken() {
    const tokenLength = 8; 
    const token = crypto.randomBytes(tokenLength).toString('hex');
    return token;
}

////////////////// CREATE AND INSERT A DATA INTO ACCOUNT ///////////////

module.exports.account=(req,res)=>{
    console.log(req.body)

    const { email, accountName, website } = req.body;
     const secretToken = generateSecretToken(); 
  
     db.run('INSERT INTO accounts (email, accountName, secretToken, website) VALUES (?, ?, ?, ?)', [email, accountName, secretToken, website], function (err) {
      if (err) {
        console.error(err.message);
        return res.json({ error: 'Internal Server Error on insert data in account' });
      }else{
         res.json({ msg:'Data inserted successfully' });
      }
    })
}

////////////////// CREATE AND INSERT A DATA INTO DESTINATION ///////////////

module.exports.destination=(req,res)=>{
    console.log(req.body)
    let { accountId, url, method,header } = req.body;
    headers = JSON.stringify(header)
    db.run('INSERT INTO destinations (accountId, url, method,headers) VALUES (?, ?, ?, ?)', [accountId, url, method,headers], function (err) {
      if (err) {
        console.error(err.message);
        return res.json({ error: 'Internal Server Error insert data in destination' });
      }else{
         res.json({ msg:'destinations Data inserted successfully' });
      }
    })
}