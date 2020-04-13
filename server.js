const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
global.fetch = require("node-fetch");

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

/* //Gzip압축 사용
app.use(express.compress()); */
//request.body에 오는 데이터를 json 형식으로 변환
app.use(bodyParser.json());
//request.body에 대한 url encoding을 확장할 수 있도록 true option 설정
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/categoryDB', (req, res) => {
    dbConnection.query(
        "SELECT * FROM category WHERE categoryID > 100;",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.get('/api/transmediaDB', (req, res) => {
    dbConnection.query(
        "SELECT * FROM transmedia WHERE transmediaID > 10000;",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

//프론트단에서 보낸 영화 검색 키워드를 받아 변수에 담는다.
app.get('/api/movieSearch/:search', (req, res) => {
    let movieKeyword = {
        query: req.params.search,
        start: 1,
        display: 30,
        yearfrom: 1970,
        yearto: 2020,
    };

    let naverapi_url = 'https://openapi.naver.com/v1/search/movie';
    let request = require('request');
    let options = {
        qs: movieKeyword,
        url: naverapi_url,
        headers: {
            'X-Naver-Client-Id': dbAndApi.naver.clientID, 
            'X-Naver-Client-Secret': dbAndApi.naver.clientSecret
        }
    };
    request.get(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            res.send(body);
        } else {
            res.status(response.statusCode).end();
            console.log(`error = ${response.statusCode}`);
        }
    });
});

app.get('/api/bookSearch/:search', (req, res) => {
    let bookKeyword = {
        query: req.params.search,
        start: 1,
        display: 20,
    };
    let naverapi_url = 'https://openapi.naver.com/v1/search/book';
    let request = require('request');
    let options = {
        qs: bookKeyword,
        url: naverapi_url,
        headers: {
            'X-Naver-Client-Id': dbAndApi.naver.clientID, 
            'X-Naver-Client-Secret': dbAndApi.naver.clientSecret
        }
    };
    request.get(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            res.send(body);
        } else {
            res.status(response.statusCode).end();
            console.log(`error = ${response.statusCode}`);
        }
    });
});


//post: 읽어서 sql 보내기
app.post('/api/musicAdd', (req, res) => {
    let sql = "INSERT INTO music VALUES (NULL, ?, ?, ?, ?, ?, ?, 0, 0);"
    let title = req.body.title;
    let artist = req.body.artist;
    let genre = req.body.genre;
    let adderID = req.body.adderID;
    let categoryID = req.body.categoryID;
    let transmediaID = req.body.transmediaID;
    let params = [title, artist, genre, adderID, categoryID, transmediaID];
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

app.post('/api/movieAdd', (req, res) => {
    let sql = "INSERT INTO movie VALUES (NULL, ?, ?, NULL, ?, ?, ?, ?, ?, ?, 0, ?, 0);"
    let title = req.body.title;
    let director = req.body.director;
    let adderID = req.body.adderID;
    let categoryID = req.body.categoryID;
    let transmediaID = req.body.transmediaID;
    let imageURL = req.body.imageURL;
    let actor = req.body.actor;
    let userRating = req.body.userRating;
    let year = parseInt(req.body.year);
    let params = [title, director, adderID, categoryID, transmediaID, imageURL, actor, userRating, year];
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

app.post('/api/bookAdd', (req, res) => {
    let sql = "INSERT INTO book VALUES (NULL, ?, ?, NULL, ?, ?, ?, ?, ?, 0, 0);"
    let title = req.body.title;
    let author = req.body.author;
    let adderID = req.body.adderID;
    let categoryID = req.body.categoryID;
    let transmediaID = req.body.transmediaID;
    let imageURL = req.body.imageURL;
    let description = req.body.description;
    let params = [title, author, adderID, categoryID, transmediaID, imageURL, description];
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

///////인기 차트
app.get('/api/musicPopular', (req, res) => {
    let sql = "SELECT musicID, title, artist, genre, c.categoryName, u.userName, t.transmediaName, likes \
    FROM music AS m \
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
app.get('/api/moviePopular', (req, res) => {
    let sql = "SELECT movieID, title, director, genre, c.categoryName, u.userName, t.transmediaName, m.imageURL, m.actor, m.year, m.userRating, likes \
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
app.get('/api/bookPopular', (req, res) => {
    let sql = "SELECT bookID, title, author, genre, c.categoryName, u.userName, t.transmediaName, b.imageURL, b.description, likes \
    FROM book AS b \
    LEFT OUTER JOIN category AS c ON (c.categoryID = b.categoryID) \
    LEFT OUTER JOIN users AS u ON (u.userID = b.adderID) \
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
app.put('/api/popular/like/increment/:id', (req, res) => {
    const sqlMusic = 'UPDATE music SET likes = likes + 1 WHERE musicID = ?';
    const sqlMovie = 'UPDATE movie SET likes = likes + 1 WHERE movieID = ?';
    const sqlBook = 'UPDATE book SET likes = likes + 1 WHERE bookID = ?';

    let id = parseInt(req.params.id);
    let sql;

    if (id < 1000000) {
        sql = sqlMusic;
    } else if ((1000000 < id) && (id < 10000000)) {
        sql = sqlMovie;
    } else if ((10000000 < id) && (id < 100000000)) {
        sql = sqlBook;
    }
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


/////회원가입
app.post('/api/register', (req, res) => {
    let sql = 'INSERT INTO users VALUES (NULL, ?, NULL, ?);'
    let userName = req.body.userName;
    let userPassword = req.body.userPassword;
    let params = [userName, userPassword];
    dbConnection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
            console.log('user create query succeed');
        }
    );
});

///////세션 구현
const session = require('express-session'); //세션 미들웨어 설치
const dbStore = require('express-mysql-session')(session);  //세션 저장소로 mysql 사용
app.use(session({
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

app.post('/api/login_process', (req, res) => {
    let sql = 'SELECT * FROM users WHERE userName = ?';
    let userName = req.body.userName;
    let userPassword = req.body.userPassword;
    /* console.log(req.body.userName); */
    dbConnection.query(sql, [userName], 
        (err, results, fields) => {
            if (err) {
                res.send({"code" : 400, "failed": "로그인에 실패했습니다. 새로고침 해주세요."});
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

app.get('/api/logout', (req, res) => {
    delete req.session.is_logined;
    delete req.session.userName;
    delete req.session.userID;
    req.session.save(() => {
        res.clearCookie();
    })
})


//프로필
app.post('/api/myPage/', (req, res) => {
    let sql = 'SELECT * FROM users WHERE userName = ?';
    let userName = req.body.userName;
    dbConnection.query(sql, [userName],
        (err, results, fields) => {
            if (err)
                console.log(err)
            else {
                res.send(results);
            }
        }
    );
})

app.post('/api/myPage/music', (req, res) => {
    let sql = "SELECT musicID, title, artist, c.categoryName, u.userName \
    FROM music AS m \
    LEFT OUTER JOIN category AS c ON (c.categoryID = m.categoryID) \
    LEFT OUTER JOIN users AS u ON (u.userID = m.adderID) \
    LEFT OUTER JOIN transmedia AS t ON (t.transmediaID = m.transmediaID) \
    WHERE (u.userName = ?) AND (m.isDeleted = 0);"
    let userName = req.body.userName;
    dbConnection.query(sql, [userName],
        (err, results, fields) => {
            if (err)
                console.log(err)
            else {
                res.send(results);
            }
        }
    );
})
app.post('/api/myPage/movie', (req, res) => {
    let sql = "SELECT movieID, title, director, actor, c.categoryName, u.userName \
    FROM movie AS m \
    LEFT OUTER JOIN category AS c ON (c.categoryID = m.categoryID) \
    LEFT OUTER JOIN users AS u ON (u.userID = m.adderID) \
    LEFT OUTER JOIN transmedia AS t ON (t.transmediaID = m.transmediaID) \
    WHERE (u.userName = ?) AND (m.isDeleted = 0);"
    let userName = req.body.userName;
    dbConnection.query(sql, [userName],
        (err, results, fields) => {
            if (err)
                console.log(err)
            else {
                res.send(results);
            }
        }
    );
})
app.post('/api/myPage/book', (req, res) => {
    let sql = "SELECT bookID, title, author, c.categoryName, u.userName \
    FROM book AS b \
    LEFT OUTER JOIN category AS c ON (c.categoryID = b.categoryID) \
    LEFT OUTER JOIN users AS u ON (u.userID = b.adderID) \
    LEFT OUTER JOIN transmedia AS t ON (t.transmediaID = b.transmediaID) \
    WHERE (u.userName = ?) AND (b.isDeleted = 0);"
    let userName = req.body.userName;
    dbConnection.query(sql, [userName],
        (err, results, fields) => {
            if (err)
                console.log(err)
            else {
                res.send(results);
            }
        }
    );
})

app.delete('/api/myPage/delete/:id', (req, res) => {
    const sqlMusic = 'UPDATE music SET isDeleted = 1 WHERE musicID = ?';
    const sqlMovie = 'UPDATE movie SET isDeleted = 1 WHERE movieID = ?';
    const sqlBook = 'UPDATE book SET isDeleted = 1 WHERE bookID = ?';
    let id = parseInt(req.params.id);
    let sql;
    if (id < 1000000) {
        sql = sqlMusic;
    } else if ((1000000 < id) && (id < 10000000)) {
        sql = sqlMovie;
    } else if ((10000000 < id) && (id < 100000000)) {
        sql = sqlBook;
    }
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

//Transmedia
//TransmediaInfo
app.get('/api/Transmedia/:id/Info', (req, res) => {
    const id = parseInt(req.params.id);
    const sqlTransmediaInfo = 'SELECT * FROM transmedia WHERE transmediaID = ?';
    dbConnection.query(sqlTransmediaInfo, [id],
        (err, results, fields) => {
            if (err)
                console.log(err)
            else {
                res.send(results);
            }
        }
    );
})

app.get('/api/Transmedia/:id/Music', (req, res) => {
    const id = parseInt(req.params.id);
    const sqlTransmediaMusic = "SELECT musicID, title, artist, genre, c.categoryName, u.userName, t.transmediaName, likes \
    FROM music AS m \
    LEFT OUTER JOIN category AS c ON (c.categoryID = m.categoryID) \
    LEFT OUTER JOIN users AS u ON (u.userID = m.adderID) \
    LEFT OUTER JOIN transmedia AS t ON (t.transmediaID = m.transmediaID) \
    WHERE m.isDeleted = 0 AND m.transmediaID = ? \
    ORDER BY likes DESC;";
    
    dbConnection.query(sqlTransmediaMusic, [id],
        (err, results, fields) => {
            if (err)
                console.log(err)
            else {
                res.send(results);
            }
        }
    );
})
app.get('/api/Transmedia/:id/Movie', (req, res) => {
    const id = parseInt(req.params.id);
    const sqlTransmediaMovie = "SELECT movieID, title, director, genre, c.categoryName, u.userName, t.transmediaName, m.imageURL, m.actor, m.year, m.userRating, likes \
    FROM movie AS m \
    LEFT OUTER JOIN category AS c ON (c.categoryID = m.categoryID) \
    LEFT OUTER JOIN users AS u ON (u.userID = m.adderID) \
    LEFT OUTER JOIN transmedia AS t ON (t.transmediaID = m.transmediaID) \
    WHERE m.isDeleted = 0 AND m.transmediaID = ?\
    ORDER BY likes DESC;";
    dbConnection.query(sqlTransmediaMovie, [id],
        (err, results, fields) => {
            if (err)
                console.log(err)
            else {
                res.send(results);
            }
        }
    );
})
app.get('/api/Transmedia/:id/Book', (req, res) => {
    const id = parseInt(req.params.id);
    const sqlTransmediaBook = "SELECT bookID, title, author, genre, c.categoryName, u.userName, t.transmediaName, b.imageURL, b.description, likes \
    FROM book AS b \
    LEFT OUTER JOIN category AS c ON (c.categoryID = b.categoryID) \
    LEFT OUTER JOIN users AS u ON (u.userID = b.adderID) \
    LEFT OUTER JOIN transmedia AS t ON (t.transmediaID = b.transmediaID) \
    WHERE b.isDeleted = 0 AND b.transmediaID = ?\
    ORDER BY likes DESC;";
    dbConnection.query(sqlTransmediaBook, [id],
        (err, results, fields) => {
            if (err)
                console.log(err)
            else {
                res.send(results);
            }
        }
    );
})


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});