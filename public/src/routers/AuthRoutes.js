import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';

const AuthRoutes = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/auth/login" component={ Login } />
                <Route exact path="/auth/register" component={ Register } />

                <Redirect to="/auth/login" />
            </Switch>
        </div>
    );
};

export default AuthRoutes;
