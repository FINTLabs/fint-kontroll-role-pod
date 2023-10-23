import {Box} from "@mui/material";
import {DataTable} from "./DataTable";
import {ResourceProvider} from "../../../context/ResourceContext";
import { useBasePath } from '../../../context/BasePathContext';

function Container() {
    const basePath = useBasePath() || '';

    return (
        <Box>
            <Box>
                <ResourceProvider basePath={basePath}>
                    <DataTable/>
                </ResourceProvider>
            </Box>
        </Box>
    );
}

export default Container;