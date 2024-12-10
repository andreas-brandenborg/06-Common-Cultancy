const express = require('express');
const cors = require('cors');
const db = require('mysql2');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const connection = db.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.dbpassword,
    database: "facebook"
});

app.get('/test',(req,res)=> {
    let q = `SELECT * FROM classification LIMIT 1`;
    connection.query(q, (error, results)=>{
        res.send(results);
    })
});

app.get('/total-interactions',(req,res)=> {
    let q = `SELECT * FROM classification LIMIT 1`;
    connection.query(q, (error, results)=>{
        res.send(results);
    })
});

app.get('/negative-posts',(req,res)=> {
    let q = `SELECT * FROM classification LIMIT 1`;
    connection.query(q, (error, results)=>{
        res.send(results);
    })
});

app.get('/economic-support',(req,res)=> {
    let q = `SELECT * FROM classification LIMIT 1`;
    connection.query(q, (error, results)=>{
        res.send(results);
    })
});

// Start server. Needs to be below end points.
app.listen(port, ()=>{
    console.log("Hey guys we are officially LIVE !!!!");
});