import {Box, Theme, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {DataTable} from "./DataTable"
import style from "../../template/style"


function Container() {

    // let roleId = String(useParams().roleId);


    return (
        <Box sx={style.content}>
            <Box>
                <Typography>filters ?</Typography>
            </Box>
            <Box>
                <DataTable></DataTable>
            </Box>
        </Box>
    );
}

export default Container;