import React, { useContext } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Tooltip, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Search from "./Search";
import LayersIcon from '@mui/icons-material/Layers';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import FilterType from "./FilterType";
import { RolesContext } from "../../context/roleContext";
import { Apartment } from "@mui/icons-material";
import style from "../../template/style";

interface CustomTableToolbarProps {
    onShowDialog: (event: React.MouseEvent<unknown>) => void;
}

function CustomTableToolbar(props: CustomTableToolbarProps) {
    const { onShowDialog } = props;
    const { isAggregate, setIsAggregate } = useContext(RolesContext);

    const handleToggleChange = () => {
        setIsAggregate(!isAggregate);
    };

    return (
        <Toolbar id={'rolesToolbar'}
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
            <Tooltip title={"Velg enhet"}>
                <Button
                    id={'selectUnitsIcon'}
                    variant="outlined"
                    endIcon={<Apartment />}
                    onClick={onShowDialog}
                    sx={style.changeOrgButton}
                    style={{ fontSize: '1em' }}
                >
                    Velg enhet
                </Button>
            </Tooltip>

            <ToggleButtonGroup value={isAggregate} exclusive onChange={handleToggleChange}>
                <ToggleButton value={true} aria-label="settings">
                    <LayersIcon color={isAggregate ? "primary" : "inherit"} />
                </ToggleButton>
                <ToggleButton value={false} aria-label="settings">
                    <LayersClearIcon color={!isAggregate ? "primary" : "inherit"} />
                </ToggleButton>
            </ToggleButtonGroup>
        </Toolbar>
    );
}

export default CustomTableToolbar;
