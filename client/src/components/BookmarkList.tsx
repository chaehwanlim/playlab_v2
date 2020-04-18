import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import './DBInterfaces';
import './styles/Bookmark.scss';

const useStyles = makeStyles({
  root: {
    background: '#202126',
  }
})

type BookmarkProps = {
  bookmark: {
    id: number;
    BookmarkWork: BookmarkWork;
  };
  onRemove: (id: number) => void;
}

type BookmarkListProps = {
  bookmarks: any;
  onRemove: (id: number) => void;
}

const Bookmark = ({ bookmark, onRemove }: BookmarkProps) => {
  const { id, BookmarkWork } = bookmark;
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Card classes={{root: classes.root}}>
        <Grid item xs={10}>
          <div className="bookmark-item-title">{BookmarkWork.title}</div>
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={() => onRemove(id)}>
            <ClearIcon style={{fontSize: '2rem'}}/>
          </IconButton>
        </Grid>
        <div className="bookmark-item-creator">{BookmarkWork.creator}</div>
      </Card>
    </Grid>
  )
};

const BookmarkList = ({ bookmarks, onRemove }: BookmarkListProps) => {
  return (
    <Grid container spacing={1}>
      {bookmarks ? bookmarks.map((bookmark) => (
        <Bookmark
          bookmark={bookmark}
          key={bookmark.id}
          onRemove={onRemove} 
        />
      )) : <div />}
    </Grid>
  )
};

export default BookmarkList;