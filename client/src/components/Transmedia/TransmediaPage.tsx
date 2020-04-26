import React, { useEffect, useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Container from '@material-ui/core/Container';
import TransmediaBookContainer from '../../containers/TransmediaBookContainer';
import TransmediaMovieContainer from '../../containers/TransmediaMovieContainer';
import TransmediaMusicContainer from '../../containers/TransmediaMusicContainer';
import Footer from '../footer';
import '../DBInterfaces';
import '../styles/Content.scss';
import '../styles/Transmedia.scss';

const TransmediaPage = ({ match, history }) => {
  const [transmediaInfo, setTransmediaInfo] = useState<Array<Transmedia>>();

  useEffect(() => {
    document.body.style.backgroundColor = '#18171C';
    fetch(`/api/transmedia/${match.params.id}`)
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
        <TransmediaMusicContainer id={match.params.id}/>
        <TransmediaMovieContainer id={match.params.id}/>
        <TransmediaBookContainer id={match.params.id}/>
      </Container>
      
      {transmediaInfo ? <Footer color={'whitesmoke'} />
      : <div />}
    </div>
  )
}

export default TransmediaPage;