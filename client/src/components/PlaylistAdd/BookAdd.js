import React, {useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/SearchRounded';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import Axios from 'axios';
import '../styles/Add.scss';
import '../styles/Book.scss';


export default function BookAdd() {
  const [search, setSearch] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedBook, setSelectedBook] = useState({
    index: -1,
    title: ''
  });
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: 100,
    transmedia: 10000,
    imageURL: "",
    description: "",
  });
  const [category, setCategory] = useState([]);
  const [transmedia, setTransmedia] = useState([]);

  useEffect(() => {
    fetch('/api/categoryDB')
      .then(res => res.json())
      .then(res => setCategory(res))
      .catch(err => console.log(err))
    fetch('/api/transmediaDB')
      .then(res => res.json())
      .then(res => setTransmedia(res))
      .catch(err => console.log(err))
  }, []);

  const handleValueChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearched(true);
    searchBook();
  }

  const searchBook = () => {
    Axios({
      method: 'get',
      url: `/api/bookSearch/${search}`,
    })
    .then(res => setSearchResult(res.data.items))
    .catch(err => console.log(err));
  }

  const handleCategory = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      category : e.target.value
    });
  }
  const handleTransmedia = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      transmedia : e.target.value
    });
  }

  const handleBookSelect = (index, title) => {
    setSelectedBook({index: index, title: title});
    if (searchResult) {
      setForm({
        ...form,
        title: removeBTags(searchResult[index].title),
        author: searchResult[index].author,
        imageURL: searchResult[index].image,
        description : removeBTags(searchResult[index].description)
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(sessionStorage.userName) {
      addBook();
    } else if (sessionStorage.userName === undefined) {
      alert('로그인이 필요합니다!');
      window.location.assign('/MyPage');
    }
  }

  const addBook = () => {
    Axios({
      method: 'post',
      url: 'api/bookAdd',
      data: {
        title: form.title,
        author: form.author,
        adderID : sessionStorage.getItem('userID'),
        categoryID: form.category,
        transmediaID: form.transmedia,
        imageURL: form.image,
        description: form.description,
      }
    })
    .then((res) => alert('책을 정상적으로 추가했습니다!'))
    .catch((err) => console.log(err));
  }

  const removeBTags = (str) => {
    str = str.replace(/<b>/g, "");
    return str.replace(/<\/b>/g, "");
  }

  return (
    <Card className="card">
      <div className="formTitle">
        책을 추가합니다.
      </div>
      <Divider />
      <form noValidate autoComplete="off" className="form" onSubmit={handleSearch}>
        <Paper component="form" className="naverSearch" variant="outlined">
          <InputBase
            className="input"
            placeholder="책 제목을 입력하세요."
            inputProps={{ 'aria-label': 'search' }}
            value={search}
            onChange={handleValueChange}
          />
          <IconButton type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </form>

      {isSearched ? 
      <div className="guide">
        네이버 책 검색 결과입니다.<br />
        책을 선택하고 하단의 양식을 완성해주세요.<br/><br/><br/></div> 
      : ""}

      <Grid container spacing={4}>
        {searchResult ?
          searchResult.map((book, index) => {
            return (
            <Grid item xs={12}>
              <div className="book" key={index} onClick={() => handleBookSelect(index, removeBTags(book.title))}>
                <Grid item xs={4} md={2}>
                <div className="bookCoverAlign">
                    <img className="bookCover" src={book.image} alt={book.title}/>
                </div>
                </Grid>
                <Grid item xs={8} md={4}>
                    <div className="bookTitle">
                        <span style={{color: 'grey'}}>{index + 1}&nbsp;&nbsp;</span>
                        {removeBTags(book.title)}
                        </div>
                    <div className="bookInfo">
                        <b>작가</b> {book.author}<br />
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className="bookDesc">
                        {removeBTags(book.description)}
                    </div>
                </Grid>
                
              </div>
            </Grid>
          )}) : <div>error occurred</div>}
      </Grid>

      {isSearched ? 
        <form noValidate autoComplete="off" className="form" onSubmit={handleSubmit}>
          <div className="guide"><br/><br/>
            선택한 책 : &nbsp;{selectedBook.index + 1}번 &nbsp;<b>{selectedBook.title}</b>
          </div>
          <div className="guide"><br/>이 책은 &nbsp;
          <Select labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={form.category}
            onChange={handleCategory}
            name="category"
            style={{fontSize: '1.7rem', fontWeight: '500'}}>
            {category ? category.map(cat => {
              return (
                <MenuItem value={cat.categoryID} style={{fontSize: '1.7rem', fontWeight: '500'}}>
                  {cat.categoryName}</MenuItem>
              )
            }) : "error occured"}
          </Select>
          &nbsp;책입니다.</div><br />

          <div className="guide">트랜스미디어</div>
          <Select labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={form.transmedia}
            onChange={handleTransmedia}
            name="transmedia"
            style={{fontSize: '1.7rem', fontWeight: '500'}}>
            {transmedia ? transmedia.map(trans => {
              return (
                <MenuItem value={trans.transmediaID} style={{fontSize: '1.7rem', fontWeight: '500'}}>
                  {trans.transmediaName}</MenuItem>
              )
            }) : "error occured"}
          </Select>

          <Fab variant="extended" className="submitBtn" id="book" type="submit">추가하기</Fab>
        </form>
      : ""}

    </Card>
  )
}