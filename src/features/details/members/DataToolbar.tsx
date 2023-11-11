import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Search from "./Search";

function DataToolbar() {

    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
            }}
        >
            <Typography
                sx={{flex: '1 1 100%'}}
                variant="h2"
                id="tableTitle"
                // component="div"
            >
                Medlemmer i gruppen
            </Typography>
            <Search/>

        </Toolbar>
    );
}

export default DataToolbar;
