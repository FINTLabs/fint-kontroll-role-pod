import React, {useContext, useEffect} from "react";
import {Box, Theme, Typography, Tabs, Tab} from "@mui/material";
import {useParams} from "react-router-dom";
import MemberContainer from "./members/Container";
import ResourcesContainer from "./resources/Container";
import style from "../../template/style"
import {RolesContext} from "../../context/roleContext";


function ContainerWithTabs() {
    let paramRoleId = Number(useParams().roleId);
    const {role, setRoleId} = useContext(RolesContext);
    const [selectedTab, setSelectedTab] = React.useState(0);

    useEffect(() => {
        setRoleId(paramRoleId);
    }, []);

    const handleTabChange = (event: any, newValue: React.SetStateAction<number>) => {
        setSelectedTab(newValue);
    };

    return (
        <Box sx={style.content}>
            <Typography variant="h2" sx={{fontWeight: 'regular', fontSize: 'h5.fontSize', marginBottom: '1rem'}}>
                {role?.roleName}
            </Typography>
            <Box sx={style.content}>
                <Tabs value={selectedTab} onChange={handleTabChange}>
                    <Tab label="Members" />
                    <Tab label="Resources" />
                </Tabs>
                {selectedTab === 0 && (
                    <Box >
                        <MemberContainer />
                    </Box>
                )}
                {selectedTab === 1 && (
                    <Box sx={{ marginBottom: '1rem', padding: '2rem'}}>
                        <ResourcesContainer />
                    </Box>
                )}

            </Box>
        </Box>
    );
}

export default ContainerWithTabs;
