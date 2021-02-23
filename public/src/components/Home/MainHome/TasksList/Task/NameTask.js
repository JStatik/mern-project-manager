import React from 'react';
import PropTypes from 'prop-types';

const NameTask = React.memo( ( { name } ) => {
    return (
        <div className="col-sm-12 col-md-6 pt-2">
            <h6>{ name }</h6>
        </div>
    );
} );

NameTask.propTypes = {
    name: PropTypes.string.isRequired
};

export default NameTask;
