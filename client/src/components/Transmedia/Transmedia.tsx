import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import TransmediaList from './TransmediaList';
import TransmediaPage from './TransmediaPage';
import '../styles/Transmedia.scss';
import '../styles/Content.scss';

import { useDispatch } from 'react-redux';
import { darkMode } from '../../modules/appbar';

const Transmedia = ({ match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(darkMode());
  }, []);

  return (
    <div>
      <Route exact={true} path={`${match.path}`} component={TransmediaList} />
      <Route path={`${match.path}/:id`} component={TransmediaPage} />
    </div>
  )
}

export default Transmedia;