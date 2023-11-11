import {Box,} from "@mui/material";
import {DataTable} from "./DataTable";
import style from "../../template/style"
import {RolesProvider} from "../../context/RolesContext";
import {useBasePath} from '../../context/BasePathContext';
import {OrgUnitsProvider} from "../../context/OrgUnitContext"; // Import your context file


function Container() {
    const basePath = useBasePath() || '';

    return (
        <Box sx={style.content}>
            <Box sx={style.table}>
                <OrgUnitsProvider basePath={basePath}>
                    <RolesProvider basePath={basePath}>
                        {/*<div className="App">*/}
                        <DataTable/>
                        {/* </div>*/}
                    </RolesProvider>
                </OrgUnitsProvider>
            </Box>
        </Box>
    );
}

export default Container;