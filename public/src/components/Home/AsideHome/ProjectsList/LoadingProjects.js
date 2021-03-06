import React from 'react';

const LoadingProjects = React.memo( () => {
    return (
        <div className="col-12 container-loading-projects-tasks">
            <div className="spinner">
                <div className="rect1"></div>
                <div className="rect2"></div>
                <div className="rect3"></div>
                <div className="rect4"></div>
                <div className="rect5"></div>
            </div>
        </div>
    );
} );

export default LoadingProjects;
