import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { delBookmark } from '../modules/bookmark';
import BookmarkList from '../components/BookmarkList';

const BookmarkListContainer = () => {
  const bookmarks = useSelector((state: RootState) => state.Bookmark);
  const dispatch = useDispatch();

  const onRemove = (id: number) => {
    dispatch(delBookmark(id));
  }

  return (
    <BookmarkList 
      bookmarks={bookmarks}
      onRemove={onRemove}
    />
  );
};

export default BookmarkListContainer;