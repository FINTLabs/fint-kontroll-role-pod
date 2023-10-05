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
    const [basePath, setBasePath] = useState('');

    useEffect(() => {
        const getBasePath = () => {
            axios.get('api/layout/configuration')
                .then(response => {
                        setBasePath(response.data.basePath)
                        console.log("basePath i context", response.data.basePath)
                    }
                )
                .catch((err) => {
                    console.error(err);
                })
        }
        getBasePath()
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <RolesProvider basePath={basePath}>
                <MembersProvider basePath={basePath}>
                    <OrgUnitsProvider basePath={basePath}>
                        <Routes>
                            <Route path={`${basePath}/grupper/`} element={<MainContainer/>}/>
                            <Route path={`${basePath}/grupper/info/:roleId`} element={<DetailsContainer/>}/>
                            <Route path={`${basePath}/grupper/add/:roleId`} element={<ResourceAddGrid/>}/>
                        </Routes>
                    </OrgUnitsProvider>
                </MembersProvider>
            </RolesProvider>
        </ThemeProvider>
    );
}

export default App;