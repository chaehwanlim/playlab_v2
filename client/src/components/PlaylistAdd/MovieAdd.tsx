import React, {useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/SearchRounded';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import Axios from 'axios';
import '../styles/Add.scss';
import '../styles/Movie.scss';

const MovieAdd: React.FC = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState<WorkSelection>({
    index: -1,
    title: ''
  });
  const [form, setForm] = useState<MovieForm>({
    title: "",
    director: "",
    categoryID: 101,
    transmediaID: 10000,
    imageURL: "",
    actor: "",
    userRating: 0,
    year: 0,
  });
  const [category, setCategory] = useState<Array<Category>>([]);
  const [transmedia, setTransmedia] = useState<Array<Transmedia>>([]);

  useEffect(() => {
    fetch('/api/category')
      .then(res => res.json())
      .then(res => setCategory(res))
      .catch(err => console.log(err))
    fetch('/api/transmedia')
      .then(res => res.json())
      .then(res => setTransmedia(res))
      .catch(err => console.log(err))
  }, []);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value as string);
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSearched(true as boolean);
    searchMovie();
  }

  const searchMovie = () => {
    Axios({
      method: 'get',
      url: `/api/naver/movie/${keyword}`,
    })
    .then(res => setSearchResult(res.data.items))
    .catch(err => console.log(err));
  }

  const handleCategory = (e: React.ChangeEvent<{ value: unknown }>) => {
    setForm({
      ...form,
      categoryID : e.target.value as number
    });
  }
  const handleTransmedia = (e: React.ChangeEvent<{ value: unknown }>) => {
    setForm({
      ...form,
      transmediaID : e.target.value as number
    });
  }

  const handleMovieSelect = (index: number, title: string) => {
    setSelectedMovie({index: index, title: title});
    if (searchResult) {
      setForm({
        ...form,
        title: removeBTags(searchResult[index].title),
        director: searchResult[index].director,
        imageURL: searchResult[index].image,
        actor: searchResult[index].actor,
        userRating: searchResult[index].userRating,
        year: searchResult[index].pubDate
      });
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(sessionStorage.userName) {
      addMovie();
    } else if (sessionStorage.userName === undefined) {
      alert('로그인이 필요합니다!');
      window.location.assign('/MyPage');
    }
  }

  const addMovie = () => {
    if (form.title.length === 0) {
      alert('영화를 선택해주세요.');
      return;
    }

    Axios({
      method: 'post',
      url: '/api/movie',
      data: {
        title: form.title,
        director: form.director,
        adderID : sessionStorage.getItem('userID'),
        categoryID: form.categoryID,
        transmediaID: form.transmediaID,
        imageURL: form.imageURL,
        actor: form.actor,
        userRating: form.userRating,
        year: form.year
      }
    })
    .then(() => alert("영화를 정상적으로 추가했습니다!"))
    .catch((err) => console.log(err));
  }

  const removeBTags = (str: string) => {
    str = str.replace(/<b>/g, "");
    return str.replace(/<\/b>/g, "");
  }

  return (
    <Card className="card">
      <div className="formTitle">
        영화를 추가합니다.
      </div>
      <Divider />
      <form noValidate autoComplete="off" className="form" onSubmit={handleSearch}>
        <Paper component="form" className="webSearch" variant="outlined">
          <InputBase
            className="input"
            placeholder="영화 제목을 입력하세요."
            inputProps={{ 'aria-label': 'keyword' }}
            value={keyword}
            onChange={handleValueChange}
          />
          <IconButton type="submit" aria-label="keyword">
            <SearchIcon />
          </IconButton>
        </Paper>
      </form>

      {isSearched ? 
      <div className="guide">
        네이버 영화 검색 결과입니다.<br />
        영화를 선택하고 하단의 양식을 완성해주세요.<br/><br/><br/></div> 
      : ""}

      <Grid container spacing={4}>
        {searchResult ?
          searchResult.map((movie, index) => {
            return (
            <Grid item xs={12} md={6}>
              <div className="movie" key={index} onClick={() => handleMovieSelect(index, removeBTags(movie.title))}>
                <Grid item xs={4}>
                  <div className="moviePosterAlign">
                    <img className="moviePoster" src={movie.image} title={removeBTags(movie.title)} 
                    alt={removeBTags(movie.title)}/>
                  </div>
                </Grid>
                <Grid item xs={8}>
                  <div className="movieTitle">
                    <span style={{color: 'grey'}}>{index + 1}&nbsp;&nbsp;</span>
                    <span>{removeBTags(movie.title)}
                    <span className="movieYear">{movie.pubDate}</span></span>
                  </div>
                  <div className="movieInfo">
                    <b>감독</b> {movie.director}<br />
                    <b>출연</b> {movie.actor}<br />
                    <b>평점</b> {movie.userRating}
                  </div>
                </Grid>
              </div>
            </Grid>
          )}) : ""}
      </Grid>
      
      {isSearched ? 
        <form noValidate autoComplete="off" className="form" onSubmit={handleSubmit}>
          <div className="guide"><br/><br/>
            선택한 영화 : &nbsp;{selectedMovie.index + 1}번 &nbsp;<b>{selectedMovie.title}</b>
          </div>
          <div className="guide"><br/>이 영화는 &nbsp;
            <Select labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={form.categoryID}
              onChange={handleCategory}
              name="category"
              style={{fontSize: '1.7rem', fontWeight: 500}}>
              {category ? category.map(cat => {
                return (
                  <MenuItem value={cat.categoryID} style={{fontSize: '1.7rem', fontWeight: 500}}>
                    {cat.categoryName}</MenuItem>
                )
              }) : "error occured"}
            </Select>
          &nbsp;영화입니다.</div><br />

          <div className="guide">트랜스미디어 : &nbsp;
            <Select labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={form.transmediaID}
              onChange={handleTransmedia}
              name="transmedia"
              style={{fontSize: '1.7rem', fontWeight: 500}}>
                <MenuItem value={10000} style={{fontSize: '1.7rem', fontWeight: 500}}>
                  없음
                </MenuItem>
              {transmedia ? transmedia.map(trans => {
                return (
                  <MenuItem value={trans.transmediaID} style={{fontSize: '1.7rem', fontWeight: 500}}>
                    {trans.transmediaName}</MenuItem>
                )
              }) : "error occured"}
            </Select>
          </div>

          <Fab variant="extended" className="submitBtn" id="movie" type="submit">추가하기</Fab>
        </form>
      : ""}

    </Card>
  )
}

export default MovieAdd;