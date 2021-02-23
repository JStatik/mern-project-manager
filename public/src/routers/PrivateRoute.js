import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ( { isAuthenticated, component: DashboardRoutes, ...rest } ) => {
    return (
        <>  
            <Route { ...rest } component={ ( props ) => {
                return ( isAuthenticated ) ? <DashboardRoutes { ...props } /> : <Redirect to="/auth/login" />
            } } />
        </>
    )
};

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
};

export default PrivateRoute;
