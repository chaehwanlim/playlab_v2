import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ThumbUp from '@material-ui/icons/ThumbUp';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/SearchRounded';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Axios from 'axios';
import '../styles/Content.scss';
import '../styles/Movie.scss';
import '../DBInterfaces.tsx';

interface MoviePopularProps {
  onAdd: (work: BookmarkItem) => void;
}

const MoviePopular: React.SFC<MoviePopularProps> = ({ onAdd }) => {
  const [movieDB, setMovieDB] = useState<Array<PopularMovie>>([]);
  const [category, setCategory] = useState<Array<Category>>([]);
  const [selectedCat, setSelectedCat] = useState<string>("모든");
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  useEffect(() => {
    fetch('/api/moviePopular')
      .then(res => res.json())
      .then(res => setMovieDB(res))
      .catch(err => console.log(err))
    fetch('/api/categoryDB')
      .then(res => res.json())
      .then(res => setCategory(res))
      .catch(err => console.log(err))
  }, []);

  const filterData = (data: Array<PopularMovie>) => {
    data = data.filter((datum: PopularMovie) => {
      return (
        (datum.title.indexOf(searchKeyword) > -1) ||
        (datum.actor.indexOf(searchKeyword) > -1) ||
        (datum.userName.indexOf(searchKeyword) > -1)
      );
    });

    let _selectedCat: string = selectedCat;
    if (_selectedCat === "모든") {
      _selectedCat = ""
    }

    data = data.filter((datum: PopularMovie) => {
      return (
        (datum.categoryName.indexOf(_selectedCat) > -1)
      );
    });

    return data.map((datum: PopularMovie, index: number) => {
      return (
        <Grid item xs={12} md={6}>
            <div className="movie">
                <Grid item xs={4}>
                <div className="moviePosterAlign">
                    <img className="moviePoster" src={datum.imageURL} title={datum.title} alt={datum.title}/>
                    <Button variant="contained" className="movieLikes"
                      onClick={() => {handleLikes(datum.movieID)}}
                    >
                      <ThumbUp />&nbsp;{datum.likes}
                    </Button>
                </div>
                </Grid>
                <Grid item xs={8}>
                    <div className="movieTitle">
                      <span style={{color: 'orange'}}>{index + 1}&nbsp;&nbsp;</span>
                      <span>
                        {datum.title}
                        <span className="movieYear">
                          {datum.year}
                        </span>
                        <IconButton style={{padding: '0.5rem 0.5rem 0.5rem 0.5rem', marginLeft: '0.5rem'}} 
                          onClick={() => onAdd({
                            title: datum.title,
                            creator: datum.director,
                            category: datum.categoryName,
                            media: '영화'
                          })}
                        >
                          <NoteAddIcon style={{color: 'black', width: '2rem', height: '2rem'}}/>
                        </IconButton>
                      </span>
                      
                    </div>
                    <div className="movieInfo">
                      <b>감독</b>  {datum.director}<br />
                      <b>출연</b>  {datum.actor}<br />
                      <b>평점</b>  {datum.userRating}<br />
                      <b>트랜스미디어</b>  {datum.transmediaName}
                    </div>
                    <div className="movieCategory">
                      <b>{datum.userName}</b> 님의<br />
                      <b>{datum.categoryName}</b> 영화입니다.<br />
                    </div>
                </Grid>
            </div>
        </Grid>
      )
    });
  }

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  }

  const handleClick = (e) => {
    e.preventDefault();
  }

  const handleCategory = (e) => {
    e.preventDefault();
    setSelectedCat(e.target.value);
  }

  const handleLikes = (id: number) => {
    const urlWithID = `/api/popular/like/increment/${id}`;
    Axios({
      method: 'put',
      url: urlWithID,
    })
    .then(res => {
      if(res.status === 200){
        alert('성공적으로 추천했습니다!');
        fetch('/api/moviePopular')
          .then(res => res.json())
          .then(res => setMovieDB(res))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
      <Card className="filter" elevation={3} square={true}>
        <div className="category" id="movie">
          <Select labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCat}
            onChange={handleCategory}
            name="category"
            style={{fontSize: '1.7rem', fontWeight: 500, color: '#FF4444'}}>
              <MenuItem value={"모든"} style={{fontSize: '1.7rem', fontWeight: 500}}>
              모든
              </MenuItem>
            {category ? category.map(cat => {
              return (
                <MenuItem value={cat.categoryName} style={{fontSize: '1.7rem', fontWeight: 500}}>
                  {cat.categoryName}</MenuItem>
              )
            }) : "error occured"}
          </Select>
          &nbsp; 영화의 인기 차트
        </div>
      </Card>
      <form noValidate autoComplete="off" className="form" onSubmit={handleClick}>
        <Card component="form" className="searchBar" elevation={3} square={true}>
          <InputBase
            className="input"
            placeholder="검색할 내용을 입력하세요"
            inputProps={{ 'aria-label': 'searchKeyword' }}
            value={searchKeyword}
            onChange={handleValueChange}
          />
          <IconButton type="submit" className="iconButton" aria-label="searchKeyword">
            <SearchIcon />
          </IconButton>
        </Card>
      </form>
      <br /><br />
      <Grid container spacing={4}>
        {movieDB ? filterData(movieDB) : <CircularProgress />}
      </Grid>
    </div>
  )
}

export default MoviePopular;