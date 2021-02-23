import React, { useCallback, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { HomeContext } from '../../context/Home/HomeContext';
import CloseModal from './DeleteProjectModal/CloseModal';
import DeleteProject from './DeleteProjectModal/DeleteProject';
import TitleModal from './DeleteProjectModal/TitleModal';
import types from '../../types/types';

const DeleteProjectModal = () => {
    const { toggleDeleteProjectModal, dispatchHome } = useContext( HomeContext );

    const handleClose = useCallback( () => {
        dispatchHome( {
            type: types.toggleDeleteProjectModal
        } );
    }, [ dispatchHome ] );

    return (
        <Modal
            show={ toggleDeleteProjectModal }
            onHide={ handleClose }
            backdrop="static"
            keyboard={ false }
            animation={ false }
            centered
            className="animate__animated animate__zoomIn"
        >
            <TitleModal />

            <DeleteProject />

            <CloseModal handleClose={ handleClose } />
        </Modal>
    );
};

export default DeleteProjectModal;
