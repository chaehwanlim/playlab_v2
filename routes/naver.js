const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const path = require('path');
const fs = require('fs');
const dbAndApiFile = fs.readFileSync(path.resolve(__dirname, '../', 'dbandapi.json'));
const dbAndApi = JSON.parse(dbAndApiFile);

//request.body에 오는 데이터를 json 형식으로 변환
router.use(bodyParser.json());
//request.body에 대한 url encoding을 확장할 수 있도록 true option 설정
router.use(bodyParser.urlencoded({extended: true}));

//프론트단에서 보낸 영화 검색 키워드를 받아 변수에 담는다.
router.get('/movie/:keyword', (req, res) => {
  const movieKeyword = {
    query: req.params.keyword,
    start: 1,
    display: 40,
    yearfrom: 1970,
    yearto: 2020,
  };
  const naverapi_url = 'https://openapi.naver.com/v1/search/movie';
  const request = require('request');
  const options = {
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

router.get('/book/:keyword', (req, res) => {
  const bookKeyword = {
    query: req.params.keyword,
    start: 1,
    display: 20,
  };
  const naverapi_url = 'https://openapi.naver.com/v1/search/book';
  const request = require('request');
  const options = {
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

module.exports = router;