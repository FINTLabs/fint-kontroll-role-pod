import {
    Box,
} from "@mui/material";
import {DataTable} from "./DataTable";
import style from "../../template/style"


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