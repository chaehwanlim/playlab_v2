import React from 'react';
import MusicPopular from '../components/Popular/MusicPopular';
import { useDispatch } from 'react-redux';
import { add } from '../modules/bookmark';

const MusicPopularContainer = () => {
  const dispatch = useDispatch();

  const onAdd = (item: BookmarkItem) => {
    dispatch(add(item));
  }

  return (
    <MusicPopular
      onAdd={onAdd}
    />
  )
}

export default MusicPopularContainer;