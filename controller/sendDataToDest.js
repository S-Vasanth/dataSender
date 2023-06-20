
const axios=require('axios')

const qs=require('qs')

const getdb = require("./../db");
const db = getdb.getConnection();

module.exports.SendToDest=(req,res)=>{
    const { headers, body } = req;
    const secretToken = headers['cl-x-token'];
    const payload = body;
  
    if (!secretToken) {
      return res.json({ error: 'Unauthenticated! There is no secretToken' });
    }
    
    if(typeof payload !== 'object' && !isJSON(payload)){
      return res.json({ error: 'Invalid Data' });
    } 
  
    const query = 'SELECT * FROM accounts WHERE secretToken =?'
  
    db.all(query,[secretToken], (err, account) => {
      if (err) {
        console.error(err.message);
        return res.json({ error: 'Internal Server Error when get account using secretToken' });
      }
      if (!account) {
        return res.json({ error: 'Unauthenticated! There is no account' });
      }
  
      console.log(account)
      const accountId = account[0].accountId;
      console.log(accountId)
  
      db.all('SELECT * FROM destinations WHERE accountId = ?', [accountId], (err, destinations) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ error: 'Internal Server Error,when fetch a destinaction' });
        }
          console.log(destinations)
          destinations.forEach(async(destination) => {
          await sendDataToDestination({payload,...destination});
        });
  
        res.json({ message: 'Data sent to destinations' });
    })
    })
}

// Helper function to send data to a destination
async function sendDataToDestination({url, method, headers,payload:data}) {
    console.log(data)
    
  if (method === 'GET') {
    const queryParams = qs.stringify(data);
    const urlWithParams = `${url}?${queryParams}`;

    await axios({
      method,
      url: urlWithParams,
      headers: JSON.parse(headers)
    });
   
  } else {
    await axios({
        method,
        url,
        data,
        headers: JSON.parse(headers)
      });
  }

  
    console.log(`Sending data to destination: ${url}`);
  
  }
  
  function isJSON(str) {
    try {
      JSON.parse(str)
      return true;
    } catch (e) {
      return false;
    }
  }
  

