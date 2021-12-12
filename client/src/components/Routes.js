import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from '../Pages/Home';
import CreateVote from '../Pages/createVote';
import VoteViewer from '../Pages/VoteViewer';

const index = () => {
  return (
    <Router>
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