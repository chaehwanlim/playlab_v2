import React from 'react';
import TransmediaBook from '../components/Transmedia/TransmediaBook';
import { useDispatch } from 'react-redux';
import { add } from '../modules/bookmark';

const BookPopularContainer = ({ id }) => {
  const dispatch = useDispatch();

  const onAdd = (item: BookmarkItem) => {
    dispatch(add(item));
  }

  return (
    <TransmediaBook
      id={id}
      onAdd={onAdd}
    />
  )
}

export default BookPopularContainer;