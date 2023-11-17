import React from 'react';
import {Route, Routes} from 'react-router-dom';
import MainContainer from './features/main/Container';
import DetailsContainer from './features/details/Container';
import {useBasePath} from "./context/BasePathContext";

function AppRoutes() {
    const basePath = useBasePath() || '';

    return (
        <main>
            <Routes>
                <Route path={`${basePath}/grupper/`} element={<MainContainer/>}/>
                <Route path={`${basePath}/grupper/info/:roleId`} element={<DetailsContainer/>}/>
            </Routes>
        </main>
    );
}

export default AppRoutes;