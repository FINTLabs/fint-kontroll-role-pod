import React, {useContext} from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button, Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Search from "./Search";
import LayersIcon from '@mui/icons-material/Layers';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import FilterType from "./FilterType";
import {RolesContext} from "../../context/roleContext";
import {Apartment} from "@mui/icons-material";
import style from "../../template/style";

interface CustomTableToolbarProps {
    onShowDialog: (event: React.MouseEvent<unknown>) => void;
}

function CustomTableToolbar(props: CustomTableToolbarProps) {
    const {onShowDialog} = props;
    const {isAggregate, setIsAggregate} = useContext(RolesContext);
    // const [showLayers, setShowLayers] = useState(true);

    return (
        <Toolbar id={'rolesToolbar'}
                 sx={{
                     pl: {sm: 2},
                     pr: {xs: 1, sm: 1},
                 }}
        >
            <Typography
                sx={{flex: '1 1 100%'}}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Grupper
            </Typography>
            <Search/>
            <FilterType/>
            <Tooltip title={"Velg enhet"}>
                <Button
                    id={'selectUnitsIcon'}
                    variant="outlined"
                    endIcon={<Apartment/>}
                    onClick={onShowDialog}
                    sx={style.changeOrgButton}
                    style={{ fontSize: '1em' }}
                >
                    Velg enhet
                </Button>
            </Tooltip>

            {isAggregate ? (
                <Tooltip title={"Aggregated"}>
                    <IconButton
                        id={'aggregatedFalse'}
                        aria-label="settings"
                        onClick={() => setIsAggregate(false)}
                    >
                        <LayersClearIcon color={"primary"}/>
                    </IconButton>
                </Tooltip>

            ) : (
                <Tooltip title="Aggregated">
                    <IconButton
                        id={'aggregatedTrue'}
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
