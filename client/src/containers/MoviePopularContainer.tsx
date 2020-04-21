import React from 'react';
import MoviePopular from '../components/Popular/MoviePopular';
import { useDispatch } from 'react-redux';
import { add } from '../modules/bookmark';

const MoviePopularContainer = () => {
  const dispatch = useDispatch();

  const onAdd = (item: BookmarkItem) => {
    dispatch(add(item));
  }

  return (
    <MoviePopular
      onAdd={onAdd}
    />
  )
}

export default MoviePopularContainer;