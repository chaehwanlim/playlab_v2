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

interface TransmediaBookProps {
  id: number;
  onAdd: (work: BookmarkItem) => void;
}

const TransmediaBook: React.SFC<TransmediaBookProps> = ({ id, onAdd }) => {
  const [book, setBook] = useState<Array<PopularBook>>([]);

  const classes = useStyles();

  useEffect(() => {
    fetch(`/api/transmedia/${id}/book`)
      .then(res => res.json())
      .then(res => setBook(res))
      .catch(err => console.log(err))
  }, []);

  return (
    <div>
      {book.length !== 0 ? 
        <div>
          <div className="T-contentTitle">책</div>
          <Grid container spacing={1}>
            {book.map((datum: PopularBook) => {
              return (
                <Grid item xs={12} sm={6} md={4}>
                  <Card classes={{root: classes.root}}>
                    <CardMedia component="img" height="200px" image={datum.imageURL} title={datum.title}/>
                    <Grid container spacing={0}>
                      <Grid item xs={10}>
                        <div className="T-content-title">{datum.title}</div>
                      </Grid>
                      <Grid item xs={2}>
                        <div className="T-content-btn">
                          <IconButton style={{padding: '1.5rem'}} 
                            onClick={() => onAdd({
                              title: datum.title,
                              creator: datum.author,
                              category: datum.categoryName,
                              media: '책'
                            })}
                          >
                            <BookmarkRounded style={{color: 'white', width: '2rem', height: '2rem'}}/>
                          </IconButton>
                        </div>
                      </Grid>
                    </Grid>
                    <div className="T-content-creator">{datum.author}</div>
                    <Divider className="divider" style={{backgroundColor: '#3B3A40'}} />
                    <div className="T-content-desc">{datum.userName}님의 {datum.categoryName} 책</div>
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

export default TransmediaBook;