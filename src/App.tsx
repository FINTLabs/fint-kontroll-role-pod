import React, {useEffect, useState} from 'react';
import theme from './template/theme';
import {ThemeProvider} from "@mui/material/styles";
import {Routes, Route} from 'react-router-dom';
import MainContainer from './features/main/Container';
import {MembersProvider} from "./context/MemberContext";
import ResourceAddGrid from "./features/resources/ResourceAddGrid";
import DetailsContainer from "./features/details/Container";
import {OrgUnitsProvider} from "./context/OrgUnitContext";
import {RolesProvider} from "./context/RolesContext";
import { getBasePath } from './context/basePathUtils';


function App() {
    const [basePath, setBasePath] = useState('');

    useEffect(() => {
        // Call the getBasePath function to fetch the basePath
        getBasePath()
            .then((basePathValue: any) => {
                setBasePath(basePathValue);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <RolesProvider>
                <MembersProvider>
                    <OrgUnitsProvider>
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
