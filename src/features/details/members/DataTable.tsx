import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Box, Button, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useContext, useEffect} from "react";
import {MemberContext} from "../../../context/memberContext";
import {ArrowBackIos, ArrowForwardIos} from "@mui/icons-material";

export const DataTable: any = () => {

    let paramRoleId = Number(useParams().roleId);
    const {page, currentPage, setCurrentPage, setSearchValue, setRoleId} = useContext(MemberContext);

    useEffect(() => {
        setSearchValue("");
        setCurrentPage(0);
        setRoleId(paramRoleId);
        // getPage();
    }, []);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const previousPage = () => {
        setCurrentPage(currentPage - 1);
    }

    return (
        <Box sx={{p: 1}}>
            <TableContainer sx={{minWidth: 1040}}>
                <Table aria-label="Members">
                    <TableHead sx={{ th: { fontWeight: 'bold' } }}>
                        <TableRow>
                            <TableCell align="left">Name </TableCell>
                            <TableCell align="left">User Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {page?.members?.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="left" component="th" scope="row">
                                    {row?.firstName} {row?.lastName}
                                </TableCell>
                                <TableCell align="left"> {row?.userType} </TableCell>
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