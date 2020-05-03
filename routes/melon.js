const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const path = require('path');
const fs = require('fs');
const dbAndApiFile = fs.readFileSync(path.resolve(__dirname, '../', 'dbandapi.json'));
const dbAndApi = JSON.parse(dbAndApiFile);

const request = require('request');

//크롤링해서 받아온 데이터를 정제하는 데 사용
const cheerio = require('cheerio');

//request.body에 오는 데이터를 json 형식으로 변환
router.use(bodyParser.json());
//request.body에 대한 url encoding을 확장할 수 있도록 true option 설정
router.use(bodyParser.urlencoded({extended: true}));

//멜론 사이트에서 검색해 데이터 정제
router.get("/music/:mode/:keyword", (req, res) => {
  const mode = req.params.mode;
  const keyword = encodeURI(req.params.keyword);
  const header = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko'};

  if (mode === "title") //1번 모드 : 제목으로 검색
  { 
    const melonUrl = `https://www.melon.com/search/song/index.htm?q=${keyword}&section=song&searchGnbYn=Y&kkoSpl=N&kkoDpType=&ipath=srch_form`;

    const options = {
      url: melonUrl,
      headers: header
    };

    let musics = [];

    request.get(options, (error, response, body) => {
      const $ = cheerio.load(body);
      const titleList = $('a.fc_gray');
      const artistList = $('#artistName.ellipsis > a.fc_mgray');

      let i = 0;

      while(1) {
        let music = {}
        try {
          music["title"] = titleList[i].attribs.title;
          music["artist"] = artistList[i].children[0].data;
        }
        catch (e) {
          break;
        }
        musics.push(music);
        i++;
      }

      res.send(musics);
    })
  } 
  else if (mode === "artist") //2번 모드 : 아티스트로 검색
  { 
    const melonUrl = `https://www.melon.com/search/song/index.htm?q=${keyword}&section=all&searchGnbYn=Y&kkoSpl=N&kkoDpType=&ipath=srch_form`;

    const options = {
      url: melonUrl,
      headers: header
    };

    let musics = [];

    request.get(options, (error, response, body) => {
      const $ = cheerio.load(body);
      const titleList = $('a.fc_gray');
      const artistList = $('#artistName.ellipsis > a.fc_mgray > b');
  
      let i = 0;

      while(1) {
        let music = {}
        try {
          music["title"] = titleList[i].attribs.title;
          music["artist"] = artistList[i].children[0].data;
        } 
        catch (e) {
          break;
        }
        musics.push(music);
        i++;
      }

      res.send(musics);
    })
  }
  
})


module.exports = router;