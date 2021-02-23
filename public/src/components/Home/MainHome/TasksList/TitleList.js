import React, { useContext } from 'react';
import { HomeContext } from '../../../../context/Home/HomeContext';

const TitleList = () => {
    const { activeProject } = useContext( HomeContext );
    const { project } = activeProject;

    return (
        <div className="col-12 subtitle-home">
            <h5>
                Project: { project }
            </h5>
        </div>
    );
};

export default TitleList;
