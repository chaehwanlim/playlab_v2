import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import MusicPopularContainer from '../../containers/MusicPopularContainer';
import MoviePopularContainer from '../../containers/MoviePopularContainer';
import BookPopularContainer from '../../containers/BookPopularContainer';
import Footer from '../footer';
import '../styles/Content.scss';

interface Content {
  title: string;
  component: JSX.Element;
}

const Popular: React.FC<{ lightMode: () => void }> = ({ lightMode }) => {
    const musicContent: Content = {
        title: "음악 인기 차트",
        component: <MusicPopularContainer />
    };
    const movieContent: Content = {
        title: "영화 인기 차트",
        component: <MoviePopularContainer />
    };
    const bookContent: Content = {
        title: "책 인기 차트",
        component: <BookPopularContainer />
    };

    const [content, setContent] = useState<Content>(movieContent);

    useEffect(() => {
        document.body.style.backgroundColor = 'whitesmoke';

        lightMode();
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

export default Popular;