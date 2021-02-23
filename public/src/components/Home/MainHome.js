import React, { useContext } from 'react';
import { HomeContext } from '../../context/Home/HomeContext';
import { MainContext } from '../../context/Home/MainContext';
import DeleteProjectButton from './MainHome/DeleteProjectButton';
import FormTasks from './MainHome/FormTasks';
import ReturnButton from './MainHome/ReturnButton';
import TasksList from './MainHome/TasksList';
import TitleMain from './MainHome/TitleMain';

const MainHome = () => {
    const { containerTasks } = useContext( MainContext );
    const { showMain, hideFormTasks } = useContext( HomeContext );

    return (
        <section className={ `col-md-9 animate__animated animate__fadeIn ${ !showMain && 'd-none d-sm-block' }` }>
            <main>
                <div className="panel-control pb-4 title-task">
                    <TitleMain />

                    <ReturnButton />
                </div>

                <div
                    id="containerTasks"
                    className="tasks pt-4"
                    ref={ containerTasks }
                >
                    { !hideFormTasks && <FormTasks /> }

                    <TasksList />
                </div>
            </main>

            <footer>
                <DeleteProjectButton />
            </footer>
        </section>
    );
};

export default MainHome;
