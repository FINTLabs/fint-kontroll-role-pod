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

interface CustomTableToolbarProps {
    numSelected: number;
    onDeleteClick: (event: React.MouseEvent<unknown>) => void;
}

function DataToolbar(props:CustomTableToolbarProps) {
    const { numSelected, onDeleteClick} = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Resources
                </Typography>
            )}
            <Search />
            <AddCircleOutlineIcon />
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Add New Resources">
                    <IconButton  onClick={onDeleteClick}>
                        <CreateIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

export default DataToolbar;
