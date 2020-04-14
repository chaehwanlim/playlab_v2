import React, { useEffect, useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Axios from 'axios';
import TransmediaBook from './TransmediaBook';
import TransmediaMovie from './TransmediaMovie';
import TransmediaMusic from './TransmediaMusic';
import Footer from '../footer';
import '../DBInterfaces';
import '../styles/Content.scss';
import '../styles/Transmedia.scss';

const TransmediaPage = ({ match, history }) => {
  const [transmediaInfo, setTransmediaInfo] = useState<Array<Transmedia>>();

  useEffect(() => {
    document.body.style.backgroundColor = '#18171C';
    fetch(`/api/Transmedia/${match.params.id}/Info`)
      .then(res => res.json())
      .then(res => setTransmediaInfo(res))
      .catch(err => console.log(err))
  }, []);

  return (
    <div>
      {transmediaInfo ? 
        <div className="transmediaImage" style={{backgroundImage: `url(${transmediaInfo[0].transmediaImage})`}} />       
      : <LinearProgress className="ImageLoading"/>}

      {transmediaInfo ?
        <div className="T-title">{transmediaInfo[0].transmediaName}</div> 
      : <div />}

      <Container maxWidth="lg">
        <TransmediaMusic id={match.params.id}/>
        <TransmediaMovie id={match.params.id}/>
        <TransmediaBook id={match.params.id}/>
      </Container>
      
      {transmediaInfo ? <Footer color={'whitesmoke'} />
      : <div />}
    </div>
  )
}

export default TransmediaPage;