import React, {useState} from 'react';
import { makeStyles } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {alpha, Button, Checkbox, FormControlLabel, Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import Search from "./Search";
import LayersIcon from '@mui/icons-material/Layers';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import PeopleIcon from '@mui/icons-material/People';
import {Link} from "react-router-dom";
import {SettingsRounded} from "@mui/icons-material";
import FilterType from "./FilterType";

interface CustomTableToolbarProps {
    onShowDialog: (event: React.MouseEvent<unknown>) => void;
}

function CustomTableToolbar(props:CustomTableToolbarProps) {
    const { onShowDialog } = props;
    const [showLayers, setShowLayers] = useState(true);

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
                    Grupper
                </Typography>
            <Search />
            <FilterType />
            <IconButton
                aria-label="settings"
                onClick={onShowDialog}
            >
                <PeopleIcon color={"primary"}/>
            </IconButton>

            {showLayers ? (
                    <IconButton
                        aria-label="settings"
                        onClick={() => setShowLayers(false)}
                    >
                        <LayersIcon color={"primary"}/>
                    </IconButton>

            ) : (
                <IconButton
                    aria-label="settings"
                    onClick={() => setShowLayers(true)}
                >
                    <LayersClearIcon color={"primary"}/>
                </IconButton>
            )}
        </Toolbar>
    );
}

export default CustomTableToolbar;
