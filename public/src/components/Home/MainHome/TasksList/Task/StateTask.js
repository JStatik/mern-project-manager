import React from 'react';
import PropTypes from 'prop-types';

const StateTask = React.memo( ( { state } ) => {
    return (
        <div className="col-sm-12 col-md-3 pb-2">
            <span className={ `text-white badge ${ state ? 'bg-success' : 'bg-danger' }` }>
                {
                    state
                        ?
                    'Complete'
                        :
                    'Incomplete'
                }
            </span>
        </div>
    );
} );

StateTask.propTypes = {
    state: PropTypes.bool.isRequired
};

export default StateTask;
