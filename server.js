const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
global.fetch = require("node-fetch");

const naverRouter = require('./routes/naver');
const musicRouter = require('./routes/music');
const movieRouter = require('./routes/movie');
const bookRouter = require('./routes/book');
const transmediaRouter = require('./routes/transmedia');
const userRouter = require('./routes/user');

app.use('/api/naver', naverRouter);
app.use('/api/music', musicRouter);
app.use('/api/movie', movieRouter);
app.use('/api/book', bookRouter);
app.use('/api/transmedia', transmediaRouter);
app.use('/api/user', userRouter);

//데이터베이스 접근
const fs = require('fs');
const dbAndApiData = fs.readFileSync('./dbandapi.json');
const dbAndApi = JSON.parse(dbAndApiData);
const mysql = require('mysql');

const dbConnection = mysql.createConnection({
    host: dbAndApi.mysql.host,
    user: dbAndApi.mysql.user,
    password: dbAndApi.mysql.password,
    port: dbAndApi.mysql.port,
    database: dbAndApi.mysql.database
});
dbConnection.connect();

//DB에서 category 조회 : get
app.get('/api/category', (req, res) => {
    dbConnection.query(
        "SELECT * FROM category WHERE categoryID > 100;",
        (err, results, fields) => {
            res.send(results);
        }
    )
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});