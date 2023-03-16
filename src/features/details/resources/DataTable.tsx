import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import {Box, Button, Typography} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {ResourceContext} from "../../../context/resourceContext";
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import BasicPopover from "../Popover";

export const DataTable: any = () => {
    let roleId = String(useParams().roleId);
    const {resources, getResourcePage,} = useContext(ResourceContext);
    const [showDelete, setShowDelete] = useState(false);
    // const [confirmDelete, setConfirmDelete] = useState(false);
    // const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        getResourcePage();
    }, [roleId])

    const someFakeResources = [
        { id: 1, name: 'Mount Everest' },
        { id: 2, name: 'Grand Canyon' },
        { id: 3, name: 'Niagara Falls' },
        { id: 4, name: 'Yellowstone National Park' },
        { id: 5, name: 'Great Barrier Reef' },
    ];




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
            <TableContainer sx={{minWidth: 1040}}>
                <Table aria-label="resources">
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
                        {someFakeResources?.map((row) => (
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