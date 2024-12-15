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
app.get('/post-percentage', (req, res) => {
    const q = `
        SELECT 
            classification.gpt_ukraine_for_imod AS sentiment,
            COUNT(classification.ccpost_id) * 100.0 / 
            (SELECT COUNT(*) FROM classification WHERE gpt_ukraine_for_imod IN ('For', 'Imod')) AS post_percentage
        FROM classification
        WHERE classification.gpt_ukraine_for_imod IN ('For', 'Imod')
        GROUP BY classification.gpt_ukraine_for_imod
        ORDER BY FIELD(sentiment, 'For', 'Imod');`;
    connection.query(q, (error, results)=>{
        res.send(results);
    })
});
app.get('/avg-interactions', (req, res) => {
    const q = `
        SELECT 
            classification.gpt_ukraine_for_imod AS sentiment,
            AVG(metrics.total_interactions) AS avg_interactions
        FROM classification
        JOIN metrics ON classification.ccpost_id = metrics.ccpost_id
        WHERE classification.gpt_ukraine_for_imod IN ('For', 'Imod')
        GROUP BY classification.gpt_ukraine_for_imod
            ORDER BY FIELD(sentiment, 'For', 'Imod');`;
    connection.query(q, (error, results)=>{
        res.send(results);
    })
});

app.get('/avg-angrys', (req, res) => {
    const q = `
        SELECT 
            classification.gpt_ukraine_for_imod AS sentiment,
            AVG(metrics.angrys) AS avg_angrys
        FROM classification
        JOIN metrics ON classification.ccpost_id = metrics.ccpost_id
        WHERE classification.gpt_ukraine_for_imod IN ('For', 'Imod')
        GROUP BY classification.gpt_ukraine_for_imod
             ORDER BY FIELD(sentiment, 'For', 'Imod');`;
    connection.query(q, (error, results)=>{
        res.send(results);
    })
});
app.get('/avg-interactions-by-sentiment-month', (req, res) => {
    const q = `
        SELECT 
            classification.gpt_ukraine_for_imod AS sentiment,
            time.yearmonth,
            AVG(metrics.total_interactions) AS avg_interactions
        FROM classification
        JOIN metrics ON classification.ccpost_id = metrics.ccpost_id
        JOIN time ON metrics.ccpost_id = time.ccpost_id
        GROUP BY classification.gpt_ukraine_for_imod, time.yearmonth
        ORDER BY time.yearmonth, FIELD(sentiment, 'For', 'Imod');
    `;
    connection.query(q, (error, results)=>{
        res.send(results);
    })
});
app.get('/avg-interactions-by-sentiment-start-war', (req, res) => {
    const q = `SELECT 
    classification.gpt_ukraine_for_imod AS sentiment,
    AVG(metrics.total_interactions) AS avg_interactions
FROM classification
JOIN metrics ON classification.ccpost_id = metrics.ccpost_id
JOIN time ON metrics.ccpost_id = time.ccpost_id
WHERE time.yearmonth BETWEEN '2022-02' AND '2022-03' -- Adjusted to include February 2022 and March 2022
GROUP BY classification.gpt_ukraine_for_imod
             ORDER BY FIELD(sentiment, 'For', 'Imod');`;
    connection.query(q, (error, results)=>{
        res.send(results);
    })
});
app.get('/avg-shares-by-sentiment', (req, res) => {
    const q = `SELECT 
    classification.gpt_ukraine_for_imod AS sentiment,
    AVG(metrics.shares) AS avg_shares
FROM classification
JOIN metrics ON classification.ccpost_id = metrics.ccpost_id
GROUP BY classification.gpt_ukraine_for_imod
             ORDER BY FIELD(sentiment, 'For', 'Imod');`;
    connection.query(q, (error, results)=>{
        res.send(results);
    })
});
app.get('/avg-interactions-by-sentiment-start-war', (req, res) => {
    const q = `SELECT 
    classification.gpt_ukraine_for_imod AS sentiment,
    AVG(metrics.total_interactions) AS avg_interactions
FROM classification
JOIN metrics ON classification.ccpost_id = metrics.ccpost_id
JOIN time ON metrics.ccpost_id = time.ccpost_id
WHERE time.yearmonth BETWEEN '2022-02' AND '2022-03' -- Adjusted to include February 2022 and March 2022
GROUP BY classification.gpt_ukraine_for_imod
             ORDER BY FIELD(sentiment, 'For', 'Imod');`;
    connection.query(q, (error, results)=>{
        res.send(results);
    })
});
app.get('/avg-interactions-by-sentiment-start-war', (req, res) => {
    const q = `SELECT 
    classification.gpt_ukraine_for_imod AS sentiment,
    AVG(metrics.total_interactions) AS avg_interactions
FROM classification
JOIN metrics ON classification.ccpost_id = metrics.ccpost_id
JOIN time ON metrics.ccpost_id = time.ccpost_id
WHERE time.yearmonth BETWEEN '2022-02' AND '2022-03' -- Adjusted to include February 2022 and March 2022
GROUP BY classification.gpt_ukraine_for_imod
             ORDER BY FIELD(sentiment, 'For', 'Imod');`;
    connection.query(q, (error, results)=>{
        res.send(results);
    })
});
// Start server. Needs to be below end points.
app.listen(port, ()=>{
    console.log("Hey guys we are officially LIVE !!!!");
});