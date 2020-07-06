import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarRounded';
import AddIcon from '@material-ui/icons/AddRounded';
import ViewCarousel from '@material-ui/icons/ViewCarousel';
import { Link } from 'react-router-dom';

const HomeCards: React.FC = () => {
  const menus = [{
    name: "인기 차트",
    location: '/Popular',
    icon: <StarIcon className="menu-icon"/>
  }, {
    name: "감상 추가",
    location: '/PlaylistAdd',
    icon: <AddIcon className="menu-icon"/>
  }, {
    name: "트랜스미디어",
    location: '/Transmedia',
    icon: <ViewCarousel className="menu-icon"/>
  }];

  return (
    <Container maxWidth="sm">
      <Grid container
        direction="row"
        justify="center"
        alignItems="center"
        className="menu-cards"
        spacing={3}
      >
        {
          menus.map((menu, index) => (
            <Grid item xs={12} md={4}>
              <Link to={menu.location} style={{ textDecoration: 'none' }}>
                <div className="menu-card" key={index}>
                  {menu.icon}
                  {menu.name}
                </div>
              </Link>
            </Grid>
          ))
        }
      </Grid>
    </Container>
  )
}

export default HomeCards;