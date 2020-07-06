import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { BookmarkItemParams } from "../modules/bookmark";
import './DBInterfaces';
import './styles/Bookmark.scss';

const useStyles = makeStyles({
  root: {
    background: 'white',
  }
})

interface BookmarkItemProps {
  bookmarkItem: BookmarkItemParams;
  onRemove: (id: number) => void;
}

interface Props {
  bookmarkItems: BookmarkItemParams[];
  onRemove: (id: number) => void;
  onRemoveAll: () => void;
}

const Bookmark: React.SFC<BookmarkItemProps> = ({ bookmarkItem, onRemove }) => {
  const classes = useStyles();

  const renderCategory = () => {
    const media = bookmarkItem.item.media;

    if(bookmarkItem.item.review.length !== 0) {
      return (
        bookmarkItem.item.review.map((categoryName: string, index) => (
          <div className="bookmark-item-category" key={index}>
            {categoryName} {media}
          </div>
        ))
      )
    }
    return <div></div>
  }

  return (
    <Grid item xs={12}>
      <Box className={classes.root} borderRadius={10}>
        <Grid container spacing={0}>
          <Grid item xs={10}>
            <div className="bookmark-item-title">{bookmarkItem.item.title}</div>
          </Grid>
          <Grid item xs={2}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
              <IconButton 
                onClick={() => onRemove(bookmarkItem.id)}
                style={{padding: '1.4rem'}}
              >
                <ClearIcon style={{fontSize: '2rem'}}/>
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <div className="bookmark-item-creator">{bookmarkItem.item.creator}</div>
        <Divider />
        <div className="bookmark-item-category-container">
          {renderCategory()}
        </div>
      </Box>
    </Grid>
  )
};

const BookmarkList: React.SFC<Props> = ({ bookmarkItems, onRemove, onRemoveAll }) => {
  const bookmarkItemList = bookmarkItems.map((bookmarkItem, index) => 
    bookmarkItem ? (
      <Bookmark
        bookmarkItem={bookmarkItem}
        onRemove={onRemove}
        key={index}
      />
    ) : null);

  return (
    <div className="bookmark-item-container">
      <Grid container spacing={1}>
        {bookmarkItemList}
      </Grid>
      {bookmarkItems.length !== 0 ? 
        <div className="bookmark-removeAll-button-container">
          <Button className="bookmark-removeAll-button"
            onClick={() => onRemoveAll()}
          >
            모두 지우기
          </Button>
        </div>
      : null}
    </div>
  )
};

export default BookmarkList;