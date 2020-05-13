import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ThumbUp from '@material-ui/icons/ThumbUp';
import BookmarkRounded from '@material-ui/icons/BookmarkRounded';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/SearchRounded';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import MovieItem from '../Items/MovieItem';
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
  const [selectedCat, setSelectedCat] = useState<number>(100);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [reviews, setReviews] = useState<Array<ReviewItem>>([]);

  useEffect(() => {
    fetch('/api/category')
      .then(res => res.json())
      .then(res => setCategory(res))
      .catch(err => console.log(err))

    fetch('/api/review/movie')
      .then(res => res.json())
      .then(res => setReviews(res))
      .catch(err => console.log(err))

    getDB(selectedCat);
  }, []);

  const getDB = (categoryid: number) => {
    fetch(`/api/review/chart/movie/${categoryid}`)
      .then(res => res.json())
      .then(res => setMovieDB(res))
      .catch(err => console.log(err))
  }

  const filterData = (data: PopularMovie[]) => {
    data = data.filter((datum: PopularMovie) => 
      (datum.title.indexOf(searchKeyword) > -1) ||
      (datum.actor.indexOf(searchKeyword) > -1) ||
      (datum.transmediaName.indexOf(searchKeyword) > -1)
    );

    return data.map((datum: PopularMovie, index: number) => {
      const reviewsForOneMovie: ReviewItem[] = reviews.filter((reviewItem: ReviewItem) => 
        (reviewItem.workID === datum.movieID)
      );

      return (
        <MovieItem movie={datum} reviews={reviewsForOneMovie} index={index} buttons={true} handleLikes={handleLikes} onAdd={onAdd} key={index} />
      )
    });
  }

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  }

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const handleCategory = (e: React.ChangeEvent<{ value: number }>) => {
    setSelectedCat(e.target.value);
    getDB(e.target.value);
  }

  const handleLikes = (id: number) => {
    const urlWithID = `/api/movie/${id}`;
    Axios({
      method: 'put',
      url: urlWithID,
    })
    .then(res => {
      if(res.status === 200){
        alert('성공적으로 추천했습니다!');
        getDB(selectedCat);
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
              <MenuItem value={100} style={{fontSize: '1.7rem', fontWeight: 500}}>
              모든
              </MenuItem>
            {category ? category.map((cat: Category, index: number) => 
              <MenuItem value={cat.categoryID} style={{fontSize: '1.7rem', fontWeight: 500}} key={index}>
                {cat.categoryName}</MenuItem>
            ) : "error occured"}
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
        {movieDB ? 
        filterData(movieDB) 
        : <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}><CircularProgress /></div>}
      </Grid>
    </div>
  )
}

export default MoviePopular;