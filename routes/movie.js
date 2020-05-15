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

//DB에서 영화 차트 조회 : get
router.get('/', (req, res) => {
  const sql = "SELECT movieID, title, director, genre, t.transmediaName, m.transmediaID, m.imageURL, m.actor, m.year, m.userRating, likes \
  FROM movie AS m \
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
  const title = req.body.title;
  const director = req.body.director;
  const userID = req.body.adderID;
  const categoryID = req.body.categoryID;
  const transmediaID = req.body.transmediaID;
  const imageURL = req.body.imageURL;
  const actor = req.body.actor;
  const userRating = req.body.userRating;
  const year = parseInt(req.body.year);

  let workID = 0;

  //이미 존재하는 영화인지 확인하는 작업(영화 제목과 년도로 확인)
  const sqlToCheck = "SELECT movieID FROM movie WHERE title = ? AND year = ?";
  dbConnection.query(sqlToCheck, [title, year],
    (err, results, fields) => {
      if (err)
        console.log(err)
      else {
        if(results.length > 0) {  //작품이 이미 존재함
          workID = parseInt(results[0].movieID);

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

        } else { //작품이 존재하지 않아 추가함
          const sqlAddMovie = `INSERT INTO movie VALUES (NULL, ?, ?, NULL, ?, ?, ?, ?, ?, ?, 0, ?, 0);`
          const sqlAddMovieParams = [title, director, userID, categoryID, transmediaID, imageURL, actor, userRating, year];

          dbConnection.query(sqlAddMovie, sqlAddMovieParams,
            (err2, results2, fields2) => {
              if (err2) //영화 추가에 실패
                console.log(err2)
              else {  //새 영화 추가 완료
                workID = results2.insertId;

                const sqlReview = `INSERT INTO reviews VALUES (NULL, ?, ?, ?, 0);`
                const sqlReviewParams = [workID, userID, categoryID];
                dbConnection.query(sqlReview, sqlReviewParams,
                  (err3, results3, fields3) => {
                    if (err3)
                      console.log(err3)
                    else {
                      res.send(results3);
                    }
                  }
                );
              }
            }
          );
        }
      }
    }
  )
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