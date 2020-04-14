import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddRounded';
import StarIcon from '@material-ui/icons/StarRounded';
import ViewCarousel from '@material-ui/icons/ViewCarousel';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";
import { AppBarStyle } from '../modules/AppBarStyle';
import './styles/AppBar.scss';

type AppBarProps = {
  style: AppBarStyle; 
  toWhite: () => void;
  toBlack: () => void;
}

const _AppBar = ({
  style, toWhite, toBlack
}: AppBarProps) => 
{

  return (
    <div className="appBar">
      <AppBar position="static" className="appBarBackground">
        <Container maxWidth="lg">
          <Toolbar style={{padding: '0rem'}}>
            <Typography className="title">
              <Link to="/" className="link" 
                style={style}>
                PlayLab
              </Link>
            </Typography>

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