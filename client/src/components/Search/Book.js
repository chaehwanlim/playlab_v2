import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/SearchRounded';
import Grid from '@material-ui/core/Grid';
import '../styles/Book.scss';


export default function Book() {
    const [bookDB, setBookDB] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");

    useEffect(function fetchBookDB() {
        fetch('/api/bookDB')
        .then(res => res.json())
        .then(res => setBookDB(res))
        .catch(err => console.log(err));
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
                (datum.author.indexOf(searchKeyword) > -1) ||
                (datum.userName.indexOf(searchKeyword) > -1)
            );
        });
        return data.map(datum => {
            return (
                <Grid item xs={12}>
                    <div className="book">
                        <Grid item xs={4} md={2}>
                        <div className="bookCoverAlign">
                            <img className="bookCover" src={datum.imageURL} alt={datum.title}/>
                        </div>
                        </Grid>
                        <Grid item xs={8} md={4}>
                            <div className="bookTitle">
                                {datum.title}

                            </div>
                            <div className="bookInfo">
                                <b>작가</b>  {datum.author}<br />
                                <b>트랜스미디어</b>  {datum.transmediaName}<br />
                            </div>
                            <div className="bookCategory">
                                <b>{datum.userName}</b> 님의<br />
                                <b>{datum.categoryName}</b> 책입니다.<br />
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className="bookDesc">
                                {removeTags(datum.description)}
                            </div>
                        </Grid>
                    </div>
                </Grid>
            );
        });
    }

    const removeTags = (str) => {
        str = str.replace(/<b>/g, "");
        return str.replace(/<\/b>/g, "");
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
            <Grid container spacing={5}>
            {bookDB ? filterData(bookDB) : <span>error occured</span>}
            </Grid>
        </div>
    )
}