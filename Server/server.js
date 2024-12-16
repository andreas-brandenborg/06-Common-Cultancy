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
    let q = `select sum(donation), year 
                    from economic_support
                    group by year`;
    connection.query(q, (error, results)=>{
        res.send(results);
    })
});

app.get('/social-media-posts',(req,res)=> {
    let q = `SELECT year, SUM(total_interactions) as interactions_year
                    FROM metrics
                    INNER JOIN time ON time.ccpost_id = metrics.ccpost_id
                    Where yearmonth > 2021
                    GROUP BY year
                    ORDER BY year;`;
    connection.query(q, (error, results)=>{
        res.send(results);
    })
});
app.get('/sentiment-percentage', (req, res) => {
    let q = `SELECT gpt_ukraine_for_imod AS sentiment,COUNT(*) * 100.0 / (SELECT COUNT(*) FROM classification WHERE gpt_ukraine_for_imod IN ('For', 'Imod')) AS post_percentage
                    FROM classification
                    WHERE gpt_ukraine_for_imod IN ('For', 'Imod')
                    GROUP BY gpt_ukraine_for_imod
                    ORDER BY FIELD(gpt_ukraine_for_imod, 'For', 'Imod');`;
    connection.query(q, (error, results)=>{
        res.send(results);
    })
});
app.get('/percentage-posts', (req, res) => {
    const q = `SELECT gpt_ukraine_for_imod AS sentiment,
                      AVG(metrics.total_interactions) * 100.0 / 
                      (SELECT AVG(metrics.total_interactions) 
                      FROM classification
                      JOIN metrics ON classification.ccpost_id = metrics.ccpost_id 
                      WHERE gpt_ukraine_for_imod IN ('For', 'Imod')) AS engagement_percentage
                      FROM classification
                      JOIN metrics ON classification.ccpost_id = metrics.ccpost_id
                      WHERE gpt_ukraine_for_imod IN ('For', 'Imod')
                      GROUP BY gpt_ukraine_for_imod
                      ORDER BY FIELD(gpt_ukraine_for_imod, 'For', 'Imod');`;
    connection.query(q, (error, results)=>{
        res.send(results);
    })
});
app.get('/avg-shares-for', (req, res) => {
    const q = `
        SELECT 
        time.year,
        AVG(metrics.shares) AS avg_shares
        FROM classification
        JOIN metrics ON classification.ccpost_id = metrics.ccpost_id
        JOIN time ON metrics.ccpost_id = time.ccpost_id
        WHERE classification.gpt_ukraine_for_imod IN ('For') AND time.year IN (2022, 2023, 2024)
        GROUP BY time.year, classification.gpt_ukraine_for_imod
        ORDER BY time.year;`;
    connection.query(q, (error, results)=>{
        res.send(results);
    })
});
app.get('/avg-shares-imod', (req, res) => {
    const q = `
        SELECT 
            time.year,
            AVG(metrics.shares) AS avg_shares
        FROM classification
        JOIN metrics ON classification.ccpost_id = metrics.ccpost_id
        JOIN time ON metrics.ccpost_id = time.ccpost_id
        WHERE classification.gpt_ukraine_for_imod IN ('Imod') AND time.year IN (2022, 2023, 2024)
        GROUP BY time.year, classification.gpt_ukraine_for_imod
        ORDER BY time.year;`;
    connection.query(q, (error, results)=>{
        res.send(results);
    })
});
app.listen(port, ()=>{
    console.log("Hey guys we are officially LIVE !!!!");
});