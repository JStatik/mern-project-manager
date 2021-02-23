import React from 'react';

const Loading = React.memo( () => {
    return (
        <div className="container-spinner-main" style={ { backgroundImage: `url( /assets/images/login-register.jpg )` } }>
            <div className="spinner-main">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
            </div>
        </div>
    );
} );

export default Loading;
