import React, {useContext, useState} from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Search from "./Search";
import LayersIcon from '@mui/icons-material/Layers';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import PeopleIcon from '@mui/icons-material/People';
import FilterType from "./FilterType";
import {RolesContext} from "../../context/roleContext";

interface CustomTableToolbarProps {
    onShowDialog: (event: React.MouseEvent<unknown>) => void;
}

function CustomTableToolbar(props:CustomTableToolbarProps) {
    const { onShowDialog } = props;
    const { isAggregate, setIsAggregate } = useContext(RolesContext);
    // const [showLayers, setShowLayers] = useState(true);

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

            {isAggregate ? (
                <Tooltip title={"aggregate"}>
                    <IconButton
                        aria-label="settings"
                        onClick={() => setIsAggregate(false)}
                    >
                        <LayersClearIcon color={"primary"}/>
                    </IconButton>
                </Tooltip>

            ) : (
                <Tooltip title="all">
                    <IconButton
                        aria-label="settings"
                        onClick={() => setIsAggregate(true)}
                    >
                        <LayersIcon color={"primary"}/>
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

export default CustomTableToolbar;
