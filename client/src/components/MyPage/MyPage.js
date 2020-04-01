import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import Login from '../Login';
import Axios from 'axios';
import MyMusic from './MyMusic';
import MyMovie from './MyMovie';
import MyBook from './MyBook';
import Footer from '../footer';
import '../styles/Content.scss';
import '../styles/MyPage.scss';


export default function MyPage() {
  const musicContent = {
    component: <MyMusic />, 
    subtitle: <div className="myPageSubtitle" id="myPageMusicSub">내가 추가한 음악 관리하기</div>
  };
  const movieContent = {
    component: <MyMovie />,
    subtitle: <div className="myPageSubtitle" id="myPageMovieSub">내가 추가한 영화 관리하기</div>
  };
  const bookContent = {
    component: <MyBook />, 
    subtitle: <div className="myPageSubtitle" id="myPageBookSub">내가 추가한 책 관리하기</div>
  };

  const [user, setUser] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [content, setContent] = useState(movieContent);

  useEffect(() => {
    if(sessionStorage.userName){
      setUser(sessionStorage.userName);
    }

    Axios({
      method: 'post',
      url: '/api/myPage/',
      data: {
        userName: sessionStorage.userName
      }
    })
    .then(res => setUserInfo(res.data[0]))
    .catch(err => console.log(err));
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userID');
    setUser('');
    Axios({
      method:'get',
      url: '/api/logout',
      data: {'logout' : true}
    })
    .then(alert('로그아웃 했습니다.'))
    .then(setUser(''))
    .catch(err => console.log(err));
  }
  
  const myPage = () => {
    return (
      <div className="header">
        <Container maxWidth="lg">
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <div className="title">마이 페이지</div>
            </Grid>
            <Grid item xs={6}>
              <div className="btnAlign">
                <Fab variant="extended" className="logoutBtn"
                onClick = {handleLogout}>
                  로그아웃
                </Fab>
              </div>
            </Grid>
          </Grid>

          <Paper className="myPage" elevation={5}>
            <div className="accountIconAlign">
              <AccountCircleRoundedIcon className="accountIcon"/>
            </div>
            <div className="userName">
              {userInfo.userName}
            </div>
            <p className="userDescription">
              {userInfo.description}
            </p>

            <Button className="btnGroup" onClick={() => {setContent(musicContent)}}>
              음악</Button>
            <Button className="btnGroup" onClick={() => {setContent(movieContent)}}>
              영화</Button>
            <Button className="btnGroup" onClick={() => {setContent(bookContent)}}>
              책</Button>
            
            <Divider />
            {content.subtitle}
            {content.component}
            </Paper>
        </Container>
      </div>
    )
  }

  return (
    <div>
      {(user === '') ? <Login /> : myPage()}
      <Footer />
    </div>
  )
}