import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import '../DBInterfaces';
import '../styles/Transmedia.scss';

const useStyles = makeStyles({
  root: {
    background: '#202126',
  }
})

const TransmediaMovie = ({ id }) => {
  const [movie, setMovie] = useState<Array<PopularMovie>>([]);

  const classes = useStyles();

  useEffect(() => {
    fetch(`/api/Transmedia/${id}/Movie`)
      .then(res => res.json())
      .then(res => setMovie(res))
      .catch(err => console.log(err))
  }, []);

  return (
    <div>
      {movie.length !== 0 ? 
        <div>
          <div className="T-contentTitle">영화</div>
          <Grid container spacing={1}>
            {movie.map((datum: PopularMovie) => {
              return (
                <Grid item xs={12} sm={6} md={4}>
                  <Card classes={{root: classes.root}}>
                    <CardMedia component="img" height="200px" image={datum.imageURL} title={datum.title}/>
                    <div className="T-content-title">{datum.title}</div>
                    <div className="T-content-creator">{datum.director}</div>
                    <Divider className="divider" style={{backgroundColor: '#3B3A40'}} />
                    <div className="T-content-desc">{datum.userName}님의 {datum.categoryName} 영화</div>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </div>
      : <div />}
    </div>
  )
}

export default TransmediaMovie;