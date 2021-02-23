import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RedirectForm = React.memo( ( { text, to, toText } ) => {
    return (
        <div className="row">
            <div className="col-12 text-center">
                <span className="container-link">
                    { text }

                    <Link to={ to } className="link">
                        { ` ${ toText }` }
                    </Link>
                </span>
            </div>
        </div>
    );
} );

RedirectForm.propTypes = {
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    toText: PropTypes.string.isRequired
};

export default RedirectForm;
