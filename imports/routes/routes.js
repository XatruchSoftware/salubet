import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Meteor } from 'meteor/meteor';

import PrivateRoute from './PrivateRoute';
import Dashboard from '../ui/Dashboard';
import Login from '../ui/Login';
import Signup from '../ui/Signup'

export const history = createBrowserHistory();

export const routes = (
    <Router history={history}>
        <Switch >
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
        </Switch>
    </Router>
);