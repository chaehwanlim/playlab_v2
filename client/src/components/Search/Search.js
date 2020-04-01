import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Music from './Music';
import Movie from './Movie';
import Book from './Book';
import Footer from '../footer';
import '../styles/Content.scss';


export default function Search() {
    const musicContent = {
        title: "음악 검색하기",
        component: <Music />,
        subtitle: "음악의 제목, 아티스트, 등록한 유저 이름으로 검색하세요."
    };
    const movieContent = {
        title: "영화 검색하기",
        component: <Movie />,
        subtitle: "영화의 제목, 출연 배우, 등록한 유저 이름으로 검색하세요."
    };
    const bookContent = {
        title: "책 검색하기",
        component: <Book />,
        subtitle: "책의 제목, 작가, 등록한 유저 이름으로 검색하세요."
    };

    const [content, setContent] = useState(movieContent);

    const handleMusic = (e) => {
        e.preventDefault();
        setContent(musicContent)
    }
    const handleMovie = (e) => {
        e.preventDefault();
        setContent(movieContent)
    }
    const handleBook = (e) => {
        e.preventDefault();
        setContent(bookContent)
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
        <Divider className="divider"/>
        <Container maxWidth="lg">
            {content.component}
        </Container>
        <Footer />
        </div>
    )
}