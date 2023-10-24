import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainContainer from './features/main/Container';
import DetailsContainer from './features/details/Container';
import {useBasePath} from "./context/BasePathContext";

function AppRoutes() {
    const basePath = useBasePath() || '';

    return (
        <Routes>
            <Route path={`${basePath}/grupper/`} element={<MainContainer />} />
            <Route path={`${basePath}/grupper/info/:roleId`} element={<DetailsContainer />} />
        </Routes>
    );
}

export default AppRoutes;