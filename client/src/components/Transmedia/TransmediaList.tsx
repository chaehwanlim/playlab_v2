import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';

const TransmediaList = ({ match }) => {
  const [transmedia, setTransmedia] = useState<Array<Transmedia>>([]);

  useEffect(() => {
    fetch('/api/transmediaDB')
      .then(res => res.json())
      .then(res => setTransmedia(res))
      .catch(err => console.log(err))
  }, []);

  return (
    <div className="header">
      <Container maxWidth="lg">
          <header className="title">트랜스미디어</header>
          <p className="subtitle">
            트랜스미디어는 이야기를 여러가지 플랫폼과 형태로 전달하는 스토리텔링입니다. <br/>
            작품을 다양한 매체에서 접해보세요.
          </p>
        </Container>
        <Divider className="divider" />

        <Container maxWidth="lg">
          {transmedia ? transmedia.map((datum: Transmedia) => {
            return (
              <div>
                <Link to={`Transmedia/${datum.transmediaID}`}>{datum.transmediaName}</Link>
              </div>
            )
          }) : <CircularProgress />}

      </Container>
        
    </div>
  )
}

export default TransmediaList;