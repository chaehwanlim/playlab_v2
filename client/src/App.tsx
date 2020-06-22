import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppBar from "./components/AppBar";
import Home from "./components/Home";
import Popular from "./components/Popular/Popular";
import PlaylistAdd from "./components/PlaylistAdd/PlaylistAdd";
import Transmedia from './components/Transmedia/Transmedia';
import MyPage from "./components/MyPage/MyPage";
import Login from "./components/Login";

import { useDispatch } from 'react-redux';
import { lightMode, darkMode } from './modules/appbar';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const _lightMode = () => {
    dispatch(lightMode());
  }

  const _darkMode = () => {
    dispatch(darkMode());
  }

  return (
    <Router>
      <AppBar />
      <Route exact path="/" render={() => <Home darkMode={_darkMode} />} />
      <Route path="/Popular" render={() => <Popular lightMode={_lightMode} />} />
      <Route path="/PlaylistAdd" render={() => <PlaylistAdd lightMode={_lightMode} />} />
      <Route path="/Transmedia" component={Transmedia} />
      <Route path="/MyPage" render={() => <MyPage lightMode={_lightMode} />} />
      <Route path="/Login" render={() => <Login lightMode={_lightMode} />} />
    </Router>
  )
};

export default App;

