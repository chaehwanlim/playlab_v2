import React, { useEffect, useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Container from '@material-ui/core/Container';
import Axios from 'axios';
import '../DBInterfaces';
import '../styles/Content.scss';
import '../styles/Transmedia.scss';

const TransmediaPage = ({ match, history }) => {
  const [transmediaInfo, setTransmediaInfo] = useState<Array<Transmedia>>();
  const [music, setMusic] = useState<Array<Music>>([]);
  const [movie, setMovie] = useState<Array<Movie>>([]);
  const [book, setBook] = useState<Array<Book>>([]);

  useEffect(() => {
    fetch(`/api/Transmedia/${match.params.id}/Info`)
      .then(res => res.json())
      .then(res => setTransmediaInfo(res))
      .catch(err => console.log(err))
    fetch(`/api/Transmedia/${match.params.id}/Music`)
      .then(res => res.json())
      .then(res => setMusic(res))
      .catch(err => console.log(err))
    fetch(`/api/Transmedia/${match.params.id}/Movie`)
      .then(res => res.json())
      .then(res => setMovie(res))
      .catch(err => console.log(err))
    fetch(`/api/Transmedia/${match.params.id}/Book`)
      .then(res => res.json())
      .then(res => setBook(res))
      .catch(err => console.log(err))
    
  }, []);

  return (
    <div>
      {transmediaInfo ? 
        <img className="transmediaImage" src={transmediaInfo[0].transmediaImage} /> 
        : <LinearProgress className="ImageLoading"/>}

      <Container maxWidth="lg">
      {transmediaInfo ?
        
          <div className="T-title">{transmediaInfo[0].transmediaName}</div>
        
        : <div />}
      </Container>
    </div>
  )
}

export default TransmediaPage;