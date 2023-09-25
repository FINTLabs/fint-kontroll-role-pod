import React, {useEffect, useState} from 'react';
import axios from "axios";
import theme from './template/theme';
import {ThemeProvider} from "@mui/material/styles";
import {Routes, Route} from 'react-router-dom';
import MainContainer from './features/main/Container';
import {MembersProvider} from "./context/MemberContext";
import ResourceAddGrid from "./features/resources/ResourceAddGrid";
import DetailsContainer from "./features/details/Container";
import {OrgUnitsProvider} from "./context/OrgUnitContext";
import {RolesProvider} from "./context/RolesContext";


function App() {
    const [basePath, setBasePath] = useState("")

    useEffect(() => {
        axios.get('api/layout/configuration')
            .then(value => {
                setBasePath(value.data.basePath);
            });
    }, [])
    return (
        <ThemeProvider theme={theme}>
            <RolesProvider>
                <MembersProvider>
                    <OrgUnitsProvider>
                    <Routes>
                        <Route path={`${basePath}/grupper/`} element={<DetailsContainer/>}/>
                        <Route path={`${basePath}/grupper/info/:roleId`} element={<MainContainer/>}/>
                        <Route path={`${basePath}/grupper/add/:roleId`} element={<ResourceAddGrid/>}/>
                    </Routes>
                    </OrgUnitsProvider>
                </MembersProvider>
            </RolesProvider>
        </ThemeProvider>
    );
}

export default App;
