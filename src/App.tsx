import React from 'react';
import theme from './template/theme';
import {ThemeProvider} from "@mui/material/styles";
import {Routes, Route} from 'react-router-dom';
import MainContainer from './features/main/Container';
import RolesProvider from "./context/roleContext/RolesContext";
import MemberProvider from "./context/memberContext/MemberContext";
// import DetailsContainer from "./features/details/Container";
import ResourceAddGrid from "./features/resources/ResourceAddGrid";
import DetailsContainer from "./features/details/Container";
import DropDownTest from "./features/common/SelectTest";


function App() {
    return (
        <ThemeProvider theme={theme}>
            <RolesProvider>
                <MemberProvider>
                    <Routes>
                        <Route path="/" element={<MainContainer/>}/>
                        <Route path="/info/:roleId" element={<DetailsContainer/>}/>
                        <Route path="/add/:roleId" element={<ResourceAddGrid/>}/>
                        <Route path="/test" element={<DropDownTest/>}/>
                    </Routes>
                </MemberProvider>
            </RolesProvider>
        </ThemeProvider>
    );
}

export default App;
