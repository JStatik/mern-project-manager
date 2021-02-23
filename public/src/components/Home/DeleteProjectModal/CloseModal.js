import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

const CloseModal = React.memo( ( { handleClose } ) => {
    return (
        <Modal.Footer>
            <button
                type="button"
                className="btn btn-delete-project"
                onClick={ () => handleClose() }
            >
                Close
            </button>
        </Modal.Footer>
    );
} );

CloseModal.propTypes = {
    handleClose: PropTypes.func.isRequired
};

export default CloseModal;
