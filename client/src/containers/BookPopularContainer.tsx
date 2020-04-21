import React from 'react';
import BookPopular from '../components/Popular/BookPopular';
import { useDispatch } from 'react-redux';
import { add } from '../modules/bookmark';

const BookPopularContainer = () => {
  const dispatch = useDispatch();

  const onAdd = (item: BookmarkItem) => {
    dispatch(add(item));
  }

  return (
    <BookPopular
      onAdd={onAdd}
    />
  )
}

export default BookPopularContainer;