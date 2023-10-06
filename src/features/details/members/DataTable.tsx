import * as React from 'react';
import {useEffect} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Box, TableFooter, TablePagination} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import TablePaginationActions from "../../common/TableFooter";
import DataToolbar from "./DataToolbar";
import {useMembers} from "../../../context/MemberContext";
import IconButton from "@mui/material/IconButton";
import {SettingsRounded} from "@mui/icons-material";

export const DataTable: any = () => {

    let paramRoleId = Number(useParams().roleId);
    const {page, currentPage, setCurrentPage, setSearchValue, setRoleId, size, setSize} = useMembers();

    useEffect(() => {
        console.log("inside member data table use effect");

        setSearchValue("");
        setCurrentPage(0);
        setRoleId(paramRoleId);
        // getPage();
    });

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        console.log("new page:", newPage)
        setCurrentPage(newPage)
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        // setRowsPerPage(parseInt(event.target.value, 10));
        setSize(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };


    return (
        <Box sx={{p: 1}}>
            <TableContainer sx={{minWidth: 1040}}>
                <DataToolbar />
                <Table aria-label="Members">
                    <TableHead sx={{ th: { fontWeight: 'bold' } }}>
                        <TableRow>
                            <TableCell align="left">Name </TableCell>
                            <TableCell align="left">User Type</TableCell>
                            <TableCell align="left">test</TableCell>
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
                                <TableCell align="left">
                                    <IconButton aria-label="settings" id={`role-123`}
                                                component={Link} to={`/beta/fintlabs-no/brukere/info/1487`}
                                    >
                                        <SettingsRounded color={"primary"}/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                colSpan={4}
                                count={page ? page.totalItems : 0}
                                // rowsPerPage={rowsPerPage}
                                rowsPerPage={size}
                                page={currentPage}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Box>
    );
};