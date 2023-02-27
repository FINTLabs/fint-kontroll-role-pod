import {Box, Card, InputAdornment, TextField, Theme, Typography} from "@mui/material";
import {DataTable} from "./DataTable";
import FilterType from "./FilterType";
import FilterUnitRole from "./FilterUnit";
import FilterName from "./FilterName";
import Search from "./Search";
import style from "../../template/style"

function Container() {


    return (
        <Box sx={style.content}>
            <Box>
                <Box><Typography variant={"h2"} color="primary">Grupper</Typography></Box>

                <Box sx={style.filters} my={6}>
                    <FilterName/>
                    <FilterUnitRole/>
                    <FilterType/>
                    <Search />
                </Box>
                <Box>
                    <DataTable/>
                </Box>
            </Box>
        </Box>
    );
}

export default Container;