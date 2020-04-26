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

///////세션 구현
const session = require('express-session'); //세션 미들웨어 설치
const dbStore = require('express-mysql-session')(session);  //세션 저장소로 mysql 사용
router.use(session({
    secret: '83n4h312j40231sd0a1',
    resave: false,
    saveUninitialized: true,
    store: new dbStore({
        host: dbAndApi.mysql.host,
        user: dbAndApi.mysql.user,
        password: dbAndApi.mysql.password,
        port: dbAndApi.mysql.port,
        database: dbAndApi.mysql.database
    })
}));

//DB에서 특정 user의 정보 조회: post
router.post('/', (req, res) => {
  const sql = 'SELECT * FROM users WHERE userID = ?';
  const userID = parseInt(req.body.userID);

  dbConnection.query(sql, [userID],
    (err, results, fields) => {
      if (err)
        console.log(err)
      else {
        res.send(results);
      }
    }
  );
})

//DB에서 특정 user의 음악, 영화, 책 조회 : post
router.post('/music', (req, res) => {
  const sql = "SELECT musicID, title, artist, c.categoryName, u.userName \
  FROM music AS m \
  LEFT OUTER JOIN category AS c ON (c.categoryID = m.categoryID) \
  LEFT OUTER JOIN users AS u ON (u.userID = m.adderID) \
  LEFT OUTER JOIN transmedia AS t ON (t.transmediaID = m.transmediaID) \
  WHERE (u.userID = ?) AND (m.isDeleted = 0);"
  const userID = parseInt(req.body.userID);

  dbConnection.query(sql, [userID],
    (err, results, fields) => {
      if (err)
        console.log(err)
      else { 
        res.send(results);
      }
    }
  );
})

router.post('/movie', (req, res) => {
  const sql = "SELECT movieID, title, director, actor, c.categoryName, u.userName \
  FROM movie AS m \
  LEFT OUTER JOIN category AS c ON (c.categoryID = m.categoryID) \
  LEFT OUTER JOIN users AS u ON (u.userID = m.adderID) \
  LEFT OUTER JOIN transmedia AS t ON (t.transmediaID = m.transmediaID) \
  WHERE (u.userID = ?) AND (m.isDeleted = 0);"
  const userID = req.body.userID;

  dbConnection.query(sql, [userID],
    (err, results, fields) => {
      if (err)
        console.log(err)
      else {
        res.send(results);
      }
    }
  );
})

router.post('/book', (req, res) => {
  const sql = "SELECT bookID, title, author, c.categoryName, u.userName \
  FROM book AS b \
  LEFT OUTER JOIN category AS c ON (c.categoryID = b.categoryID) \
  LEFT OUTER JOIN users AS u ON (u.userID = b.adderID) \
  LEFT OUTER JOIN transmedia AS t ON (t.transmediaID = b.transmediaID) \
  WHERE (u.userID = ?) AND (b.isDeleted = 0);"
  const userID = req.body.userID;

  dbConnection.query(sql, [userID],
    (err, results, fields) => {
      if (err)
        console.log(err)
      else {
        res.send(results);
      }
    }
  );
})

//DB에 회원 정보 입력하여 회원가입 : post
router.post('/new', (req, res) => {
  const sql = 'SELECT * FROM users WHERE userName = ?'
  const userName = req.body.userName;
  const userPassword = req.body.userPassword;
  const params = [userName, userPassword];
  let successRes = {};

  //존재하는 아이디인지 체크
  dbConnection.query(sql, [userName],
    (err, results, fields) => {
      if(err)
        res.send({"code" : 400, "alert": "회원가입에 실패했습니다. 새로고침 해주세요."});
      else {
        if(results.length > 0) {
          res.send({"code" : 204, "alert": "이미 존재하는 아이디입니다."});
        } else {
          dbConnection.query('INSERT INTO users VALUES (NULL, ?, NULL, ?);', params,
            (err, results, fields) => {
              if(err) 
                console.log(err);
              else {
                res.send({"code" : 200, "alert": "회원가입을 축하드립니다!"});
              }
            }
          )
        }
      }
    }
  );
});


//특정 정보를 입력받아 login 작업 : post
router.post('/login', (req, res) => {
  const sql = 'SELECT * FROM users WHERE userName = ?';
  const userName = req.body.userName;
  const userPassword = req.body.userPassword;

  dbConnection.query(sql, [userName], 
    (err, results, fields) => {
      if (err) {
        res.send({"code" : 400, "alert": "로그인에 실패했습니다. 새로고침 해주세요."});
      } else {
        if(results.length > 0) {
          if(results[0].userPassword === userPassword) {
            req.session.is_logined = true;
            req.session.userName = results[0].userName;
            req.session.userID = results[0].userID;
            req.session.save(() => {
              res.send({"code" : 200, "alert": "로그인을 성공했습니다!", "userID" : req.session.userID});
            });
          } else {
            res.send({"code": 204, "alert" : "비밀번호가 올바르지 않습니다."});
          }
        } else {
          res.send({"code": 204, "alert" : "존재하지 않는 아이디입니다."});
        }
      }
    }
  )
})

//자기 소개 수정 : put
router.put('/', (req, res) => {
  const sql = 'UPDATE users SET description = ? WHERE userID = ?';
  const newDescription = req.body.newDescription;
  const userID = parseInt(req.body.userID);

  dbConnection.query(sql, [newDescription, userID],
    (err, results, fields) => {
      if (err)
        console.log(err)
      else {
        res.send({"code" : 200, "alert": "성공적으로 변경했습니다!"});
      }
    }
  );
})

//logout 처리 : get
router.get('/logout', (req, res) => {
  delete req.session.is_logined;
  delete req.session.userName;
  delete req.session.userID;
  req.session.save(() => {
    res.clearCookie();
  })
})

module.exports = router;