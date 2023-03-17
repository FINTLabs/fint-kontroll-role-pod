import React, {useState} from 'react';
import { makeStyles } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {alpha, Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import Search from "./Search";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function DataToolbar() {

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
            }}
        >
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Members
                </Typography>
            <Search />
        </Toolbar>
    );
}

export default DataToolbar;
