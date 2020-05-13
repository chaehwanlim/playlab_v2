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

//DB에서 책 차트 조회 : get
router.get('/', (req, res) => {
  const sql = "SELECT bookID, title, author, genre, t.transmediaName, b.transmediaID, b.imageURL, b.description, likes \
  FROM book AS b \
  LEFT OUTER JOIN transmedia AS t ON (t.transmediaID = b.transmediaID) \
  WHERE b.isDeleted = 0 \
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

//DB에 책 추가 : put
router.post('/', (req, res) => {
  const sql = "INSERT INTO book VALUES (NULL, ?, ?, NULL, ?, ?, ?, ?, ?, 0, 0);"
  const title = req.body.title;
  const author = req.body.author;
  const adderID = req.body.adderID;
  const categoryID = req.body.categoryID;
  const transmediaID = req.body.transmediaID;
  const imageURL = req.body.imageURL;
  const description = req.body.description;
  const params = [title, author, adderID, categoryID, transmediaID, imageURL, description];

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

//책 좋아요 수 증가 : put
router.put('/:id', (req, res) => {
  const sql = 'UPDATE book SET likes = likes + 1 WHERE bookID = ?';
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

//책 삭제 : delete
router.delete('/:id', (req, res) => {
  const sql = 'UPDATE book SET isDeleted = 1 WHERE bookID = ?';
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