import React from 'react';
import TransmediaMusic from '../components/Transmedia/TransmediaMusic';
import { useDispatch } from 'react-redux';
import { add } from '../modules/bookmark';

const MusicPopularContainer = ({ id }) => {
  const dispatch = useDispatch();

  const onAdd = (item: BookmarkItem) => {
    dispatch(add(item));
  }

  return (
    <TransmediaMusic
      id={id}
      onAdd={onAdd}
    />
  )
}

export default MusicPopularContainer;