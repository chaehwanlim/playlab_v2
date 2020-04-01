import React from 'react';
import Container from '@material-ui/core/Container';
import './styles/Home.scss';


const footer = () => {
    return (
        <footer style={{backgroundColor: 'whitesmoke', color: 'grey', fontSize: '1.4rem', fontWeight: '500', textAlign: 'center', position: 'absolute', top: '100%'}}>
            <p>Copyright © 2020 PlayLab</p>
            <p>Contact webmaster for more information. <a href="mailto: chlim428@gmail.com" color="black">chlim428@gmail.com</a></p>
            <p><a href="https://github.com/chaehwanlim/playlab" color="black" target="_blank" rel="noopener noreferrer">GitHub</a></p>
        </footer>
    )
}

export default function Home() {
    return (
        <div className="background">
            <Container maxWidth="lg">
                <div className="title">
                    PlayLab
                </div>
                <div className="subtitle">
                    감동적인 작품을 모두와 함께
                </div>
            </Container>
            {footer()}
        </div>
    )
}