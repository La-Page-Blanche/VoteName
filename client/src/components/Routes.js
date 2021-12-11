import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from '../Pages/Home';
import CreateVote from '../Pages/createVote';

const index = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/create" exact component={CreateVote} />

        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default index;