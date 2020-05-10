import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ThumbUp from '@material-ui/icons/ThumbUp';
import IconButton from '@material-ui/core/IconButton';
import BookmarkRounded from '@material-ui/icons/BookmarkRounded';
import Axios from 'axios';

interface MovieItem {
  movie: PopularMovie;
  index: number;
  buttons: boolean;
  handleLikes: (id: number) => void;
  onAdd: (work: BookmarkItem) => void;
}

const MovieItem: React.SFC<MovieItem> = ({ movie, index, buttons, handleLikes, onAdd }) =>
{
  const [reviews, setReviews] = useState<Array<ReviewItem> | any>([]);

  useEffect(() => {
    Axios({
      method: 'get',
      url: `/api/review/${movie.movieID}`
    })
    .then(res => setReviews(res))
    .catch(err => console.log(err));
  }, []);

  return (
    <Grid item xs={12} md={6}>
      <div className="movie">
        <Grid item xs={4}>
        <div className="moviePosterAlign">
          <img className="moviePoster" src={movie.imageURL} title={movie.title} alt={movie.title}/>
          {buttons ?
          <Button variant="contained" className="movieLikes"
            onClick={() => {handleLikes(movie.movieID)}}
          >
            <ThumbUp />&nbsp;{movie.likes}
          </Button>
          : ""}
        </div>
        </Grid>
        <Grid item xs={8}>
          <div className="movieTitle">
            <Grid container spacing={0}>
              <Grid item xs={10}>
              <span style={{color: 'orange'}}>
                {index + 1}&nbsp;&nbsp;
              </span>
              <span>
                {movie.title}
                <span className="movieYear">
                  {movie.year}
                </span>
              </span>
              </Grid>
              {buttons ? 
              <Grid item xs={2}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                  <IconButton style={{padding: '1rem'}} 
                    onClick={() => onAdd({
                      title: movie.title,
                      creator: movie.director,
                      category: movie.categoryName,
                      media: '영화'
                    })}
                  >
                    <BookmarkRounded style={{color: 'black', width: '2rem', height: '2rem'}}/>
                  </IconButton>
                </div>
              </Grid>
              : ""}
            </Grid>
          </div>
          <div className="movieInfo">
            <b>감독</b>  {movie.director}<br />
            <b>출연</b>  {movie.actor}<br />
            <b>평점</b>  {movie.userRating}<br />
            <b>트랜스미디어</b>  {movie.transmediaName}
          </div>
          <div className="movieCategory">
            <b>{movie.userName}</b> 님의<br />
            <b>{movie.categoryName}</b> 영화입니다.<br />
          </div>
        </Grid>
      </div>
    </Grid>
  )
}

export default MovieItem;