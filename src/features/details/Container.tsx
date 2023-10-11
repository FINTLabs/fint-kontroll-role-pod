import React, {useEffect, useState} from "react";
import {Box, Typography, Tabs, Tab} from "@mui/material";
import {useParams} from "react-router-dom";
import MemberContainer from "./members/Container";
import ResourcesContainer from "./resources/Container";
import style from "../../template/style"
import {fetchRoleDetails} from "../../context/api";
import {IRoleItem} from "../../context/types";

function ContainerWithTabs() {
    let paramRoleId = Number(useParams().roleId);
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [roleDetails, setRoleDetails] = useState<IRoleItem | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchRoleDetails(paramRoleId);
                setRoleDetails(data);

            } catch (error) {
                console.error('Error fetching role details:', error);
            }
        };

        loadData();
    }, [paramRoleId]);

    const handleTabChange = (event: any, newValue: React.SetStateAction<number>) => {
        setSelectedTab(newValue);
    };

    return (
        <Box sx={style.content}>
            <Typography variant="h2" sx={{fontWeight: 'regular', fontSize: 'h5.fontSize', marginBottom: '1rem'}}>
                {roleDetails?.roleName}
            </Typography>
            <Box sx={style.content}>
                <Tabs value={selectedTab} onChange={handleTabChange}>
                    <Tab label="Members" />
                    <Tab label="Resources" />
                </Tabs>
                {selectedTab === 0 && (
                    <Box sx={{ marginBottom: '1rem', padding: '2rem'}}>
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
