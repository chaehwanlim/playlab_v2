import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ThumbUp from '@material-ui/icons/ThumbUp';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/SearchRounded';
import Axios from 'axios';
import '../styles/Content.scss';
import '../styles/Book.scss';
import '../DBInterfaces.tsx';

interface BookPopularProps {
  onAdd: (work: BookmarkItem) => void;
}

const BookPopular: React.SFC<BookPopularProps> = ({onAdd}) => {
  const [bookDB, setBookDB] = useState<Array<PopularBook>>([]);
  const [category, setCategory] = useState<Array<Category>>([]);
  const [selectedCat, setSelectedCat] = useState<string>("모든");
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  useEffect(() => {
    fetch('/api/book')
      .then(res => res.json())
      .then(res => setBookDB(res))
      .catch(err => console.log(err))
    fetch('/api/category')
      .then(res => res.json())
      .then(res => setCategory(res))
      .catch(err => console.log(err))
  }, []);

  const removeBTags = (str: string) => {
    str = str.replace(/<b>/g, "");
    return str.replace(/<\/b>/g, "");
  }

  const filterData = (data: Array<PopularBook>) => {
    data = data.filter((datum: PopularBook) => {
      return (
        (datum.title.indexOf(searchKeyword) > -1) ||
        (datum.author.indexOf(searchKeyword) > -1) ||
        (datum.userName.indexOf(searchKeyword) > -1)
      );
    });

    let _selectedCat: string = selectedCat;
    if (_selectedCat === "모든") {
      _selectedCat = ""
    }

    data = data.filter((datum: PopularBook) => {
      return (
        (datum.categoryName.indexOf(_selectedCat) > -1)
      );
    });

    return data.map((datum: PopularBook, index: number) => {
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
                <Grid container spacing={0}>
                  <Grid item xs={10}>
                    <span style={{color: 'orange'}}>
                      {index + 1}&nbsp;&nbsp;
                    </span>
                    {removeBTags(datum.title)}&nbsp;
                  </Grid>
                  <Grid item xs={2}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                      <IconButton style={{padding: '1rem'}} 
                        onClick={() => onAdd({
                          title: datum.title,
                          creator: datum.author,
                          category: datum.categoryName,
                          media: '책'
                        })}
                      >
                        <NoteAddIcon style={{color: 'black', width: '2rem', height: '2rem'}}/>
                      </IconButton>
                    </div>
                  </Grid>
                </Grid>
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

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  }

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const handleCategory = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCat(e.target.value as string);
  }

  const handleLikes = (id: number) => {
    const urlWithID = `/api/book/${id}`;
    Axios({
      method: 'put',
      url: urlWithID,
    })
    .then(res => {
      if(res.status === 200){
        alert('성공적으로 추천했습니다!');
        
        fetch('/api/book')
          .then(res => res.json())
          .then(res => setBookDB(res))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
      <Card className="filter" elevation={3} square={true}>
        <div className="category" id="book">
        <Select labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCat}
          onChange={handleCategory}
          name="category"
          style={{fontSize: '1.7rem', fontWeight: 500, color: '#1ABF80'}}>
            <MenuItem value={"모든"} style={{fontSize: '1.7rem', fontWeight: 500}}>
              모든
            </MenuItem>
          {category ? category.map(cat => {
            return (
              <MenuItem value={cat.categoryName} style={{fontSize: '1.7rem', fontWeight: 500}}>
                {cat.categoryName}</MenuItem>
            )
          }) : "error occured"}
        </Select>
      &nbsp; 책의 인기 차트</div>
      </Card>
      <form noValidate autoComplete="off" className="form" onSubmit={handleClick}>
        <Card component="form" className="searchBar" elevation={3} square={true}>
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
        </Card>
      </form>
      <br /><br />
      <Grid container spacing={4}>
        {bookDB ? filterData(bookDB) : <div>error ocurred</div>}
      </Grid>
    </div>
  )
}

export default BookPopular;