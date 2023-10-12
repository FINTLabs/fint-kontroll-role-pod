// Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainContainer from './features/main/Container';
import ResourceAddGrid from './features/resources/ResourceAddGrid';
import DetailsContainer from './features/details/Container';
import {useBasePath} from "./context/BasePathContext";

function AppRoutes() {
    const basePath = useBasePath() || '';

    return (
        <Routes>
            <Route path={`${basePath}/grupper/`} element={<MainContainer />} />
            <Route path={`${basePath}/grupper/info/:roleId`} element={<DetailsContainer />} />
            <Route path={`${basePath}/grupper/add/:roleId`} element={<ResourceAddGrid />} />
        </Routes>
    );
}

export default AppRoutes;
