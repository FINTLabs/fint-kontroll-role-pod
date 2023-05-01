import * as React from 'react';
import {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Box, Checkbox} from "@mui/material";
import DataToolbar from "./DataToolbar";

export const DataTable: any = () => {
    //let roleId = String(useParams().roleId);
    //const {resources, getResourcePage,} = useContext(ResourceContext);
    const [showDelete, setShowDelete] = useState(false);
    const [selected, setSelected] = useState<number[]>([]);

    // const [confirmDelete, setConfirmDelete] = useState(false);
    // const [showConfirmation, setShowConfirmation] = useState(false);

    // useEffect(() => {
    //     getResourcePage();
    // }, [roleId])

    const someFakeResources = [
        {id: 1, name: 'Mount Everest'},
        {id: 2, name: 'Grand Canyon'},
        {id: 3, name: 'Niagara Falls'},
        {id: 4, name: 'Yellowstone National Park'},
        {id: 5, name: 'Great Barrier Reef'},
    ];


    // const ShowDeleteToggle = () => {
    //
    //     return showDelete ? (
    //         <Button
    //             component={Link}
    //             to={`/add/row_id`}
    //             variant="contained"
    //             color="primary"
    //             startIcon={<AddIcon/>}
    //             onClick={() => setShowDelete(!showDelete)}>
    //             Legg Til
    //         </Button>
    //     ) : (
    //         <IconButton onClick={() => setShowDelete(!showDelete)}>
    //             <CreateIcon/>
    //         </IconButton>
    //     );
    // }


    const handleClick = (event: React.MouseEvent<HTMLTableCellElement>, rowId: number) => {
        setSelected([rowId]);
    }


    return (
        <Box sx={{p: 1}}>
            <TableContainer sx={{minWidth: 1040}}>
                <DataToolbar numSelected={selected.length} onDeleteClick={() => setShowDelete(!showDelete)}/>
                <Table aria-label="resources">
                    <TableHead sx={{th: {fontWeight: 'bold'}}}>
                        <TableRow>
                            <TableCell align="left">Ressurser</TableCell>
                            <TableCell align="left">Tildelt av</TableCell>
                            <TableCell style={{width: '200px'}}>

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
                                <TableCell
                                    padding="checkbox"
                                    // hover
                                    onClick={(event) => handleClick(event, row.id)}
                                    role="checkbox"
                                    // aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.id}
                                    // selected={isItemSelected}

                                >
                                    {showDelete && (

                                        <Checkbox
                                            color="primary"
                                            checked={false}
                                            // inputProps={{
                                            //     'aria-labelledby': labelId,
                                            // }}
                                        />

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