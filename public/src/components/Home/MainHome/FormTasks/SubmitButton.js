import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = React.memo( ( { loading, text } ) => {
    return (
        <div className="form-group pt-2 mb-2 text-center">
            <button
                type="submit"
                className="btn"
                disabled={ loading }
            >
                {
                    !loading
                        ?
                    text
                        :
                    <>
                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                        <span className="visually-hidden" style={ { marginLeft: '4px' } }>
                            Loading...
                        </span>
                    </>
                }
            </button>
        </div>
    );
} );

SubmitButton.propTypes = {
    loading: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
};

export default SubmitButton;
