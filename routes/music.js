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

//DB에서 음악 차트 조회 : get
router.get('/', (req, res) => {
  const sql = "SELECT musicID, title, artist, genre, t.transmediaName, m.transmediaID, likes \
  FROM music AS m \
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

//DB에 음악 추가 : post
router.post('/', (req, res) => {
  const sql = "INSERT INTO music VALUES (NULL, ?, ?, ?, ?, ?, ?, 0, 0);"
  const title = req.body.title;
  const artist = req.body.artist;
  const genre = req.body.genre;
  const adderID = req.body.adderID;
  const categoryID = req.body.categoryID;
  const transmediaID = req.body.transmediaID;
  const params = [title, artist, genre, adderID, categoryID, transmediaID];

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

//음악 좋아요 수 증가 : put
router.put('/:id', (req, res) => {
  const sql = 'UPDATE music SET likes = likes + 1 WHERE musicID = ?';
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

//음악 삭제 : delete
router.delete('/:id', (req, res) => {
  const sql = 'UPDATE music SET isDeleted = 1 WHERE musicID = ?';
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