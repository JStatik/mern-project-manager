import React from 'react';
import { Modal } from 'react-bootstrap';

const TitleModal = React.memo( () => {
    return (
        <Modal.Header className="subtitle-home">
            <Modal.Title>Delete Project</Modal.Title>
        </Modal.Header>
    );
} );

export default TitleModal;
