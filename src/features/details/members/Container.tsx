import React from "react";
import {Box} from "@mui/material";
import {DataTable} from "./DataTable"
import {MembersProvider} from "../../../context/MemberContext";
import { useBasePath } from '../../../context/BasePathContext'; // Import your context file

function Container() {
    const basePath = useBasePath() || '';

    return (
        <Box>
            <Box>
                <MembersProvider basePath={basePath}>
                    <DataTable />
                </MembersProvider>
            </Box>
        </Box>
    );
}

export default Container;