import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppBarContainer from "./containers/AppBarContainer";
import Home from "./components/Home";
import Popular from "./components/Popular/Popular";
import PlaylistAdd from "./components/PlaylistAdd/PlaylistAdd";
import Transmedia from './components/Transmedia/Transmedia';
import MyPage from "./components/MyPage/MyPage";
import Login from "./components/Login";

const App: React.FC = () => {
  return (
    <Router>
      <AppBarContainer />
      <Route exact path="/" component={Home} />
      <Route path="/Popular" component={Popular} />
      <Route path="/PlaylistAdd" component={PlaylistAdd} />
      <Route path="/Transmedia" component={Transmedia} />
      <Route path="/MyPage" component={MyPage} />
      <Route path="/Login" component={Login} />
    </Router>
  )
};

export default App;

