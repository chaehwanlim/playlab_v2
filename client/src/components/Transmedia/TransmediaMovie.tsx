import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import BookmarkRounded from '@material-ui/icons/BookmarkRounded';
import IconButton from '@material-ui/core/IconButton';
import '../DBInterfaces';
import '../styles/Transmedia.scss';

const useStyles = makeStyles({
  root: {
    background: '#202126',
  }
})

interface TransmediaMovieProps {
  id: number;
  onAdd: (work: BookmarkItem) => void;
}

const TransmediaMovie: React.SFC<TransmediaMovieProps> = ({ id, onAdd }) => {
  const [movie, setMovie] = useState<PopularMovie[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);

  const classes = useStyles();

  useEffect(() => {
    fetch(`/api/transmedia/${id}/movie`)
      .then(res => res.json())
      .then(res => setMovie(res))
      .catch(err => console.log(err))

    fetch(`/api/review/transmedia/${id}/movie`)
      .then(res => res.json())
      .then(res => setReviews(res))
      .catch(err => console.log(err))
  }, []);

  const renderMovie = (movie: PopularMovie) => {
    const reviewsForOneMovie = reviews.filter((review: ReviewItem) => movie.movieID === review.workID);

    return (
      <Grid item xs={12} sm={6} md={4}>
        <Card classes={{root: classes.root}}>
          <CardMedia component="img" height="200px" image={movie.imageURL} title={movie.title}/>
          <Grid container spacing={0}>
            <Grid item xs={10}>
              <div className="T-content-title">{movie.title}</div>
            </Grid>
            <Grid item xs={2}>
              <div className="T-content-btn">
                <IconButton style={{padding: '1.5rem'}} 
                  onClick={() => onAdd({
                    title: movie.title,
                    creator: movie.director,
                    review: reviewsForOneMovie,
                    media: '영화'
                  })}
                >
                  <BookmarkRounded
                  style={{color: 'white', width: '2rem', height: '2rem'}}/>
                </IconButton>
              </div>
            </Grid>
          </Grid>
          <div className="T-content-creator">{movie.director}</div>
          <Divider className="divider" style={{backgroundColor: '#3B3A40'}} />
          <div className="T-content-desc-container">
            {renderReviews(reviewsForOneMovie)}
          </div>
        </Card>
      </Grid>
    )
  }

  const renderReviews = (reviewsForOneMovie: ReviewItem[]) => (
    reviewsForOneMovie.map((review: ReviewItem) => 
      <div className="T-content-desc">{review.userName}님의 {review.categoryName} 영화</div>
    )
  )
  return (
    <div>
      {movie.length !== 0 ? 
        <div>
          <div className="T-contentTitle">영화</div>
          <Grid container spacing={1}>
            {movie.map((datum: PopularMovie) => 
              renderMovie(datum)
            )}
          </Grid>
        </div>
      : <div />}
    </div>
  )
}

export default TransmediaMovie;