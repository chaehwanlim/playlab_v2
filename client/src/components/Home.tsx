import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import './styles/Home.scss';


const footer = () => {
    return (
        <footer style={{color: 'grey', fontSize: '1.4rem', textAlign: 'center', position: 'absolute', top: '100%'}}>
            <p>Copyright © 2020 PlayLab</p>
            <a href="mailto: chlim428@gmail.com" style={{color: 'grey'}}>chlim428@gmail.com</a>&nbsp;|@nbsp;
            <a href="https://github.com/chaehwanlim/playlab_v2" style={{color: 'grey'}} target="_blank" rel="noopener noreferrer">GitHub</a>
        </footer>
    )
}

const Home: React.FC = () => {
    useEffect(() => {
        document.body.style.backgroundColor = 'whitesmoke';
    }, []);

    return (
        <div className="background">
            <div className="title">
                PlayLab
            </div>
            <div className="subtitle">
                감동적인 작품을 모두와 함께
            </div>
        </div>
    )
}

export default Home;