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
import NoteIcon from '@material-ui/icons/Note';
import Container from '@material-ui/core/Container';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import BookmarkListContainer from '../containers/BookmarkListContainer';
import { Link } from "react-router-dom";
import './styles/AppBar.scss';


const useStyles = makeStyles({
  props: {
    MuiDrawer: {
      backgroundColor: 'whitesmoke',
    }
  }
});

const _AppBar = () => 
{
  const [drawerState, setDrawerState] = useState(false);
  const style = { color : 'white', textShadow: '' };

  const classes = useStyles();

  return (
    <div className="appBar">
      <AppBar position="static" className="appBarBackground">
        <Container maxWidth="lg">
          <Toolbar style={{padding: '0rem'}}>
            <Typography className="title">
              <Link to="/" className="link" style={style}>
                PlayLab
              </Link>
            </Typography>

            <React.Fragment>
              <IconButton style={style} onClick={() => setDrawerState(true)}>
                <NoteIcon style={{fontSize: '2.2rem'}} />
              </IconButton>
              
              <Drawer anchor={"right"} open={drawerState} onClose={() => setDrawerState(false)}>
              <div className="Memo">
                <div className="Memo-title">
                  <IconButton onClick={() => setDrawerState(false)}>
                    <CloseIcon style={{fontSize: '2.4rem'}}/>
                  </IconButton>
                  북마크
                </div>
                <div className="Memo-subtitle">
                  북마크한 작품을 이곳에서 확인하세요.
                </div>
                <Divider style={{marginTop: '1rem'}}/>
                <BookmarkListContainer />
              </div>
              </Drawer>
            </React.Fragment>

            <Link to="/Popular" >
              <IconButton style={style}><StarIcon style={{fontSize: '2.2rem'}}/></IconButton>
            </Link>
            <Link to="/PlaylistAdd" >
              <IconButton style={style}><AddIcon style={{fontSize: '2.2rem'}}/></IconButton>
            </Link>
            <Link to="/Transmedia" >
              <IconButton style={style}><ViewCarousel style={{fontSize: '2.2rem'}}/></IconButton>
            </Link>
            <Link to="/MyPage" >
              <IconButton style={style}><AccountCircle style={{fontSize: '2.2rem'}}/></IconButton>
            </Link>


          </Toolbar>
        </Container>
      </AppBar>
    </div> 
  );
}

export default _AppBar;