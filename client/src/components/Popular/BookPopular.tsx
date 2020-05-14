import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/SearchRounded';
import CircularProgress from '@material-ui/core/CircularProgress';
import BookItem from '../Items/BookItem';
import Box from '@material-ui/core/Box';
import Axios from 'axios';
import '../DBInterfaces.tsx';


interface BookPopularProps {
  onAdd: (work: BookmarkItem) => void;
}

const BookPopular: React.SFC<BookPopularProps> = ({onAdd}) => {
  const [bookDB, setBookDB] = useState<PopularBook[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [selectedCat, setSelectedCat] = useState<number>(100);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [reviews, setReviews] = useState<ReviewItem[]>([]);

  useEffect(() => {
    fetch('/api/category')
      .then(res => res.json())
      .then(res => setCategory(res))
      .catch(err => console.log(err))

    fetch('/api/review/book')
      .then(res => res.json())
      .then(res => setReviews(res))
      .catch(err => console.log(err))

    getDB(selectedCat);
  }, []);

  const getDB = (categoryid: number) => {
    fetch(`/api/review/chart/book/${categoryid}`)
      .then(res => res.json())
      .then(res => setBookDB(res))
      .catch(err => console.log(err))
  }

  const filterData = (data: PopularBook[]) => {
    const filteredData: PopularBook[] = data.filter((datum: PopularBook) => (
      (datum.title.includes(searchKeyword)) ||
      (datum.author.includes(searchKeyword)) ||
      (datum.description.includes(searchKeyword))
    ));

    return filteredData.map((datum: PopularBook, index: number) => {
      const reviewsForOneBook: ReviewItem[] = reviews.filter((reviewItem: ReviewItem) => 
        (reviewItem.workID === datum.bookID)
      );

      return (
        <BookItem book={datum} reviews={reviewsForOneBook} index={index} buttons={true} handleLikes={handleLikes} onAdd={onAdd} key={index} />
      )
    });
  }

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  }

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const handleCategory = (e: React.ChangeEvent<{ value: number }>) => {
    setSelectedCat(e.target.value);
    getDB(e.target.value);
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
        getDB(selectedCat);
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
      <Box className="filter" borderRadius={10}>
        <div className="category" id="book">
        <Select labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCat}
          onChange={handleCategory}
          name="category"
          style={{fontSize: '1.7rem', fontWeight: 400, color: '#1ABF80'}}>
            <MenuItem value={100} style={{fontSize: '1.7rem', fontWeight: 400}}>
              모든
            </MenuItem>
          {category ? category.map((cat: Category, index: number) => 
            <MenuItem value={cat.categoryID} style={{fontSize: '1.7rem', fontWeight: 400}} key={index}>
              {cat.categoryName}</MenuItem>
          ) : "error occured"}
        </Select>
      &nbsp; 책의 인기 차트</div>
      </Box>

      <form noValidate autoComplete="off" className="form" onSubmit={handleClick}>
        <Box className="searchBar" borderRadius={10}>
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
        </Box>
      </form>
      <br /><br />

      <Grid container spacing={4}>
        {bookDB ? 
        filterData(bookDB) : 
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}><CircularProgress /></div>}
      </Grid>
    </div>
  )
}

export default BookPopular;