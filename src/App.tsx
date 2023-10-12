import React from 'react';
import theme from './template/theme';
import {ThemeProvider} from "@mui/material/styles";
import {BasePathProvider} from "./context/BasePathContext";
import AppRoutes from './routes';

function App() {

    // if (process.env.NODE_ENV === 'production' && basePath === '') {
    //     return <div>Loading...</div>;
    // }

    return (
        <ThemeProvider theme={theme}>
            <BasePathProvider>
                <AppRoutes />
            </BasePathProvider>
        </ThemeProvider>
    );
}

export default App;