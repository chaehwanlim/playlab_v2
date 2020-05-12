import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import TableContainer from '@material-ui/core/TableContainer';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/SearchRounded';
import MusicItem from '../Items/MusicItem';
import Axios from 'axios';
import '../styles/Content.scss';
import '../styles/Table.scss';
import '../DBInterfaces.tsx';

interface MusicPopularProps {
  onAdd: (work: BookmarkItem) => void;
}

const MusicPopular: React.SFC<MusicPopularProps> = ({ onAdd }) => {
  const [musicDB, setMusicDB] = useState<Array<PopularMusic>>([]);
  const [category, setCategory] = useState<Array<Category>>([]);
  const [selectedCat, setSelectedCat] = useState<string>("모든");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [reviews, setReviews] = useState<Array<ReviewItem>>([]);

  useEffect(() => {
    fetch('/api/music')
      .then(res => res.json())
      .then(res => setMusicDB(res))
      .catch(err => console.log(err))

    fetch('/api/category')
      .then(res => res.json())
      .then(res => setCategory(res))
      .catch(err => console.log(err))

    fetch('/api/review/music')
      .then(res => res.json())
      .then(res => setReviews(res))
      .catch(err => console.log(err))

  }, []);

  const filterData = (data: Array<PopularMusic>) => {
    data = data.filter((datum: PopularMusic) => 
      (datum.title.indexOf(searchKeyword) > -1) ||
      (datum.artist.indexOf(searchKeyword) > -1) ||
      (datum.userName.indexOf(searchKeyword) > -1)
    );

    let _selectedCat: string = selectedCat;

    if (_selectedCat === "모든") {
      _selectedCat = ""
    }

    const reviewsForOneCat: ReviewItem[] = reviews.filter((datum: ReviewItem) => 
      datum.categoryName.includes(_selectedCat)
    );

    return data.map((datum: PopularMusic, index: number) => {
      const reviewsForOneMusic: ReviewItem[] = reviewsForOneCat.filter((reviewItem: ReviewItem) => 
        (reviewItem.workID === datum.musicID)
      );

      return (
        <MusicItem music={datum} reviews={reviewsForOneMusic} index={index} buttons={true} handleLikes={handleLikes} onAdd={onAdd} key={index} />
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
    const urlWithID = `/api/music/${id}`;
    Axios({
      method: 'put',
      url: urlWithID,
    })
    .then(res => {
      if(res.status === 200){
        alert('성공적으로 추천했습니다!');
        fetch('/api/music')
          .then(res => res.json())
          .then(res => setMusicDB(res))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
      <Card className="filter" elevation={3} square={true}>
        <div className="category" id="music">
        <Select labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCat}
          onChange={handleCategory}
          name="category"
          style={{fontSize: '1.7rem', fontWeight: 500, color: '#018DFF'}}>
            <MenuItem value={"모든"} style={{fontSize: '1.7rem', fontWeight: 500}}>
            모든
            </MenuItem>
            {category ? category.map((cat: Category, index: number) => 
              <MenuItem value={cat.categoryName} style={{fontSize: '1.7rem', fontWeight: 500}} key={index}>
                {cat.categoryName}</MenuItem>
            ) : "error occured"}
        </Select>
      &nbsp; 음악의 인기 차트</div>
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

      <Card elevation={3} square={true}>
        <TableContainer className="Music-table">
          {musicDB ? filterData(musicDB) : <div />}
        </TableContainer>
      </Card>
    </div>
  )
}

export default MusicPopular;