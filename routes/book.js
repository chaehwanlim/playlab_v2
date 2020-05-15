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
  const title = req.body.title;
  const author = req.body.author;
  const userID = req.body.adderID;
  const categoryID = req.body.categoryID;
  const transmediaID = req.body.transmediaID;
  const imageURL = req.body.imageURL;
  const description = req.body.description;

  let workID = 0;

  const sqlToCheck = `SELECT bookID FROM book WHERE title = ? AND author = ?`;
  dbConnection.query(sqlToCheck, [title, author],
    (err, results, fields) => {
      if (err)
        console.log(err)
      else {
        if(results.length > 0) {  //작품이 이미 존재함
          workID = parseInt(results[0].bookID);

          const sqlReview = `INSERT INTO reviews VALUES (NULL, ?, ?, ?, 0);`
          const sqlReviewParams = [workID, userID, categoryID];
          dbConnection.query(sqlReview, sqlReviewParams,
            (err2, results2, fields2) => {
              if (err2) //리뷰 추가에 실패
                console.log(err2)
              else {  //리뷰 추가 성공
                res.send(results2);
              }
            }
          );

        } else {  //작품이 존재하지 않아 추가함
          const sqlAddBook = `INSERT INTO book VALUES (NULL, ?, ?, NULL, ?, ?, ?, ?, ?, 0, 0);`
          const sqlAddBookParams = [title, author, userID, categoryID, transmediaID, imageURL, description];

          dbConnection.query(sqlAddBook, sqlAddBookParams,
            (err2, results2, fields2) => {
              if(err2)  //책 추가에 실패
                console.log(err2);
              else {  //새 책 추가 완료
                workID = results2.insertId;

                const sqlReview = `INSERT INTO reviews VALUES (NULL, ?, ?, ?, 0);`
                const sqlReviewParams = [workID, userID, categoryID];
                dbConnection.query(sqlReview, sqlReviewParams,
                  (err3, results3, fields3) => {
                    if (err3) //리뷰 추가에 실패
                      console.log(err3)
                    else {  //리뷰 추가 성공
                      res.send(results3);
                    }
                  }
                );
              }
            }  
          )
        }
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