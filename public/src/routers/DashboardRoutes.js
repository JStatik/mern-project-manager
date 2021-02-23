import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';

const DashboardRoutes = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={ Home } />

                <Redirect to="/" />
            </Switch>
        </div>
    );
};

export default DashboardRoutes;
