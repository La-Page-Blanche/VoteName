import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from '../Pages/Home';
import CreateVote from '../Pages/createVote';
import VoteViewer from '../Pages/VoteViewer';
import Navbar from './NavBar';

const index = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/create" exact component={CreateVote} />
        <Route path="/:id" exact component={VoteViewer} />

        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default index;