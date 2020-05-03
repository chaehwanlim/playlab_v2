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
import '../DBInterfaces.tsx';


const BookAdd: React.FC = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedBook, setSelectedBook] = useState<WorkSelection>({
    index: -1,
    title: ''
  });
  const [form, setForm] = useState<BookForm>({
    title: "",
    author: "",
    categoryID: 101,
    transmediaID: 10000,
    imageURL: "",
    description: "",
  });
  const [category, setCategory] = useState<Array<Category>>([]);
  const [transmedia, setTransmedia] = useState<Array<Transmedia>>([]);

  useEffect(() => {
    fetch('/api/category')
      .then(res => res.json())
      .then(res => setCategory(res))
      .catch(err => console.log(err))
    fetch('/api/transmedia')
      .then(res => res.json())
      .then(res => setTransmedia(res))
      .catch(err => console.log(err))
  }, []);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value as string);
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSearched(true as boolean);
    searchBook();
  }

  const searchBook = () => {
    Axios({
      method: 'get',
      url: `/api/naver/book/${keyword}`,
    })
    .then(res => setSearchResult(res.data.items))
    .catch(err => console.log(err));
  }

  const handleCategory = (e: React.ChangeEvent<{ value: unknown }>) => {
    setForm({
      ...form,
      categoryID : e.target.value as number
    });
  }
  
  const handleTransmedia = (e: React.ChangeEvent<{ value: unknown }>) => {
    setForm({
      ...form,
      transmediaID : e.target.value as number
    });
  }

  const handleBookSelect = (index: number, title: string) => {
    setSelectedBook({index: index, title: title});
    if (searchResult) {
      setForm({
        ...form,
        title: removeBTags(searchResult[index].title),
        author: removeBTags(searchResult[index].author),
        imageURL: searchResult[index].image,
        description : removeBTags(searchResult[index].description)
      });
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(sessionStorage.userName) {
      addBook();
    } else if (sessionStorage.userName === undefined) {
      alert('로그인이 필요합니다!');
      window.location.assign('/MyPage');
    }
  }

  const addBook = () => {
    if (form.title.length === 0) {
      alert('책을 선택해주세요.');
      return;
    }

    Axios({
      method: 'post',
      url: '/api/book',
      data: {
        title: form.title,
        author: form.author,
        adderID: sessionStorage.getItem('userID'),
        categoryID: form.categoryID,
        transmediaID: form.transmediaID,
        imageURL: form.imageURL,
        description: form.description,
      }
    })
    .then(() => alert('책을 정상적으로 추가했습니다!'))
    .catch((err) => console.log(err));
  }

  const removeBTags = (str: string) => {
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
        <Paper component="form" className="webSearch" variant="outlined">
          <InputBase
            className="input"
            placeholder="책 제목을 입력하세요."
            inputProps={{ 'aria-label': 'keyword' }}
            value={keyword}
            onChange={handleValueChange}
          />
          <IconButton type="submit" aria-label="keyword">
            <SearchIcon />
          </IconButton>
        </Paper>
      </form>

      {isSearched ? 
      <div className="guide">
        책을 선택하고 하단의 양식을 완성해주세요.<br/><br/><br/></div> 
      : ""}

      <Grid container spacing={4}>
        {searchResult ?
          searchResult.map((book, index: number) => {
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
            value={form.categoryID}
            onChange={handleCategory}
            name="category"
            style={{fontSize: '1.7rem', fontWeight: 500 }}>
            {category ? category.map(cat => {
              return (
                <MenuItem value={cat.categoryID} style={{fontSize: '1.7rem', fontWeight: 500}}>
                  {cat.categoryName}</MenuItem>
              )
            }) : "error occured"}
          </Select>
          &nbsp;책입니다.</div><br />

          <div className="guide">트랜스미디어 : &nbsp;
            <Select labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={form.transmediaID}
              onChange={handleTransmedia}
              name="transmedia"
              style={{fontSize: '1.7rem', fontWeight: 500}}>
                <MenuItem value={10000} style={{fontSize: '1.7rem', fontWeight: 500}}>
                  없음
                </MenuItem>
              {transmedia ? transmedia.map(trans => {
                return (
                  <MenuItem value={trans.transmediaID} style={{fontSize: '1.7rem', fontWeight: 500}}>
                    {trans.transmediaName}</MenuItem>
                )
              }) : "error occured"}
            </Select>
          </div>

          <Fab variant="extended" className="submitBtn" id="book" type="submit">추가하기</Fab>
        </form>
      : ""}

    </Card>
  )
}

export default BookAdd;