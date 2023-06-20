const express = require("express")

const app = express()

const getdb=require('./db')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const db = getdb.getConnection();


db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS accounts (accountId INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, accountName TEXT, secretToken TEXT, website TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS destinations (destId INTEGER PRIMARY KEY AUTOINCREMENT, accountId INTEGER, url TEXT, method TEXT, headers TEXT, FOREIGN KEY (accountId) REFERENCES accounts (accountId) ON DELETE CASCADE)');
  });

app.use("/", require("./routes/function"));


app.listen(5000,()=>{
    console.log(`Server listen at 5000`)
})