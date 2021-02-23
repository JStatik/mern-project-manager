import React, { useContext } from 'react';
import { HomeContext } from '../context/Home/HomeContext';
import '../components/Home/index.css';
import AsideHome from '../components/Home/AsideHome';
import DeleteProjectModal from '../components/Home/DeleteProjectModal';
import EditTaskModal from '../components/Home/EditTaskModal';
import MainHome from '../components/Home/MainHome';
import SelectProject from '../components/Home/SelectProject';

const Home = () => {
    const { showSelectProject } = useContext( HomeContext );

    return (
        <div className="container-home" style={ { backgroundImage: `url( /assets/images/home.jpg )` } }>
            <div className="row">
                <AsideHome />

                {
                    showSelectProject
                        ?
                    <SelectProject />
                        :
                    <MainHome />
                }
            </div>

            <DeleteProjectModal />

            <EditTaskModal />
        </div>
    );
};

export default Home;
