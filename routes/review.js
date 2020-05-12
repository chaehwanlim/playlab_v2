const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

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

//request.body에 오는 데이터를 json 형식으로 변환
router.use(bodyParser.json());
//request.body에 대한 url encoding을 확장할 수 있도록 true option 설정
router.use(bodyParser.urlencoded({extended: true}));

//DB에서 음악 리뷰 조회 : get
router.get('/music', (req, res) => {
  const sql = `SELECT workID, userName, categoryName
  FROM reviews as r
  LEFT OUTER JOIN users AS u on (u.userID = r.userID)
  LEFT OUTER JOIN category AS c on (c.categoryID = r.categoryID)
  WHERE workID > 100000 and workID < 1000000`;

  dbConnection.query(sql,
    (err, results, fields) => {
      if(err)
        console.log(err)
      else {
        res.send(results);
      }
    }
  );
})
//DB에서 영화 리뷰 조회 : get
router.get('/movie', (req, res) => {
  const sql = `SELECT workID, userName, categoryName
  FROM reviews as r
  LEFT OUTER JOIN users AS u on (u.userID = r.userID)
  LEFT OUTER JOIN category AS c on (c.categoryID = r.categoryID)
  WHERE workID > 1000000 and workID < 10000000`;

  dbConnection.query(sql,
    (err, results, fields) => {
      if(err)
        console.log(err)
      else {
        res.send(results);
      }
    }
  );
})
//DB에서 책 리뷰 조회 : get
router.get('/book', (req, res) => {
  const sql = `SELECT workID, userName, categoryName
  FROM reviews as r
  LEFT OUTER JOIN users AS u on (u.userID = r.userID)
  LEFT OUTER JOIN category AS c on (c.categoryID = r.categoryID)
  WHERE workID > 10000000 and workID < 100000000`;

  dbConnection.query(sql,
    (err, results, fields) => {
      if(err)
        console.log(err)
      else {
        res.send(results);
      }
    }
  );
})

//DB에서 특정 감상평이 존재하는 음악 조회 : get
router.get('/music/:categoryid', (req, res) => {
  const sql = "SELECT musicID, title, artist, genre, t.transmediaName, likes \
  FROM music AS m \
  LEFT OUTER JOIN transmedia AS t ON (t.transmediaID = m.transmediaID) \
  WHERE musicID = (SELECT workID FROM reviews WHERE categoryID = ? AND isDeleted = 0) \
  ORDER BY likes DESC \
  GROUP BY musicID";
  const categoryID = parseInt(req.params.categoryid);

  dbConnection.query(sql, [categoryID],
    (err, results, fields) => {
      if(err)
        console.log(err)
      else {
        res.send(results);
      }
    }
  );
})

//DB에서 특정 감상평이 존재하는 영화 조회 : get
router.get('/movie/:categoryid', (req, res) => {
  const sql = "SELECT movieID, title, director, genre, t.transmediaName, m.imageURL, actor, year, userRating, likes \
  FROM movie AS m \
  LEFT OUTER JOIN transmedia AS t ON (t.transmediaID = m.transmediaID) \
  WHERE movieID = (SELECT workID FROM reviews WHERE categoryID = ? AND isDeleted = 0) \
  ORDER BY likes DESC \
  GROUP BY movieID";
  const categoryID = parseInt(req.params.categoryid);

  dbConnection.query(sql, [categoryID],
    (err, results, fields) => {
      if(err)
        console.log(err)
      else {
        res.send(results);
      }
    }
  );
})

//DB에서 특정 감상평이 존재하는 책 조회 : get
router.get('/book/:categoryid', (req, res) => {
  const sql = "SELECT bookID, title, author, genre, t.transmediaName, b.imageURL, b.description, likes \
  FROM book AS b \
  LEFT OUTER JOIN transmedia AS t ON (t.transmediaID = m.transmediaID) \
  WHERE bookID = (SELECT workID FROM reviews WHERE categoryID = ? AND isDeleted = 0) \
  ORDER BY likes DESC \
  GROUP BY bookID";
  const categoryID = parseInt(req.params.categoryid);

  dbConnection.query(sql, [categoryID],
    (err, results, fields) => {
      if(err)
        console.log(err)
      else {
        res.send(results);
      }
    }
  );
})

module.exports = router;