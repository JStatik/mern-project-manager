import React from 'react';
import PropTypes from 'prop-types';
import DeleteButton from './Task/DeleteButton';
import EditButton from './Task/EditButton';
import NameTask from './Task/NameTask';
import StateButton from './Task/StateButton';
import StateTask from './Task/StateTask';

const Task = ( { task: taskAPI } ) => {
    const { id, task, state } = taskAPI;

    return (
        <div className="card col-10 offset-1 mb-3 animate__animated animate__slideInDown">
            <div className="row card-body text-center">
                <NameTask name={ task } />

                <StateTask state={ state } />

                <EditButton id={ id } />

                <DeleteButton id={ id } />

                <StateButton id={ id } state={ state } />
            </div>
        </div>
    );
};

Task.propTypes = {
    task: PropTypes.object.isRequired
};

export default Task;
