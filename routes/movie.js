const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const fs = require('fs');
const dbAndApiFile = fs.readFileSync('../dbandapi.json');
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

//DB에서 영화 차트 조회 : get
router.get('/', (req, res) => {
  const sql = "SELECT movieID, title, director, genre, c.categoryName, u.userName, t.transmediaName, m.imageURL, m.actor, m.year, m.userRating, likes \
  FROM movie AS m \
  LEFT OUTER JOIN category AS c ON (c.categoryID = m.categoryID) \
  LEFT OUTER JOIN users AS u ON (u.userID = m.adderID) \
  LEFT OUTER JOIN transmedia AS t ON (t.transmediaID = m.transmediaID) \
  WHERE m.isDeleted = 0 \
  ORDER BY likes DESC;"
  
  dbConnection.query(sql, 
    (err, results, fields) => {
      if (err)
        console.log(err)
      else {
        res.send(results);
      }
    }
  );
})

//DB에 영화 추가 : post
router.post('/', (req, res) => {
  const sql = "INSERT INTO movie VALUES (NULL, ?, ?, NULL, ?, ?, ?, ?, ?, ?, 0, ?, 0);"
  const title = req.body.title;
  const director = req.body.director;
  const adderID = req.body.adderID;
  const categoryID = req.body.categoryID;
  const transmediaID = req.body.transmediaID;
  const imageURL = req.body.imageURL;
  const actor = req.body.actor;
  const userRating = req.body.userRating;
  const year = parseInt(req.body.year);
  const params = [title, director, adderID, categoryID, transmediaID, imageURL, actor, userRating, year];

  dbConnection.query(sql, params,
    (err, results, fields) => {
      if (err)
        console.log(err)
      else {
        res.send(results);
      }
    }
  );
});

//영화 좋아요 수 증가 : put
router.put('/:id', (req, res) => {
  const sql = 'UPDATE movie SET likes = likes + 1 WHERE movieID = ?';
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

//영화 삭제 : delete
router.delete('/:id', (req, res) => {
  const sql = 'UPDATE movie SET isDeleted = 1 WHERE movieID = ?';
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