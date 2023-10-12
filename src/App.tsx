import React, {useEffect, useState} from 'react';
import axios from "axios";
import theme from './template/theme';
import {ThemeProvider} from "@mui/material/styles";
import {Routes, Route} from 'react-router-dom';
import MainContainer from './features/main/Container';
import ResourceAddGrid from "./features/resources/ResourceAddGrid";
import DetailsContainer from "./features/details/Container";
import {OrgUnitsProvider} from "./context/OrgUnitContext";
import {BasePathProvider} from "./context/BasePathContext";

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

        if (process.env.NODE_ENV === 'production') {
            getBasePath();
        }
    }, [])

    if (process.env.NODE_ENV === 'production' && !basePath) {
        return <div>Loading...</div>;
    }

    return (
        <ThemeProvider theme={theme}>
                {/*<MembersProvider basePath={basePath}>*/}
            <BasePathProvider>
                    <OrgUnitsProvider basePath={basePath}>
                        <Routes>
                            <Route path={`${basePath}/grupper/`} element={<MainContainer/>}/>
                            <Route path={`${basePath}/grupper/info/:roleId`} element={<DetailsContainer/>}/>
                            <Route path={`${basePath}/grupper/add/:roleId`} element={<ResourceAddGrid/>}/>
                        </Routes>
                    </OrgUnitsProvider>
            </BasePathProvider>
                {/*</MembersProvider>*/}
        </ThemeProvider>
    );
}

export default App;