import React from 'react';
import PropTypes from 'prop-types';

const TitleForm = React.memo( ( { title } ) => {
    return (
        <h2 className="mb-3 text-center title-form">
            { title }
        </h2>
    );
} );

TitleForm.propTypes = {
    title: PropTypes.string.isRequired
};

export default TitleForm;
