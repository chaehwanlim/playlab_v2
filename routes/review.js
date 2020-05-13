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
  WHERE workID > 100000 and workID < 1000000 AND isDeleted = 0`;

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
  WHERE workID > 1000000 AND workID < 10000000 AND isDeleted = 0`;

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
  WHERE workID > 10000000 and workID < 100000000 AND isDeleted = 0`;

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
router.get('/chart/music/:categoryid', (req, res) => {
  const categoryID = parseInt(req.params.categoryid);

  let sql = ``;
  if (categoryID === 100) {
    sql = "SELECT musicID, title, artist, genre, t.transmediaName, m.transmediaID, likes \
    FROM music AS m \
    LEFT OUTER JOIN transmedia AS t ON (t.transmediaID = m.transmediaID) \
    WHERE m.isDeleted = 0 \
    ORDER BY likes DESC;"
  } else {
    sql = `SELECT musicID, title, artist, genre, t.transmediaName, m.transmediaID, likes
    FROM music AS m
    LEFT OUTER JOIN transmedia AS t ON (t.transmediaID = m.transmediaID)
    JOIN reviews AS r ON (r.workID = m.musicID AND r.categoryID = ? AND r.isDeleted = 0) GROUP BY workID
    ORDER BY likes DESC;`;
  }

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
router.get('/chart/movie/:categoryid', (req, res) => {
  const categoryID = parseInt(req.params.categoryid);

  let sql = ``;
  if (categoryID === 100) {
    sql = "SELECT movieID, title, director, genre, t.transmediaName, m.transmediaID, m.imageURL, m.actor, m.year, m.userRating, likes \
    FROM movie AS m \
    LEFT OUTER JOIN transmedia AS t ON (t.transmediaID = m.transmediaID) \
    WHERE m.isDeleted = 0 \
    ORDER BY likes DESC;";
  } else {
    sql = `SELECT movieID, title, director, genre, t.transmediaName, m.transmediaID, m.imageURL, actor, year, userRating, likes
    FROM movie AS m
    LEFT OUTER JOIN transmedia AS t ON (t.transmediaID = m.transmediaID)
    JOIN reviews AS r ON (r.workID = m.movieID AND r.categoryID = ? AND r.isDeleted = 0) GROUP BY workID
    ORDER BY likes DESC;`;
  }
 
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
router.get('/chart/book/:categoryid', (req, res) => {
  const categoryID = parseInt(req.params.categoryid);

  let sql = ``;
  if (categoryID === 100) {
    sql = `SELECT bookID, title, author, genre, t.transmediaName, b.transmediaID, b.imageURL, b.description, likes \
    FROM book AS b \
    LEFT OUTER JOIN transmedia AS t ON (t.transmediaID = b.transmediaID) \
    WHERE b.isDeleted = 0 \
    ORDER BY likes DESC;`;
  } else {
    sql = `SELECT bookID, title, author, genre, t.transmediaName, b.transmediaID, b.imageURL, b.description, likes
    FROM book AS b
    LEFT OUTER JOIN transmedia AS t ON (t.transmediaID = b.transmediaID)
    JOIN reviews AS r ON (r.workID = b.bookID AND r.categoryID = ? AND r.isDeleted = 0) GROUP BY workID
    ORDER BY likes DESC;`;
  }

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

router.get('/transmedia/:id/music', (req, res) => {
  const sql = `SELECT workID, u.userName, c.categoryName
  FROM reviews AS r
  LEFT OUTER JOIN users AS u on (u.userID = r.userID)
  LEFT OUTER JOIN category AS c on (c.categoryID = r.categoryID)
  JOIN music AS m ON (m.musicID = r.workID AND m.transmediaID = ?) ORDER BY likes;`;
  const id = parseInt(req.params.id);

  dbConnection.query(sql, [id],
    (err, results, fields) => {
      if(err)
        console.log(err)
      else {
        res.send(results);
      }
    }
  );
})

router.get('/transmedia/:id/movie', (req, res) => {
  const sql = `SELECT workID, u.userName, c.categoryName
  FROM reviews AS r
  LEFT OUTER JOIN users AS u on (u.userID = r.userID)
  LEFT OUTER JOIN category AS c on (c.categoryID = r.categoryID)
  JOIN movie AS m ON (m.movieID = r.workID AND m.transmediaID = ?) ORDER BY likes;`;
  const id = parseInt(req.params.id);

  dbConnection.query(sql, [id],
    (err, results, fields) => {
      if(err)
        console.log(err)
      else {
        res.send(results);
      }
    }
  );
})

router.get('/transmedia/:id/book', (req, res) => {
  const sql = `SELECT workID, u.userName, c.categoryName
  FROM reviews AS r
  LEFT OUTER JOIN users AS u on (u.userID = r.userID)
  LEFT OUTER JOIN category AS c on (c.categoryID = r.categoryID)
  JOIN book AS b ON (b.bookID = r.workID AND b.transmediaID = ?) ORDER BY likes;`;
  const id = parseInt(req.params.id);

  dbConnection.query(sql, [id],
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