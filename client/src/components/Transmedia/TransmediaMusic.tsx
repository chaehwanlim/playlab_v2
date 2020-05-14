import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
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

interface TransmediaMusicProps {
  id: number;
  onAdd: (work: BookmarkItem) => void;
}

const TransmediaMusic: React.SFC<TransmediaMusicProps> = ({ id, onAdd }) => {
  const [music, setMusic] = useState<PopularMusic[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);

  const classes = useStyles();

  useEffect(() => {
    fetch(`/api/transmedia/${id}/music`)
      .then(res => res.json())
      .then(res => setMusic(res))
      .catch(err => console.log(err))

    fetch(`/api/review/transmedia/${id}/music`)
      .then(res => res.json())
      .then(res => setReviews(res))
      .catch(err => console.log(err))
  }, []);

  const makeCatArray = (reviewsForOneMusic: ReviewItem[]) => {
    const catArray: string[] = [];
    reviewsForOneMusic.map((review: ReviewItem) => { catArray.push(review.categoryName) });

    return catArray;
  }

  const renderMusic = (music: PopularMusic) => {
    const reviewsForOneMusic = reviews.filter((review: ReviewItem) => music.musicID === review.workID);

      return (
        <Grid item xs={12} sm={6} md={4}>
          <Card classes={{root: classes.root}}>
          <Grid container spacing={0}>
              <Grid item xs={10}>
                <div className="T-content-title">{music.title}</div>
              </Grid>
              <Grid item xs={2}>
                <div className="T-content-btn">
                  <IconButton style={{padding: '1.5rem'}} 
                    onClick={() => onAdd({
                      title: music.title,
                      creator: music.artist,
                      review: makeCatArray(reviewsForOneMusic),
                      media: '음악'
                    })}
                  >
                    <BookmarkRounded style={{color: 'white', width: '2rem', height: '2rem'}}/>
                  </IconButton>
                </div>
              </Grid>
            </Grid>
            <div className="T-content-creator">{music.artist}</div>
            <Divider className="divider" style={{backgroundColor: '#3B3A40'}} />
            <div className="T-content-desc-container">
            {renderReviews(reviewsForOneMusic)}
          </div>
          </Card>
        </Grid>
      )
  }

  const renderReviews = (reviewsForOneMusic: ReviewItem[]) => (
    reviewsForOneMusic.map((review: ReviewItem) => 
      <div className="T-content-desc">{review.userName}님의 {review.categoryName} 음악</div>
    )
  )

  return (
    <div>
      {music.length !== 0 ? 
        <div>
          <div className="T-contentTitle">음악</div>
          <Grid container spacing={1}>
            {music.map((datum: PopularMusic) => 
              renderMusic(datum)
            )}
          </Grid>
        </div>
      : <div />}
    </div>
  )
}

export default TransmediaMusic;