import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Axios from 'axios';
import '../styles/Content.scss';
import '../styles/Book.scss';


export default function BookPopular() {
  const [bookDB, setBookDB] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");

  useEffect(() => {
    fetch('/api/bookPopular')
      .then(res => res.json())
      .then(res => setBookDB(res))
      .catch(err => console.log(err))
    fetch('/api/categoryDB')
      .then(res => res.json())
      .then(res => setCategory(res))
      .catch(err => console.log(err))
  }, []);

  const removeBTags = (str) => {
    str = str.replace(/<b>/g, "");
    return str.replace(/<\/b>/g, "");
  }

  const filterData = (data) => {
    data = data.filter((datum) => {
      return (
        (datum.categoryName.indexOf(selectedCat) > -1)
      );
    });
    return data.map((datum, index) => {
      return (
        <Grid item xs={12}>
          <div className="book">
            <Grid item xs={4} md={2}>
            <div className="bookCoverAlign">
                <img className="bookCover" src={datum.imageURL} alt={datum.title}/>
                <Button variant="contained" className="bookLikes"
                  onClick={() => {handleLikes(datum.bookID)}}
                  ><ThumbUp />&nbsp;{datum.likes}</Button>
            </div>
            </Grid>
            <Grid item xs={8} md={4}>
              <div className="bookTitle">
                <span style={{color: 'orange'}}>{index + 1}&nbsp;&nbsp;</span>
                {removeBTags(datum.title)}&nbsp;&nbsp;
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
                  {removeBTags(datum.description)}
              </div>
            </Grid>
            
          </div>
        </Grid>
      )
    });
  }

  const handleCategory = (e) => {
    e.preventDefault();
    console.log(e.target.value);
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
        fetch('/api/bookPopular')
          .then(res => res.json())
          .then(res => setBookDB(res))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
      <Card className="filter">
        <div className="category" id="book">
        <Select labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCat}
          onChange={handleCategory}
          name="category"
          style={{fontSize: '1.7rem', fontWeight: '500', color: '#1ABF80'}}>
          {category ? category.map(cat => {
            return (
              <MenuItem value={cat.categoryName} style={{fontSize: '1.7rem', fontWeight: '500'}}>
                {cat.categoryName}</MenuItem>
            )
          }) : "error occured"}
        </Select>
      &nbsp; 책의 인기 차트</div>
      </Card>
      <Grid container spacing={4}>
        {bookDB ? filterData(bookDB) : <div>error ocurred</div>}
      </Grid>
    </div>
  )
}
