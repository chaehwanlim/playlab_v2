import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { white, black } from '../modules/AppBarStyle';
import AppBar from '../components/AppBar';

const AppBarContainer = () => {
  const style = useSelector((state: RootState) => state.AppBarStyle);
  const dispatch = useDispatch();

  const toWhite = () => {
    dispatch(white());
  };

  const toBlack = () => {
    dispatch(black());
  };

  return (
    <AppBar style={style} toWhite={toWhite} toBlack={toBlack} />
  );

}

export default AppBarContainer;
