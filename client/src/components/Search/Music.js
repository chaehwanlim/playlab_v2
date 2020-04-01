import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/SearchRounded';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import '../styles/media.css';
import '../styles/Content.scss';
import '../styles/Table.scss';


export default function MusicTable() {
    const [musicDB, setMusicDB] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");

    useEffect(() => {
        fetch('/api/musicDB')
            .then(res => res.json())
            .then(res => setMusicDB(res))
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
                (datum.artist.indexOf(searchKeyword) > -1) ||
                (datum.userName.indexOf(searchKeyword) > -1)
            );
        });
        return data.map(datum => {
            return (
                <TableRow>
                    <TableCell className="tableData">
                        <span className="title">{datum.title}</span><br></br>{datum.artist}
                    </TableCell>
                    <TableCell className="tableData" id="category">
                        {datum.userName} 님의 <br />{datum.categoryName} 음악
                    </TableCell>
                    <TableCell className="tableData2" id="musicForMobile">{datum.genre}</TableCell>
                    <TableCell className="tableData2" id="musicForMobile">{datum.transmediaName}</TableCell>
                </TableRow>
            )
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
            <Paper className="table">
            <TableContainer className="tableContainer">
                <Table stickyHeader aria-label="sticky table">
                    {/* <TableHead>
                    <TableRow>
                        {attributes.map(column => (
                            <TableCell
                                key={column.id}
                                style={{ minWidth: column.minWidth }}
                                className={classes.tableAttribute}>
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                    </TableHead> */}
                    <TableBody>
                    {musicDB ? filterData(musicDB) : <TableRow>error ocurred</TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
            </Paper>
        </div>
    )
}