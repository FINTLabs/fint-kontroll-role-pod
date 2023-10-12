import {
    Box,
} from "@mui/material";
import {DataTable} from "./DataTable";
import style from "../../template/style"
import {RolesProvider} from "../../context/RolesContext";
import { useBasePath } from '../../context/BasePathContext'; // Import your context file


function Container() {
    const basePath = useBasePath() || '';

    return (
        <Box sx={style.content}>

                {/*<Typography variant="h2" sx={{fontWeight: 'regular', fontSize: 'h5.fontSize', marginBottom: '1rem'}}>Grupper</Typography>*/}

                <Box sx={style.filters} my={6}>


                </Box>
                <Box>
                    <RolesProvider basePath={basePath}>
                        <div className="App">
                            <DataTable />
                            {/* Other components */}
                        </div>
                    </RolesProvider>
                </Box>

        </Box>
    );
}

export default Container;