import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/SearchRounded';
import Grid from '@material-ui/core/Grid';
import '../styles/Content.scss';
import '../styles/Movie.scss';


export default function Movie() {
    const [movieDB, setMovieDB] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");

    useEffect(() => {
        fetch('/api/movieDB')
            .then(res => res.json())
            .then(res => setMovieDB(res))
            .catch(err => console.log(err))
    }, []);

    const handleValueChange = (e) => {
        setSearchKeyword(e.target.value);
    }

    const handleClick = (e) => {
        e.preventDefault();
    }

    const filterData = (data) => {
        data = data.filter((datum) => {
            return (
                (datum.title.indexOf(searchKeyword) > -1) ||
                (datum.actor.indexOf(searchKeyword) > -1) ||
                (datum.userName.indexOf(searchKeyword) > -1)
            );
        });
        return data.map(datum => {
            return (
                <Grid item xs={12} md={6}>
                    <div className="movie">
                        <Grid item xs={4}>
                        <div className="moviePosterAlign">
                            <img className="moviePoster" src={datum.imageURL} title={datum.title} alt={datum.title}/>
                        </div>
                        </Grid>
                        <Grid item xs={8}>
                            <div className="movieTitle">
                                <span>{datum.title}
                                <span className="movieYear">{datum.year}</span>
                                </span>
                            </div>
                            <div className="movieInfo">
                                <b>감독</b>  {datum.director}<br />
                                <b>출연</b>  {datum.actor}<br />
                                <b>평점</b>  {datum.userRating}<br />
                                <b>트랜스미디어</b>  {datum.transmediaName}
                            </div>
                            <div className="movieCategory">
                                <b>{datum.userName}</b> 님의<br />
                                <b>{datum.categoryName}</b> 영화입니다.<br />
                            </div>
                        </Grid>
                    </div>
                </Grid>
            );
        });
    }

    return (
        <div>
            <form noValidate autoComplete="off" className="form" onSubmit={handleClick}>
                <Paper component="form" className="searchBar" variant="outlined">
                    <InputBase
                        className="input"
                        placeholder="검색할 내용을 입력하세요"
                        inputProps={{ 'aria-label': 'searchKeyword' }}
                        value={searchKeyword}
                        onChange={handleValueChange}
                    />
                    <IconButton type="submit" className="iconButton" aria-label="searchKeyword">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </form>
            <br /><br />
            <Grid container spacing={4}>
            {movieDB ? filterData(movieDB) : <span>error occured</span>}
            </Grid>
        </div>
    )
}

