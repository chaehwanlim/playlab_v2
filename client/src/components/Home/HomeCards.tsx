import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarRounded';
import AddIcon from '@material-ui/icons/AddRounded';
import ViewCarousel from '@material-ui/icons/ViewCarousel';

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

  const menuClick = (index: number) => {
    location.assign(menus[index].location);
  }

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
              <div className="menu-card" onClick={() => menuClick(index)} key={index}>
                {menu.icon}
                {menu.name}
              </div>
            </Grid>
          ))
        }
      </Grid>
    </Container>
  )
}

export default HomeCards;