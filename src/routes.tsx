import React from 'react';
import {Routes, Route} from 'react-router-dom';
import MainContainer from './features/main/Container';
import DetailsContainer from './features/details/Container';
import {useBasePath} from "./context/BasePathContext";

function AppRoutes() {
    const basePath = useBasePath() || '';

    const searchParams = new URLSearchParams(window.location.search);
    console.log('URL Parameters:', searchParams.get('id'));

    const id = searchParams.get('id');


    return (
        <Routes>
            {/*<Route path={`${basePath}/grupper/`} element={<MainContainer />} />*/}
            <Route path={`${basePath}/grupper/`} element={<DetailsContainerWrapper id={id}/>} />
        </Routes>
    );
}

function DetailsContainerWrapper({ id }: { id: string | null }) {
    if(id){
        return <DetailsContainer roleId={id?id:''} />
    } else {
        return <MainContainer />;
    }

    // return <DetailsContainer roleId={id || ''} />;
}

export default AppRoutes;
