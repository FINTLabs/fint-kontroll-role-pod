import React, {useState} from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Search from "./Search";
import LayersIcon from '@mui/icons-material/Layers';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import PeopleIcon from '@mui/icons-material/People';
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
            <Tooltip title={"Select Units"}>
                <IconButton
                    aria-label="settings"
                    onClick={onShowDialog}
                >
                    <PeopleIcon color={"primary"}/>
                </IconButton>
            </Tooltip>

            {showLayers ? (
                <Tooltip title={"Show subgroups (click to turn off)"}>
                    <IconButton
                        aria-label="settings"
                        onClick={() => setShowLayers(false)}
                    >
                        <LayersIcon color={"primary"}/>
                    </IconButton>
                </Tooltip>

            ) : (
                <Tooltip title="Show subgroups (click to turn on)">
                    <IconButton
                        aria-label="settings"
                        onClick={() => setShowLayers(true)}
                    >
                        <LayersClearIcon color={"primary"}/>
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

export default CustomTableToolbar;
