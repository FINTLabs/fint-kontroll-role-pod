import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import {createStyles, makeStyles} from "@mui/styles";
import {Box, Button, Theme, Typography} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {RolesContext} from "../../context/roleContext";
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import BasicPopover from "./Popover";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            color: theme.palette.primary.main
        },
        buttons: {
            display: "flex",
            justifyContent: "center",
        },
    }));

export const DataTable: any = () => {
    const classes = useStyles();
    let roleId = String(useParams().roleId);
    const {getResourcesByRoleId, resources} = useContext(RolesContext);
    const [showDelete, setShowDelete] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);


    useEffect(() => {
        // getRolePage(currentPage, size, roleType);
        getResourcesByRoleId(roleId);
        console.log("get resources based on a role id:", resources.length);
    }, [])

    const ShowDeleteToggle = () => {

        return showDelete ? (
            <Button
                component={Link}
                to={`/add/row_id`}
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setShowDelete(!showDelete)}>
                Legg Til
            </Button>
        ) : (
            <IconButton onClick={() => setShowDelete(!showDelete)} >
                <CreateIcon/>
            </IconButton>
        );
    }

    return (
        <Box sx={{p: 1}}>
            <Typography variant={"h2"} color="primary">{roleId} Name of group</Typography>
            <TableContainer sx={{minWidth: 1040}}>
                <Table aria-label="Members">
                    <TableHead sx={{ th: { fontWeight: 'bold' } }}>
                        <TableRow>
                            <TableCell align="left">Ressurser</TableCell>
                            <TableCell align="left">Tildelt av</TableCell>
                            <TableCell style={{width: '200px'}}>
                                <ShowDeleteToggle />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {resources?.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="left" component="th" scope="row">
                                    {row?.name}
                                </TableCell>
                                <TableCell align="left"> xxx </TableCell>
                                <TableCell>
                                    {showDelete && (
                                        <BasicPopover />
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};