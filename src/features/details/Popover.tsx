import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import {Alert, AlertTitle, Paper} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

export default function BasicPopover() {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        handleClose();
        console.log("DELETE GOES HERE");
    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <IconButton
                aria-describedby={id}
                onClick={handleClick}
                sx={{padding:0}}
            >
                <DeleteIcon />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Paper sx={{ p: .3, backgroundColor: 'warning.main' }} className="warning">
                    <Alert severity="warning"
                           action={
                               <IconButton
                                   aria-label="close"
                                   color="inherit"
                                   size="small"
                                   onClick={() => {
                                       handleDelete();
                                   }}
                               >
                                   <DeleteIcon fontSize="inherit" />
                               </IconButton>
                           }
                    >
                        Er du sikker på at du vil fjerne "Ressurs 1"?
                    </Alert>
                </Paper>
            </Popover>
        </div>
    );
}
