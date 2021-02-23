import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/Auth/AuthContext';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import AuthRoutes from './AuthRoutes';
import DashboardRoutes from './DashboardRoutes';
import Loading from '../pages/Loading';

const RouterApp = () => {
    const { checking, logged, verifyJWT } = useContext( AuthContext );

    useEffect( () => {
        verifyJWT();
    }, [ verifyJWT ] );

    if( checking ) {
        return <Loading />
    }

    return (
        <Router>
            <div>
                <Switch>                    
                    <PublicRoute path="/auth" isAuthenticated={ logged } component={ AuthRoutes } />
                    <PrivateRoute path="/" isAuthenticated={ logged } component={ DashboardRoutes } />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    );
};

export default RouterApp;
