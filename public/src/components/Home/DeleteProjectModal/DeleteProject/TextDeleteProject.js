import React from 'react';

const TextDeleteProject = React.memo( () => {
    return (
        <div className="col-12 text-center">
            <p>
                ¿Estás seguro/a de eliminar este proyecto?
            </p>
        </div>
    );
} );

export default TextDeleteProject;
