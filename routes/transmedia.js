const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs');
const dbAndApiFile = fs.readFileSync(path.resolve(__dirname, '../', 'dbandapi.json'));
const dbAndApi = JSON.parse(dbAndApiFile);

const mysql = require('mysql');
const dbConnection = mysql.createConnection({
  host: dbAndApi.mysql.host,
  user: dbAndApi.mysql.user,
  password: dbAndApi.mysql.password,
  port: dbAndApi.mysql.port,
  database: dbAndApi.mysql.database
});
dbConnection.connect();

//DB에서 transmedia 조회 : get
router.get('/', (req, res) => {
  const sql = "SELECT * FROM transmedia WHERE transmediaID > 10000;"

  dbConnection.query(sql,
    (err, results, fields) => {
      if (err)
        console.log(err)
      else {
        res.send(results);
      }
    }
  )
});

//DB에서 특정 transmedia 조회 : get
router.get('/:id', (req, res) => {
  const sql = 'SELECT * FROM transmedia WHERE transmediaID = ?';
  const id = parseInt(req.params.id);

  dbConnection.query(sql, [id],
    (err, results, fields) => {
      if (err)
        console.log(err)
      else {
        res.send(results);
      }
    }
  );
})

//DB에서 특정 transmedia 음악 조회 : get
router.get('/:id/music', (req, res) => {
  const sql = `SELECT musicID, title, artist, t.transmediaName
  FROM music AS m
  LEFT OUTER JOIN transmedia AS t ON (t.transmediaID = m.transmediaID)
  WHERE m.isDeleted = 0 AND m.transmediaID = ?
  ORDER BY likes DESC;`;
  const id = parseInt(req.params.id);

  dbConnection.query(sql, [id],
    (err, results, fields) => {
      if (err)
        console.log(err)
      else {
        res.send(results);
      }
    }
  );
})

//DB에서 특정 transmedia 영화 조회 : get
router.get('/:id/movie', (req, res) => {
  const sql = `SELECT movieID, title, director, t.transmediaName, m.imageURL
  FROM movie AS m
  LEFT OUTER JOIN transmedia AS t ON (t.transmediaID = m.transmediaID)
  WHERE m.isDeleted = 0 AND m.transmediaID = ?
  ORDER BY likes DESC;`;
  const id = parseInt(req.params.id);

  dbConnection.query(sql, [id],
    (err, results, fields) => {
      if (err)
        console.log(err)
      else {
        res.send(results);
      }
    }
  );
})

//DB에서 특정 transmedia 책 조회 : get
router.get('/:id/book', (req, res) => {
  const sql = `SELECT bookID, title, author, genre, t.transmediaName, b.imageURL
  FROM book AS b
  LEFT OUTER JOIN transmedia AS t ON (t.transmediaID = b.transmediaID)
  WHERE b.isDeleted = 0 AND b.transmediaID = ?
  ORDER BY likes DESC;`;
  const id = parseInt(req.params.id);

  dbConnection.query(sql, [id],
    (err, results, fields) => {
      if (err)
        console.log(err)
      else {
        res.send(results);
      }
    }
  );
})



module.exports = router;