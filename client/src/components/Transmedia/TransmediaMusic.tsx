import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
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
  const [music, setMusic] = useState<Array<PopularMusic>>([]);

  const classes = useStyles();

  useEffect(() => {
    fetch(`/api/Transmedia/${id}/Music`)
      .then(res => res.json())
      .then(res => setMusic(res))
      .catch(err => console.log(err))
  }, []);

  return (
    <div>
      {music.length !== 0 ? 
        <div>
          <div className="T-contentTitle">음악</div>
          <Grid container spacing={1}>
            {music.map((datum: PopularMusic) => {
              return (
                <Grid item xs={12} sm={6} md={4}>
                  <Card classes={{root: classes.root}}>
                  <Grid container spacing={0}>
                      <Grid item xs={10}>
                        <div className="T-content-title">{datum.title}</div>
                      </Grid>
                      <Grid item xs={2}>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                          <IconButton style={{padding: '1.5rem'}} 
                            onClick={() => onAdd({
                              title: datum.title,
                              creator: datum.artist,
                              category: datum.categoryName,
                              media: '음악'
                            })}
                          >
                            <NoteAddIcon style={{color: 'white', width: '2rem', height: '2rem'}}/>
                          </IconButton>
                        </div>
                      </Grid>
                    </Grid>
                    <div className="T-content-creator">{datum.artist}</div>
                    <Divider className="divider" style={{backgroundColor: '#3B3A40'}} />
                    <div className="T-content-desc">{datum.userName}님의 {datum.categoryName} 음악</div>
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

export default TransmediaMusic;