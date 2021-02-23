import React from 'react';
import PropTypes from 'prop-types';

const IconInput = React.memo( ( { error, icon } ) => {
    return (
        <div className="col-1 p-0 text-center">
            <label>
                <i className={ `fas ${ icon } ${ error && 'invalid-icon' }` }></i>
            </label>
        </div>
    );
} );

IconInput.propTypes = {
    error: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
};

export default IconInput;
