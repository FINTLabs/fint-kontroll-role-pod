import React, {useEffect, useState} from 'react';
import axios from "axios";
import theme from './template/theme';
import {ThemeProvider} from "@mui/material/styles";
import {OrgUnitsProvider} from "./context/OrgUnitContext";
import {BasePathProvider} from "./context/BasePathContext";
import AppRoutes from './routes';

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

    if (process.env.NODE_ENV === 'production' && basePath === '') {
        return <div>Loading...</div>;
    }

    return (
        <ThemeProvider theme={theme}>
                {/*<MembersProvider basePath={basePath}>*/}
            <BasePathProvider>
                    <OrgUnitsProvider basePath={basePath}>
                        <AppRoutes />
                    </OrgUnitsProvider>
            </BasePathProvider>
                {/*</MembersProvider>*/}
        </ThemeProvider>
    );
}

export default App;