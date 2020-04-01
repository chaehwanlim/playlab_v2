import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppBar from "./components/AppBar";
import Home from "./components/Home";
import Search from "./components/Search/Search";
import Popular from "./components/Popular/Popular";
import PlaylistAdd from "./components/PlaylistAdd/PlaylistAdd";
import MyPage from "./components/MyPage/MyPage";
import Login from "./components/Login";

const App: React.FC = () => {
  return (
    <Router>
      <AppBar />
      <Route exact path="/" component={Home} />
      <Route path="/Search" component={Search} />
      <Route path="/Popular" component={Popular} />
      <Route path="/PlaylistAdd" component={PlaylistAdd} />
      <Route path="/MyPage" component={MyPage} />
      <Route path="/Login" component={Login} />
    </Router>
  )
};

export default App;

