import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { setBookmark } from '../modules/bookmark';
import MoviePopular from '../components/Popular/MoviePopular';

const MoviePopularContainer = () => {
  const bookmarks = useSelector((state: RootState) => state.Bookmark); 
  const dispatch = useDispatch();

  const onSet = (work: BookmarkWork) => {
    dispatch(setBookmark(work));
  }

  return (
    <MoviePopular
      onSet={onSet}
    />
  )
}

export default MoviePopularContainer;