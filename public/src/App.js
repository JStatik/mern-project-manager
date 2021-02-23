import React from 'react';
import { AsideProvider } from './context/Home/AsideContext';
import { AuthProvider } from './context/Auth/AuthContext';
import { HomeProvider } from './context/Home/HomeContext';
import { MainProvider } from './context/Home/MainContext';
import RouterApp from './routers/RouterApp';

const App = () => {
    return (
        <AuthProvider>
            <HomeProvider>
                <AsideProvider>
                    <MainProvider>
                        <RouterApp />
                    </MainProvider>
                </AsideProvider>
            </HomeProvider>
        </AuthProvider>
    );
};

export default App;
