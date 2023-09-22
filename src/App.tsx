import React, {useEffect, useState} from 'react';
import theme from './template/theme';
import {ThemeProvider} from "@mui/material/styles";
import {Routes, Route} from 'react-router-dom';
import MainContainer from './features/main/Container';
import RolesProvider from "./context/roleContext/RolesContext";
import MemberProvider from "./context/memberContext/MemberContext";
import ResourceAddGrid from "./features/resources/ResourceAddGrid";
import DetailsContainer from "./features/details/Container";
import {OrgUnitsProvider} from "./context/OrgUnitContext";
import axios from "axios";

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
                <MemberProvider>
                    <OrgUnitsProvider>
                    <Routes>
                        <Route path={`${basePath}/role/`} element={<MainContainer/>}/>
                        <Route path={`${basePath}/role/info/:roleId`} element={<DetailsContainer/>}/>
                        <Route path={`${basePath}/role/add/:roleId`} element={<ResourceAddGrid/>}/>
                    </Routes>
                    </OrgUnitsProvider>
                </MemberProvider>
            </RolesProvider>
        </ThemeProvider>
    );
}

export default App;
