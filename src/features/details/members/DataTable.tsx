import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Box, Button, TableFooter, TablePagination, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useContext, useEffect} from "react";
import {MemberContext} from "../../../context/memberContext";
import TablePaginationActions from "../../common/TableFooter";
import DataToolbar from "./DataToolbar";

export const DataTable: any = () => {

    let paramRoleId = Number(useParams().roleId);
    const {page, currentPage, setCurrentPage, setSearchValue, setRoleId, size, setSize} = useContext(MemberContext);

    useEffect(() => {
        setSearchValue("");
        setCurrentPage(0);
        setRoleId(paramRoleId);
        // getPage();
    }, []);

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

    let handleSearch;
    return (
        <Box sx={{p: 1}}>
            <TableContainer sx={{minWidth: 1040}}>
                <DataToolbar />
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
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                colSpan={4}
                                count={page ? page.totalItems : 0}
                                // rowsPerPage={rowsPerPage}
                                rowsPerPage={size}
                                // page={page}
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