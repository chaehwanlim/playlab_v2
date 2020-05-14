import React from 'react';
import BookmarkList from '../components/BookmarkList';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../modules';
import { BookmarkItemParams, remove, removeAll } from '../modules/bookmark';

const BookmarkListContainer = () => {
  const bookmarkItems: BookmarkItemParams[] = useSelector((state: StoreState) => state.bookmarks.bookmarkItems);

  const dispatch = useDispatch();

  const onRemove = (id: number) => {
    dispatch(remove(id));
  }

  const onRemoveAll = () => {
    dispatch(removeAll());
  }

  return (
    <BookmarkList 
      bookmarkItems={bookmarkItems}
      onRemove={onRemove}
      onRemoveAll={onRemoveAll}
    />
  );
}

export default BookmarkListContainer;
