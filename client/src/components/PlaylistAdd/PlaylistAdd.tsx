import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import MusicAdd from './MusicAdd';
import MovieAdd from './MovieAdd';
import BookAdd from './BookAdd';
import Footer from '../footer';
import '../styles/Content.scss';

interface Content {
    title: string;
    component: JSX.Element;
    subtitle: string;
}

const PlaylistAdd: React.FC = () => {
    const musicContent: Content = {
        title: "내가 들은 음악 추가하기",
        component: <MusicAdd />,
        subtitle: "직접 입력하거나 멜론에서 검색하여 추가하세요"
    };
    const movieContent: Content = {
        title: "내가 감상한 영화 추가하기",
        component: <MovieAdd />,
        subtitle: "네이버 영화에서 검색하여 추가하세요."
    };
    const bookContent: Content = {
        title: "내가 읽은 책 추가하기",
        component: <BookAdd />,
        subtitle: "네이버 책에서 검색하여 추가하세요."
    };

    const [content, setContent] = useState<Content>(movieContent);

    useEffect(() => {
        document.body.style.backgroundColor = 'whitesmoke';
    }, []);

    const handleMusic = () => {
        setContent(musicContent);
    }
    const handleMovie = () => {
        setContent(movieContent);
    }
    const handleBook = () => {
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

export default PlaylistAdd;