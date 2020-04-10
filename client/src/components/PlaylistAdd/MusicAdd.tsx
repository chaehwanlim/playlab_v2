import React, {useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Axios from 'axios';
import '../styles/Add.scss';
import MovieAdd from './MovieAdd';


const MusicAdd: React.FC = () => {
    const [category, setCategory] = useState<Array<Category>>([]);
    const [transmedia, setTransmedia] = useState<Array<Transmedia>>([]);

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

    const [form, setForm] = useState<MusicForm>({
        title : "",
        artist: "",
        genre: "",
        categoryID: 100,
        transmediaID: 10000,
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let nextState = form;
        nextState[e.target.name] = e.target.value;
        setForm(nextState);
    }
    const handleCategory = (e) => {
        e.preventDefault();
        setForm({
            ...form,
            categoryID : e.target.value
        });
    }
    const handleTransmedia = (e) => {
        e.preventDefault();
        setForm({
            ...form,
            transmediaID : e.target.value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(sessionStorage.userName) {
            addMusic();
        } else if (sessionStorage.userName === undefined) {
            alert('로그인이 필요합니다!');
            window.location.assign('/MyPage');
        }
        
    }  

    const addMusic = () => {
        Axios({
            method: 'post',
            url:'/api/musicAdd',
            data: {
                title : form.title,
                artist: form.artist,
                genre : form.genre,
                adderID : sessionStorage.getItem('userID'),
                categoryID : form.categoryID,
                trnasmediaID : form.transmediaID
            }
        })
        .then((res) => alert('음악을 정상적으로 추가했습니다!'))
        .catch((err) => console.log(err));

        initializeForm();
    }
    
    const initializeForm = () => {
        setForm({
            title : "",
            artist: "",
            genre: "",
            categoryID: 100,
            transmediaID: 10000,
        });
        console.log('cleared');
    }

    const InputProps: object = { style: {fontSize: '2rem'}};
    const InputLabelProps: object = { style: {fontSize: '1.7rem', color: 'primary'} }

    return (
        <Card className="card">
            <div className="formTitle">
                음악을 추가합니다.
            </div>
            <Divider/>
            <form noValidate autoComplete="off" className="form" onSubmit={handleSubmit}>
                <TextField id="standard-basic" label="제목" name="title"
                    inputProps={InputProps} InputLabelProps={InputLabelProps}
                    required={true} onChange={handleInput} /><br></br>
                <TextField id="standard-basic" label="아티스트" name="artist"
                    inputProps={InputProps} InputLabelProps={InputLabelProps}
                    required={true} onChange={handleInput} /><br />
                <TextField id="standard-basic" label="장르" name="genre"
                    inputProps={InputProps} InputLabelProps={InputLabelProps}
                    onChange={handleInput} /><br />

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

export default MovieAdd;