const types = {
    login: '[Auth] Login',
    logout: '[Auth] Logout',
    register: '[Auth] Register',
    verifyJWT: '[Auth] Verify JWT',

    activeProject: '[Home] Active Project',
    hideFormTasks: '[Home] Hide Form Tasks',
    inactiveProject: '[Home] Inactive Project',
    addNewProjectHome: '[Home] Add New Project Home',
    toggleDeleteProjectModal: '[Home] Toggle Delete Project Modal',
    deleteProjectHome: '[Home] Delete Project Home',
    clearHomeContext: '[Home] Clear Home Context',

    showProjectForm: '[Aside] Show Project Form',
    getAllProjects: '[Aside] Get All Projects',
    addNewProjectAside: '[Aside] Add New Project Aside',
    deleteProjectAside: '[Aside] Delete Project Aside',
    clearAsideContext: '[Aside] Clear Aside Context',

    getAllTasks: '[Main] Get All Tasks',
    addNewTaskMain: '[Main] Add New Task Main',
    deleteTaskMain: '[Main] Delete Task Main',
    changeStateTask: '[Main] Change State Task',
    activeTask: '[Main] Active Task',
    removeActiveTask: '[Main] Remove Active Task',
    editTask: '[Main] Edit Task',
    clearMainContext: '[Main] Clear Main Context'
};

export default types;
