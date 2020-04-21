import React from 'react';
import TransmediaMovie from '../components/Transmedia/TransmediaMovie';
import { useDispatch } from 'react-redux';
import { add } from '../modules/bookmark';

const MoviePopularContainer = ({ id }) => {
  const dispatch = useDispatch();

  const onAdd = (item: BookmarkItem) => {
    dispatch(add(item));
  }

  return (
    <TransmediaMovie
      id={id}
      onAdd={onAdd}
    />
  )
}

export default MoviePopularContainer;