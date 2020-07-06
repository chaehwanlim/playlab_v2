import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import AddIcon from '@material-ui/icons/AddRounded';
import StarIcon from '@material-ui/icons/StarRounded';
import ViewCarousel from '@material-ui/icons/ViewCarousel';
import AccountCircle from '@material-ui/icons/AccountCircle';
import BookmarksRounded from '@material-ui/icons/BookmarksRounded';
import Container from '@material-ui/core/Container';
import CloseIcon from '@material-ui/icons/Close';
import BookmarkListContainer from '../containers/BookmarkListContainer';
import { Link } from "react-router-dom";
import './styles/AppBar.scss';
import './styles/Bookmark.scss';

import { useSelector } from 'react-redux';
import { StoreState } from '../modules';

const useStyles = makeStyles({
  paper: {
    backgroundColor: 'whitesmoke',
  }
});

const _AppBar = () => 
{
  const [drawerState, setDrawerState] = useState(false);
  const themeMode: string = useSelector((state: StoreState) => state.appbar.mode);
  const text = themeMode === "lightMode" ? { color: 'black' } : { color: 'white' };

  const classes = useStyles();

  return (
    <div className="appBar">
      <AppBar position="static" className="blurredAppbar" id={themeMode}>
        <Container maxWidth="lg">
          <Toolbar style={{padding: '0rem'}}>
            <Typography className="title">
              <Link to="/" className="link" style={text}>
                PlayLab
              </Link>
            </Typography>

            <React.Fragment>
              <IconButton style={text} onClick={() => setDrawerState(true)}>
                <BookmarksRounded style={{fontSize: '2rem'}} />
              </IconButton>
              
              <Drawer anchor={"right"}
                open={drawerState} 
                onClose={() => setDrawerState(false)} 
                classes={{paper: classes.paper}}>
              <div className="bookmark">
                <IconButton 
                  onClick={() => setDrawerState(false)} 
                  style={{position: 'absolute', top: '0.5rem', right: '0.5rem', padding: '1rem 1rem 1rem 1rem'}}
                >
                  <CloseIcon style={{fontSize: '2.4rem'}}/>
                </IconButton>
                <div className="bookmark-title">
                  북마크
                </div>
                <div className="bookmark-subtitle">
                  북마크한 작품을 이곳에서 확인하세요.
                </div>
                
                <BookmarkListContainer />
              </div>
              </Drawer>
            </React.Fragment>

            <Link to="/Popular" >
              <IconButton style={text}><StarIcon style={{fontSize: '2.2rem'}}/></IconButton>
            </Link>
            <Link to="/PlaylistAdd" >
              <IconButton style={text}><AddIcon style={{fontSize: '2.2rem'}}/></IconButton>
            </Link>
            <Link to="/Transmedia" >
              <IconButton style={text}><ViewCarousel style={{fontSize: '2.2rem'}}/></IconButton>
            </Link>
            <Link to="/MyPage" >
              <IconButton style={text}><AccountCircle style={{fontSize: '2.2rem'}}/></IconButton>
            </Link>


          </Toolbar>
        </Container>
      </AppBar>
    </div> 
  );
}

export default _AppBar;