import {useState} from "react";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Typography
} from "@mui/material";
import {DataTable} from "./DataTable";
import FilterType from "./FilterType";
import Search from "./Search";
import style from "../../template/style"
import DialogUnit from "./DialogUnit";


function Container() {

    return (
        <Box sx={style.content}>

                {/*<Typography variant="h2" sx={{fontWeight: 'regular', fontSize: 'h5.fontSize', marginBottom: '1rem'}}>Grupper</Typography>*/}

                <Box sx={style.filters} my={6}>


                </Box>
                <Box>
                    <DataTable/>
                </Box>

        </Box>
    );
}

export default Container;