import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import {ArrowBackIos, ArrowForwardIos, SettingsRounded} from "@mui/icons-material";
import {Box, Button, Typography,} from "@mui/material";
import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {RolesContext} from "../../context/roleContext";

export const DataTable: any = () => {

    const {page, roleType, currentPage, setCurrentPage, size, searchValue} = useContext(RolesContext);

    // useEffect(() => {
    //     getRolePage();
    // }, [currentPage,searchValue])

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
        // getRolePage();
    }

    const previousPage = () => {
        setCurrentPage(currentPage - 1);
        // getRolePage();
    }

    return (
        <Box sx={{p: 1}}>
            <TableContainer sx={{maxWidth: 1040}} id={"rolesDataTable"}>
                <Table aria-label="Roles" >
                    <TableHead sx={{ th: { fontWeight: 'bold' } }}>
                        <TableRow>
                            <TableCell align="left">Navn</TableCell>
                            <TableCell align="left">Enhet</TableCell>
                            <TableCell align="left" colSpan={2}>Brukertype</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {page?.roles?.map((role) => (
                            <TableRow
                                key={role.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="left" component="th" scope="row">
                                    {role.roleName}
                                </TableCell>
                                <TableCell align="left">{role.organisationUnitName}</TableCell>
                                <TableCell align="left">{role.roleType} </TableCell>
                                <TableCell align="left">
                                    <IconButton aria-label="settings"
                                                component={Link} to={`/info/${role.id}`}
                                    >
                                        <SettingsRounded color={"primary"}/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: "flex", justifyContent: "center"}}>
                <Button
                    variant="text"
                    color={"primary"}
                    startIcon={<ArrowBackIos/>}
                    onClick={previousPage}
                    disabled={currentPage === 0}
                    sx={{mr: 4, mt: 5}}
                >
                    Forrige
                </Button>
                <Button
                    variant="text"
                    color={"primary"}
                    endIcon={<ArrowForwardIos/>}
                    onClick={nextPage}
                    disabled={currentPage === page?.totalPages - 1}
                    sx={{mt: 5}}
                >
                    Neste
                </Button>
            </Box>
            <Typography align={"center"}>
                side {currentPage + 1} av {page?.totalPages}
            </Typography>
        </Box>
    );
};