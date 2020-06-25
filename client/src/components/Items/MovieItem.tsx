import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ThumbUp from '@material-ui/icons/ThumbUp';
import IconButton from '@material-ui/core/IconButton';
import BookmarkRounded from '@material-ui/icons/BookmarkRounded';
import Box from '@material-ui/core/Box';

interface MovieItem {
  movie: PopularMovie;
  reviews: ReviewItem[];
  index: number;
  buttons: boolean;
  handleLikes: (id: number) => void;
  onAdd: (work: BookmarkItem) => void;
}

const MovieItem: React.SFC<MovieItem> = ({ movie, reviews, index, buttons, handleLikes, onAdd }) =>
{
  const linkStyle = { color: 'white', background: 'slategrey', borderRadius: '10px', padding: '3px 5px', margin: '5px', textDecoration: 'none'};

  const renderReviews = () => (
    reviews.map((review: ReviewItem, index: number) => (
      <div key={index}>
        <b>{review.userName}</b>님의 <b>{review.categoryName}</b> 영화
      </div>
    ))
  )

  const transmediaLink = () => {
    if(movie.transmediaID > 10000) {
      return (
        <div>
          <b>트랜스미디어</b>
          <a href={`Transmedia/${movie.transmediaID}`} 
            style={linkStyle}
          >{movie.transmediaName}</a>
        </div>
      )
    } else return <div></div>
  }

  const makeCatArray = (reviewsForOneMusic: ReviewItem[]) => {
    const catArray: string[] = [];
    reviewsForOneMusic.map((review: ReviewItem) => { catArray.push(review.categoryName) });

    return catArray;
  }

  return (
    <Grid item xs={12} md={6}>
      <Box className="movie" borderRadius={10}>
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
                      review: makeCatArray(reviews),
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
            {transmediaLink()}
          </div>
          <div className="movieCategory">
            {reviews ? renderReviews() : ""}
          </div>
        </Grid>
      </Box>
    </Grid>
  )

}

export default MovieItem;