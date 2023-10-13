import React from "react";
import {Box} from "@mui/material";
import {DataTable} from "./DataTable"
import {MembersProvider} from "../../../context/MemberContext";
import { useBasePath } from '../../../context/BasePathContext';

function Container() {
    const basePath = useBasePath() || '';

    if (process.env.NODE_ENV === 'production' && basePath === '') {
        return <div>Loading...</div>;
    }

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