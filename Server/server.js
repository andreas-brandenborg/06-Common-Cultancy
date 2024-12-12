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

// Result: [{"yearmonth": "2019-01", "interactions_yearmonth": "110"}, ...]
app.get('/total-interactions',(req,res)=> {
    let q = `SELECT yearmonth, SUM(total_interactions) as interactions_yearmonth
                    FROM metrics
                    INNER JOIN time ON time.ccpost_id = metrics.ccpost_id
                    Where yearmonth > 2021
                    GROUP BY yearmonth
                    ORDER BY yearmonth;`;
    connection.query(q, (error, results)=>{
        res.send(results);
    })
});

app.get('/negative-posts',(req,res)=> {
    let q = `select count(gpt_ukraine_for_imod), gpt_ukraine_for_imod
                    from classification
                    group by gpt_ukraine_for_imod
                    order by count(gpt_ukraine_for_imod) asc`;
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

app.get('/social-media-posts',(req,res)=> {
    let q = `SELECT * FROM classification LIMIT 1`;
    connection.query(q, (error, results)=>{
        res.send(results);
    })
});

// Start server. Needs to be below end points.
app.listen(port, ()=>{
    console.log("Hey guys we are officially LIVE !!!!");
});