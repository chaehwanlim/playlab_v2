import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Divider from '@material-ui/core/Divider';
import { BookmarkItemParams } from "../modules/bookmark";
import './DBInterfaces';
import './styles/Bookmark.scss';

const useStyles = makeStyles({
  root: {
    marginTop: '1.5rem',
  }
})

interface BookmarkItemProps {
  bookmarkItem: BookmarkItemParams;
  onRemove: (id: number) => void;
}

interface Props {
  bookmarkItems: BookmarkItemParams[];
  onRemove: (id: number) => void;
}

const Bookmark: React.SFC<BookmarkItemProps> = ({ bookmarkItem, onRemove }) => {
  const classes = useStyles();

  const renderCategory = () => {
    if(bookmarkItem.item.review) {
      return (
        bookmarkItem.item.review.forEach((review: ReviewItem) => (
          <div className="bookmark-item-category">{review.categoryName} {bookmarkItem.item.media}</div>
        ))
      )
    }
  }

  return (
    <Grid item xs={12}>
      <Card classes={{root: classes.root}} elevation={3}>
        <Grid container spacing={0}>
          <Grid item xs={10}>
            <div className="bookmark-item-title">{bookmarkItem.item.title}</div>
          </Grid>
          <Grid item xs={2}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
              <IconButton 
                onClick={() => onRemove(bookmarkItem.id)}
                style={{padding: '1.5rem'}}
              >
                <ClearIcon style={{fontSize: '2rem'}}/>
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <div className="bookmark-item-creator">{bookmarkItem.item.creator}</div>
        <Divider />
        {renderCategory()}
      </Card>
    </Grid>
  )
};

const BookmarkList: React.SFC<Props> = ({ bookmarkItems, onRemove }) => {
  const bookmarkItemList = bookmarkItems.map(bookmarkItem => 
    bookmarkItem ? (
      <Bookmark
        bookmarkItem={bookmarkItem}
        onRemove={onRemove}
      />
    ) : null);

  return (
    <Grid container spacing={1}>
      {bookmarkItemList}
    </Grid>
  )
};

export default BookmarkList;