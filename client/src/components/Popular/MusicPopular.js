import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Axios from 'axios';
import '../styles/Content.scss';
import '../styles/Table.scss';


export default function MusicPopular() {
  const [musicDB, setMusicDB] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");

  useEffect(() => {
    fetch('/api/musicPopular')
      .then(res => res.json())
      .then(res => setMusicDB(res))
      .catch(err => console.log(err))
    fetch('/api/categoryDB')
      .then(res => res.json())
      .then(res => setCategory(res))
      .catch(err => console.log(err))
  }, []);

  const handleCategory = (e) => {
    e.preventDefault();
    setSelectedCat(e.target.value);
  }

  const handleLikes = (id) => {
    const urlWithID = `/api/popular/like/increment/${id}`;
    Axios({
      method: 'put',
      url: urlWithID,
    })
    .then(res => {
      if(res.status === 200){
        alert('성공적으로 추천했습니다!');
        fetch('/api/musicPopular')
          .then(res => res.json())
          .then(res => setMusicDB(res))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err));
  }

  const filterData = (data) => {
    data = data.filter((datum) => {
      return (
        (datum.categoryName.indexOf(selectedCat) > -1)
      );
    });
    return data.map((datum, index) => {
      return (
        <TableRow>
          <TableCell className="tableData" component="th" scope="row" id="ranking">{index + 1}</TableCell>
          <TableCell className="tableData" style={{paddingLeft: '1rem'}}>
              <span className="title">{datum.title}</span><br></br>{datum.artist}
          </TableCell>
          <TableCell className="tableData" id="category">
              {datum.userName} 님의<br />{datum.categoryName} 음악
          </TableCell>
          <TableCell className="tableData">
            <Button variant="contained" className="musicLikes"
            onClick={() => {handleLikes(datum.musicID)}}
            ><ThumbUp />&nbsp;{datum.likes}</Button>
          </TableCell>
          <TableCell className="tableData2" id="musicForMobile">{datum.genre}</TableCell>
          <TableCell className="tableData2" id="musicForMobile">{datum.transmediaName}</TableCell>
        </TableRow>
      )
    });
  }

  return (
    <div>
      <Card className="filter">
        <div className="category" id="music">
        <Select labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCat}
              onChange={handleCategory}
              name="category"
              style={{fontSize: '1.7rem', fontWeight: '500', color: '#018DFF'}}>
              {category ? category.map(cat => {
                return (
                  <MenuItem value={cat.categoryName} style={{fontSize: '1.7rem', fontWeight: '500'}}>
                    {cat.categoryName}</MenuItem>
                )
              }) : "error occured"}
        </Select>
      &nbsp; 음악의 인기 차트</div>
      </Card>
      <Paper className="table">
        <TableContainer className="tableContainer">
          <Table stickyHeader aria-label="sticky table">
            <TableBody>
            {musicDB ? filterData(musicDB) : <TableRow>error ocurred</TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
}