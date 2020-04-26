import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
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

  useEffect(() => {
    fetch('/api/music')
      .then(res => res.json())
      .then(res => setMusicDB(res))
      .catch(err => console.log(err))
    fetch('/api/category')
      .then(res => res.json())
      .then(res => setCategory(res))
      .catch(err => console.log(err))
  }, []);

  const filterData = (data: Array<PopularMusic>) => {
    data = data.filter((datum: PopularMusic) => {
      return (
        (datum.title.indexOf(searchKeyword) > -1) ||
        (datum.artist.indexOf(searchKeyword) > -1) ||
        (datum.userName.indexOf(searchKeyword) > -1)
      );
    });

    let _selectedCat: string = selectedCat;
    if (_selectedCat === "모든") {
      _selectedCat = ""
    }

    data = data.filter((datum: PopularMusic) => {
      return (
        (datum.categoryName.indexOf(_selectedCat) > -1)
      );
    });
    return data.map((datum: PopularMusic, index: number) => {
      const bookmarkAddBtn = () => {
        
      }

      return (
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon style={{fontSize: '2rem'}}/>}
          >
            <Table>
            <TableBody>
            <TableRow>
              <TableCell className="tableData" id="ranking">
                {index + 1}
              </TableCell>
              <TableCell className="tableData">
                <span className="music-item-title">
                  {datum.title}
                  <FormControlLabel
                    control={
                      <IconButton style={{padding: '0.5rem', marginLeft: '0.5rem'}} 
                        onClick={() => onAdd({
                          title: datum.title,
                          creator: datum.artist,
                          category: datum.categoryName,
                          media: '음악'
                        })}
                      >
                        <NoteAddIcon style={{color: 'black', width: '2rem', height: '2rem'}}/>
                      </IconButton>
                    }
                    onClick={(event) => event.stopPropagation()}
                    onFocus={(event) => event.stopPropagation()}
                    label={null}
                    style={{margin: 0}}
                  />
                </span>
                <br />
                {datum.artist}
              </TableCell>
              <TableCell className="music-btns">
                <FormControlLabel
                  control={
                    <Button variant="contained" 
                      className="musicLikeBtn"
                      onClick={() => {handleLikes(datum.musicID)}}
                    >
                      <ThumbUp />&nbsp;{datum.likes}
                    </Button>
                  }
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                  label={null}
                  style={{margin: 0}}
                />
              </TableCell>
            </TableRow>
            </TableBody> 
            </Table>
          </ExpansionPanelSummary>
          
          <ExpansionPanelDetails className="tableData">
            <div>
              <b>{datum.userName}</b> 님의&nbsp;
              <b>{datum.categoryName}</b> 음악
            </div>
            <div>
              <b>장르</b>&nbsp;&nbsp;{datum.genre}
            </div>
            <div>
              <b>트랜스미디어</b>&nbsp;&nbsp;
              {datum.transmediaName}
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    });
  }

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  }

  const handleClick = (e) => {
    e.preventDefault();
  }

  const handleCategory = (e) => {
    e.preventDefault();
    setSelectedCat(e.target.value);
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
          {category ? category.map(cat => {
            return (
              <MenuItem value={cat.categoryName} style={{fontSize: '1.7rem', fontWeight: 500}}>
                {cat.categoryName}</MenuItem>
            )
          }) : "error occured"}
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