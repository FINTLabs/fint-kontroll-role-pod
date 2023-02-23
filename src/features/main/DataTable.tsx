import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import {ArrowBackIos, ArrowForwardIos, SettingsRounded} from "@mui/icons-material";
import {createStyles, makeStyles} from "@mui/styles";
import {Box, Button, Theme, Typography,} from "@mui/material";
import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {RolesContext} from "../../context/roleContext";

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
    // const {getRolePage, page, roleType, currentPage, updateCurrentPage, size} = useContext(RolesContext);
    const {getAllRoles, getRolePage, roles, page, roleType, currentPage, updateCurrentPage, size} = useContext(RolesContext);

    useEffect(() => {
        // getRolePage(currentPage, size, roleType);
        getAllRoles();
        console.log("get roles")
    }, [])

    const nextPage = () => {
        getRolePage(currentPage + 1, size, roleType);
        updateCurrentPage(currentPage + 1);
    }

    const previousPage = () => {
        getRolePage(currentPage - 1, size, roleType);
        updateCurrentPage(currentPage - 1);
    }

    return (
        <Box sx={{p: 1}}>
            <TableContainer sx={{maxWidth: 1040}}>
                <Table aria-label="Roless">
                    <TableHead sx={{ th: { fontWeight: 'bold' } }}>
                        <TableRow>
                            <TableCell align="left">Navn</TableCell>
                            <TableCell align="left">Enhet</TableCell>
                            <TableCell align="left">Brukertype</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {roles.map((role) => (
                            <TableRow
                                key={role.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="left" component="th" scope="row">
                                    {role.roleName}
                                </TableCell>
                                <TableCell align="left"> xxx </TableCell>
                                <TableCell align="left">{role.roleType}</TableCell>
                                <TableCell align="left">
                                    <IconButton aria-label="settings"
                                                component={Link} to={`/info/${role.id}`}
                                    >
                                        <SettingsRounded className={classes.icon}/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box className={classes.buttons}>
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