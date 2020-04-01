import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Axios from 'axios';
import '../styles/Content.scss';
import '../styles/Movie.scss';


export default function MoviePopular() {
  const [movieDB, setMovieDB] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");

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

  const filterData = (data) => {
    data = data.filter((datum) => {
      return (
        (datum.categoryName.indexOf(selectedCat) > -1)
      );
    });
    return data.map((datum, index) => {
      return (
        <Grid item xs={12} md={6}>
            <div className="movie">
                <Grid item xs={4}>
                <div className="moviePosterAlign">
                    <img className="moviePoster" src={datum.imageURL} title={datum.title} alt={datum.title}/>
                    <Button variant="contained" className="movieLikes"
                      onClick={() => {handleLikes(datum.movieID)}}
                      ><ThumbUp />&nbsp;{datum.likes}</Button>
                </div>
                </Grid>
                <Grid item xs={8}>
                    <div className="movieTitle">
                      <span style={{color: 'orange'}}>{index + 1}&nbsp;&nbsp;</span>
                      <span>{datum.title}
                      <span className="movieYear">{datum.year}</span>
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

  const handleCategory = (e) => {
    e.preventDefault();
    setSelectedCat(e.target.value);
  }

  const handleLikes = (id) => {
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
      <Card className="filter">
        <div className="category" id="movie">
          <Select labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCat}
            onChange={handleCategory}
            name="category"
            style={{fontSize: '1.7rem', fontWeight: '500', color: '#FF4444'}}>
            {category ? category.map(cat => {
              return (
                <MenuItem value={cat.categoryName} style={{fontSize: '1.7rem', fontWeight: '500'}}>
                  {cat.categoryName}</MenuItem>
              )
            }) : "error occured"}
          </Select>
          &nbsp; 영화의 인기 차트
        </div>
      </Card>
      <br />
      <Grid container spacing={4}>
        {movieDB ? filterData(movieDB) : <div>error ocurred</div>}
      </Grid>
    </div>
  )
}