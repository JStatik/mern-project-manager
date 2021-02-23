import React from 'react';
import { Modal } from 'react-bootstrap';
import ButtonDeleteProject from './DeleteProject/ButtonDeleteProject';
import TextDeleteProject from './DeleteProject/TextDeleteProject';

const DeleteProject = React.memo( () => {
    return (
        <Modal.Body>
            <div className="row">
                <TextDeleteProject />

                <ButtonDeleteProject />
            </div>
        </Modal.Body>
    );
} );

export default DeleteProject;
