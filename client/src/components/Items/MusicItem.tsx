import React, { useState, useEffect } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import ThumbUp from '@material-ui/icons/ThumbUp';
import BookmarkRounded from '@material-ui/icons/BookmarkRounded';
import IconButton from '@material-ui/core/IconButton';

interface MusicItem {
  music: PopularMusic;
  reviews: ReviewItem[];
  index: number;
  buttons: boolean;
  handleLikes: (id: number) => void;
  onAdd: (work: BookmarkItem) => void;
}

const MusicItem: React.SFC<MusicItem> = ({ music, reviews, index, buttons, handleLikes, onAdd }) => 
{
  const linkStyle = { color: 'white', background: 'black', borderRadius: '10px', padding: '3px 5px', margin: '5px', textDecoration: 'none'};

  const renderReviews = () => (
    reviews.map((review: ReviewItem, index: number) => (
      <div key={index}>
        <b>{review.userName}</b>님의 <b>{review.categoryName}</b> 음악
      </div>
    ))
  )

  const transmediaLink = () => {
    if(music.transmediaID > 10000) {
      return (
        <div>
          <b>트랜스미디어</b>
          <a href={`Transmedia/${music.transmediaID}`} 
            style={linkStyle}
          >{music.transmediaName}</a>
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
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon style={{fontSize: '2rem'}}/>}
      >
        <Table>
        <TableBody>
        <TableRow>
          <TableCell className="tableData" id="ranking">
            {index + 1}
          </TableCell>
          <TableCell className="tableData">
            <span className="music-item-title">
              {music.title}
              {buttons ?
                <FormControlLabel
                  control={
                    <IconButton style={{padding: '0.5rem', marginLeft: '0.5rem'}} 
                      onClick={() => onAdd({
                        title: music.title,
                        creator: music.artist,
                        review: makeCatArray(reviews),
                        media: '음악'
                      })}
                    >
                      <BookmarkRounded style={{color: 'black', width: '2rem', height: '2rem'}}/>
                    </IconButton>
                  }
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                  label={null}
                  style={{margin: 0}}
                />
              : ""}
            </span>
            <br />
            {music.artist}
          </TableCell>
          <TableCell className="music-btns">
            {buttons ? 
              <FormControlLabel
                control={
                  <Button variant="contained" 
                    className="musicLikeBtn"
                    onClick={() => {handleLikes(music.musicID)}}
                  >
                    <ThumbUp />&nbsp;{music.likes}
                  </Button>
                }
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
                label={null}
                style={{margin: 0}}
              />
            : ""}
          </TableCell>
        </TableRow>
        </TableBody> 
        </Table>
      </ExpansionPanelSummary>
      
      <ExpansionPanelDetails className="tableData">
        <div>
          <b>장르</b>&nbsp;&nbsp;{music.genre}
        </div>
        {transmediaLink()}
        <div>
          {reviews ? renderReviews() : ""}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default MusicItem;