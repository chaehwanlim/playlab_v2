import React, {useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/SearchRounded';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import '../styles/Add.scss';
import '../styles/Table.scss';

const MusicAdd: React.FC = () => {
    const [keyword, setKeyword] = useState<string>("");
    const [searchResult, setSearchResult] = useState<Array<Music>>([]);
    const [form, setForm] = useState<MusicForm>({
        title : "",
        artist: "",
        genre: "",
        categoryID: 101,
        transmediaID: 10000,
    });
    const [category, setCategory] = useState<Array<Category>>([]);
    const [transmedia, setTransmedia] = useState<Array<Transmedia>>([]);
    const [searchMode, setSearchMode] = useState<string>('title');
    const [tabValue, setTabValue] = useState<number>(0);

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

    const handleTabChange = (e: React.ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue);
    }

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    }

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        searchMusic();
    }

    const searchMusic = () => {
        Axios({
            method: 'get',
            url: `/api/melon/music/${searchMode}/${keyword}`
        })
        .then(res => setSearchResult(res.data))
        .catch(err => console.log(err));
    }

    const handleCategory = (e: React.ChangeEvent<{ value: number }>) => {
        setForm({
            ...form,
            categoryID : e.target.value
        });
    }

    const handleTransmedia = (e: React.ChangeEvent<{ value: number }>) => {
        setForm({
            ...form,
            transmediaID : e.target.value
        });
    }

    const handleMusicSelect = (index: number) => {
        if (searchResult) {
            setForm({
                ...form,
                title: searchResult[index].title,
                artist: searchResult[index].artist
            });
        }
    }

    const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            title: e.target.value
        })
    }

    const handleArtistInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            artist: e.target.value
        })
    }

    const handleGenreInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            genre: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if(sessionStorage.userName) {
            addMusic();
        } else if (sessionStorage.userName === undefined) {
            alert('로그인이 필요합니다!');
            window.location.assign('/MyPage');
        }
    }  

    const addMusic = () => {
        if (form.title.length === 0) {
            alert('제목을 입력해주세요.');
            return;
        } else {
            if (form.artist.length === 0) {
                alert('아티스트를 입력해주세요.');
                return;
            }
        }

        Axios({
            method: 'post',
            url:'/api/music',
            data: {
                title : form.title,
                artist: form.artist,
                genre : form.genre,
                adderID : sessionStorage.getItem('userID'),
                categoryID : form.categoryID,
                transmediaID : form.transmediaID
            }
        })
        .then(() => alert('음악을 정상적으로 추가했습니다!'))
        .catch((err) => console.log(err));

        initializeForm();
    }

    const searchResultTable = (result: Array<Music>) => {
        return (
        <TableContainer className="Music-table" style={{maxHeight: '40rem'}}>
            <Table>
            <TableBody>
                {result.map((datum: Music, index: number) => {
                    return (
                        <TableRow>
                            <TableCell className="tableData" id="ranking">
                                {index + 1}
                            </TableCell>
                            <TableCell className="tableData">
                                <span className="music-item-title">
                                    {datum.title}
                                </span>
                                <br />
                                {datum.artist}
                            </TableCell>
                            <TableCell className="music-btns">
                                <Button className="musicAddBtn"
                                onClick={() => handleMusicSelect(index)}
                                >
                                    선택
                                </Button>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
            </Table>
        </TableContainer>
        )
    }
    
    const initializeForm = () => {
        setForm({
            title : "",
            artist: "",
            genre: "",
            categoryID: 100,
            transmediaID: 10000,
        });
    }

    const InputProps: object = { style: {fontSize: '2rem'}};
    const InputLabelProps: object = { style: {fontSize: '1.7rem', color: 'primary'} }

    return (
        <Card className="card">
            <div className="formTitle">
                음악을 추가합니다.
            </div>

            <Tabs
                value={tabValue}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleTabChange}
                aria-label="content tabs"
                centered
            >
                <Tab label="제목 검색" className="music-search-tabs" 
                    onClick={() => {
                        setSearchMode('title');
                        searchMusic();
                    }}
                />
                <Tab label="아티스트 검색" className="music-search-tabs" 
                    onClick={() => {
                        setSearchMode('artist');
                        searchMusic();
                    }}
                />
                <Tab label="직접 입력" className="music-search-tabs" />
            </Tabs>
            <Divider />

            {(tabValue === 0) ? 
            <div>
                <form noValidate autoComplete="off" className="form" onSubmit={handleSearch}>
                    <Paper component="form" className="webSearch" variant="outlined">
                    <InputBase
                        className="input"
                        placeholder="음악 제목을 입력하세요."
                        inputProps={{ 'aria-label': 'keyword' }}
                        value={keyword}
                        onChange={handleValueChange}
                    />
                    <IconButton type="submit" aria-label="keyword">
                        <SearchIcon />
                    </IconButton>
                    </Paper>
                </form>
                {searchResult.length !== 0 ? searchResultTable(searchResult) : ""}
            </div>
            : ""}

            {(tabValue === 1) ? 
            <div>
                <form noValidate autoComplete="off" className="form" onSubmit={handleSearch}>
                    <Paper component="form" className="webSearch" variant="outlined">
                    <InputBase
                        className="input"
                        placeholder="아티스트를 입력하세요."
                        inputProps={{ 'aria-label': 'keyword' }}
                        value={keyword}
                        onChange={handleValueChange}
                    />
                    <IconButton type="submit" aria-label="keyword">
                        <SearchIcon />
                    </IconButton>
                    </Paper>
                </form>
                {searchResult.length !== 0 ? searchResultTable(searchResult) : ""}
            </div>
            : ""}

            <form noValidate autoComplete="off" className="form" onSubmit={handleSubmit}>
                <TextField id="standard-basic" label="제목" name="title"
                    inputProps={InputProps} InputLabelProps={InputLabelProps}
                    required={true} onChange={handleTitleInput} value={form.title}/><br></br>
                <TextField id="standard-basic" label="아티스트" name="artist"
                    inputProps={InputProps} InputLabelProps={InputLabelProps}
                    required={true} onChange={handleArtistInput} value={form.artist}/><br />
                <TextField id="standard-basic" label="장르" name="genre"
                    inputProps={InputProps} InputLabelProps={InputLabelProps}
                    onChange={handleGenreInput} value={form.genre}/><br />

                <div className="guide"><br />이 음악은 &nbsp;
                <Select labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={form.categoryID}
                    onChange={handleCategory}
                    name="category"
                    style={{fontSize: '1.7rem'}}>
                    {category ? category.map(cat => {
                        return (
                            <MenuItem value={cat.categoryID} style={{fontSize: '1.7rem', fontWeight: 500}}>
                                {cat.categoryName}</MenuItem>
                        )
                    }) : "error occured"}
                </Select>
                &nbsp;음악입니다.</div><br />

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

                <Fab variant="extended" className="submitBtn" id="music" type="submit">추가하기</Fab>
            </form>
        </Card>
    )
}

export default MusicAdd;