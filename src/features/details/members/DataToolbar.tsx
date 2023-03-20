import React, {useState} from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Search from "./Search";
import LayersIcon from "@mui/icons-material/Layers";
import LayersClearIcon from "@mui/icons-material/LayersClear";

function DataToolbar() {
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
                    Members
                </Typography>
            <Search />
            {showLayers ? (
                <Tooltip title={"Do not show subgroups"}>
                    <IconButton
                        aria-label="settings"
                        onClick={() => setShowLayers(false)}
                    >
                        <LayersIcon color={"primary"}/>
                    </IconButton>
                </Tooltip>

            ) : (
                <Tooltip title="Show subgroups">
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

export default DataToolbar;
