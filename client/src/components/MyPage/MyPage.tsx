import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import TextField from '@material-ui/core/TextField';
import Login from '../Login';
import Axios from 'axios';
import MyMusic from './MyMusic';
import MyMovie from './MyMovie';
import MyBook from './MyBook';
import Footer from '../footer';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import '../styles/Content.scss';
import '../styles/MyPage.scss';
import { lightMode } from 'src/modules/appbar';

interface Content {
  component: JSX.Element;
  subtitle: JSX.Element;
}

interface UserInfo {
  userID: number;
  userName: string;
  description: string;
  userPassword: string;
}

const MyPage: React.FC<{ lightMode: () => void }> = ({ lightMode }) => {
  const musicContent: Content = {
    component: <MyMusic />, 
    subtitle: <div className="myPageSubtitle" id="myPageMusicSub">내가 추가한 음악 관리하기</div>
  };
  const movieContent: Content = {
    component: <MyMovie />,
    subtitle: <div className="myPageSubtitle" id="myPageMovieSub">내가 추가한 영화 관리하기</div>
  };
  const bookContent: Content = {
    component: <MyBook />, 
    subtitle: <div className="myPageSubtitle" id="myPageBookSub">내가 추가한 책 관리하기</div>
  };

  const [user, setUser] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userID: 0,
    userName: '',
    description: '',
    userPassword: ''
  });
  const [content, setContent] = useState<Content>(movieContent);
  const [tabValue, setTabValue] = useState<number>(1);
  const [isEditFormOpen, setIsEditFormOpen] = useState<string>("none");
  const [editForm, setEditForm] = useState<string>("");

  const InputProps: object = { style: { fontSize: '1.7rem' } }

  useEffect(() => {
    document.body.style.backgroundColor = 'whitesmoke';

    lightMode();

    if(sessionStorage.userName){
      setUser(sessionStorage.userName);
      getUserInfo();
    }

  }, []);

  const getUserInfo = () => {
    Axios({
      method: 'post',
      url: '/api/user',
      data: {
        userID: sessionStorage.userID
      }
    })
    .then((res) => setUserInfo(res.data[0]))
    .catch((err) => console.log(err));
  }

  const handleLogout = () => {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userID');

    fetch('/api/user/logout')
    .then(() => alert('로그아웃 했습니다.'))
    .then(() => setUser(''))
    .catch((err) => console.log(err));

    window.location.assign('/MyPage');
  }

  const handleTabChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  }

  const handleEditFormDisplay = () => {
    if(isEditFormOpen === "none") {
      setIsEditFormOpen("flex");
    } else {
      setIsEditFormOpen("none");
    }
  }

  const handleEditFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm(e.target.value);
  }

  const handleSaveChange = () => {
    Axios({
      method: 'put',
      url: '/api/user',
      data: {
        userID: sessionStorage.userID,
        newDescription: editForm
      }
    })
    .then(res => {
      if(res.data.code === 200) {
        alert(res.data.alert);
        handleEditFormDisplay();
        getUserInfo();
      }
    })
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

          <Box className="myPage" borderRadius={10}>
            <div className="accountIconAlign">
              <AccountCircleRoundedIcon className="accountIcon"/>
            </div>
            <div className="userName">
              {userInfo.userName}
            </div>
            <p className="userDescription">
              {userInfo.description}
              <IconButton 
                style={{padding: '1rem', margin: '0 0 0.4rem 1rem'}}
                onClick={handleEditFormDisplay}
              >
                <EditRoundedIcon style={{fontSize: '1.7rem'}} />
              </IconButton>
            </p>
            
            <div className="formAlign"
              style={{display: `${isEditFormOpen}`}}>
              <TextField
                defaultValue={userInfo.description}
                onChange={handleEditFormInput}
                multiline={true}
                rowsMax={5}
                size="medium"
                variant="outlined"
                className="userEditForm"
                InputProps={InputProps}
              />
              <Button className="userEditSaveBtn" onClick={handleSaveChange}>
                저장하기
              </Button>
            </div>
            
            <Tabs
              value={tabValue}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleTabChange}
              aria-label="content tabs"
              centered
            >
              <Tab label="음악" className="contentTabs" onClick={() => {setContent(musicContent)}} />
              <Tab label="영화" className="contentTabs" onClick={() => {setContent(movieContent)}} />
              <Tab label="책" className="contentTabs" onClick={() => {setContent(bookContent)}} />
            </Tabs>
            
            <Divider />
            {content.subtitle}
            {content.component}
          </Box>
        </Container>
      </div>
    )
  }

  return (
    <div>
      {(user === '') ? <Login lightMode={lightMode}/> : myPage()}
      <Footer />
    </div>
  )
}

export default MyPage;