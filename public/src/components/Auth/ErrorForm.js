import React from 'react';
import PropTypes from 'prop-types';

const ErrorForm = React.memo( ( { error } ) => {
    return (
        <p className="alert-error">
            { error }
        </p>
    );
} );

ErrorForm.propTypes = {
    error: PropTypes.string.isRequired
};

export default ErrorForm;
