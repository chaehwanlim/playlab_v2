import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import MusicAdd from './MusicAdd';
import MovieAdd from './MovieAdd';
import BookAdd from './BookAdd';
import Footer from '../footer';
import '../styles/Content.scss';


export default function PlaylistAdd() {
    const musicContent = {
        title: "내가 들은 음악 추가하기",
        component: <MusicAdd />,
        subtitle: "직접 음악 정보를 입력하여 추가하세요."
    };
    const movieContent = {
        title: "내가 감상한 영화 추가하기",
        component: <MovieAdd />,
        subtitle: "네이버 영화에서 검색하여 추가하세요."
    };
    const bookContent = {
        title: "내가 읽은 책 추가하기",
        component: <BookAdd />,
        subtitle: "네이버 책에서 검색하여 추가하세요."
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
                    <p className="subtitle">{content.subtitle}</p>
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
        <Divider className="divider" />
        <Container maxWidth="lg">
            {content.component}
        </Container>
            <Footer />
        </div>
    )
}