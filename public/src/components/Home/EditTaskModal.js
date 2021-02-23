import React, { useCallback, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { MainContext } from '../../context/Home/MainContext';
import CloseModal from './EditTaskModal/CloseModal';
import EditTaskForm from './EditTaskModal/EditTaskForm';
import TitleModal from './EditTaskModal/TitleModal';
import types from '../../types/types';

const EditTaskModal = () => {
    const { showEditTaskModal, dispatchMain } = useContext( MainContext );

    const handleClose = useCallback( () => {
        dispatchMain( {
            type: types.removeActiveTask
        } );
    }, [ dispatchMain ] );

    return (
        <Modal
            show={ showEditTaskModal }
            onHide={ handleClose }
            backdrop="static"
            keyboard={ false }
            animation={ false }
            centered
            className="animate__animated animate__zoomIn"
        >
            <TitleModal />

            <EditTaskForm />

            <CloseModal handleClose={ handleClose } />
        </Modal>
    );
};

export default EditTaskModal;
