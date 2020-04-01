import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import MusicPopular from './MusicPopular';
import MoviePopular from './MoviePopular';
import BookPopular from './BookPopular'; 
import Footer from '../footer';
import '../styles/Content.scss';


export default function Popular() {
    const musicContent = {
        title: "음악 인기 차트",
        component: <MusicPopular />
    };
    const movieContent = {
        title: "영화 인기 차트",
        component: <MoviePopular />
    };
    const bookContent = {
        title: "책 인기 차트",
        component: <BookPopular />
    };

    const [content, setContent] = useState(movieContent);

    const handleMusic = (e) => {
        e.preventDefault();
        setContent(musicContent);
    }
    const handleMovie = (e) => {
        e.preventDefault();
        setContent(movieContent);
    }
    const handleBook = (e) => {
        e.preventDefault();
        setContent(bookContent);
    }

    return (
        <div className="header">
        <Container maxWidth="lg">
            <Grid container spacing={1}>
                <Grid item xs={9}>
                    <header className="title">{content.title}</header>
                    <p className="subtitle">인기 차트를 통해 취향에 맞는 작품을 찾아보세요.</p>
                </Grid>
                <Grid item xs={3}>
                    <div className="btnAlign">
                    <Fab variant="extended" className="mediaBtn" id="music" onClick = {handleMusic}>
                        음악
                    </Fab>
                    <Fab variant="extended" className="mediaBtn" id="movie" onClick = {handleMovie}>
                        영화
                    </Fab>
                    <Fab variant="extended" className="mediaBtn" id="book" onClick = {handleBook}>
                        책
                    </Fab>
                    </div>
                </Grid>
            </Grid>
        </Container>
        <Divider className="divider"/>
        <Container maxWidth="lg">
            {content.component}
        </Container>
        <Footer />
        </div>
    )
}