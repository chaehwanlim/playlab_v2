import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Footer from '../footer';
import '../styles/Transmedia.scss';

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
        <header className="title" style={{color: 'white'}}>트랜스미디어</header>
        <p className="subtitle" style={{color: 'gainsboro'}}>
          트랜스미디어는 이야기를 여러 매체로 전달하는 스토리텔링입니다. <br/>
          작품을 다양한 매체에서 접해보세요.
        </p>
      </Container>
        
      <Divider className="divider" style={{backgroundColor: 'white'}} />

      
        {transmedia ? transmedia.map((datum: Transmedia) => {
          return (
            <div className="pageBox">
              <Link to={`Transmedia/${datum.transmediaID}`} 
              className="pageLink"
              style={{backgroundImage: `url(${datum.transmediaImage})`, backdropFilter: 'brightness(50%)'}}
              >
                {datum.transmediaName}
              </Link>
            </div>
            
          )
        }) : <LinearProgress color="secondary"/>}

      

      <Footer color={'whitesmoke'} />
    </div>
  )
}

export default TransmediaList;