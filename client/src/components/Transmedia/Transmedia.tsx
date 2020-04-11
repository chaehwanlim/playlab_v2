import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import TransmediaList from './TransmediaList';
import TransmediaPage from './TransmediaPage';
import '../styles/Transmedia.scss';
import '../styles/Content.scss';

const Transmedia = ({ match }) => {
  return (
    <div>
      <Route exact={true} path={`${match.path}`} component={TransmediaList} />
      <Route path={`${match.path}/:id`} component={TransmediaPage} />
    </div>
  )
}

export default Transmedia;