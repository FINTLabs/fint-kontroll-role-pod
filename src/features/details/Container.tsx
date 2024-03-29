import React, {useEffect, useState} from "react";
import {Box, Tab, Tabs, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import MemberContainer from "./members/Container";
import ResourcesContainer from "./resources/Container";
import style from "../../template/style"
import {fetchRoleDetails} from "../../context/api";
import {IRoleItem} from "../../context/types";
import {useBasePath} from "../../context/BasePathContext";

function ContainerWithTabs() {
    let paramRoleId = Number(useParams().roleId);
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [roleDetails, setRoleDetails] = useState<IRoleItem | null>(null);
    const basePath = useBasePath() || '';

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchRoleDetails(basePath, paramRoleId);
                setRoleDetails(data);

            } catch (error) {
                console.error('Error fetching role details:', error);
            }
        };

        loadData();
    }, [paramRoleId, basePath]);

    const handleTabChange = (event: any, newValue: React.SetStateAction<number>) => {
        setSelectedTab(newValue);
    };

    return (
        <Box sx={style.content}>
            <Box>
                <Tabs value={selectedTab} onChange={handleTabChange}>
                    <Tab label="Medlemmer"/>
                    <Tab label="Ressurser"/>
                </Tabs>
                <Typography variant="h1" sx={{marginBottom: '1.5rem', marginTop: '1.5rem'}}>
                    {roleDetails?.roleName}
                </Typography>
                {selectedTab === 0 && (
                    <Box>
                        <MemberContainer/>
                    </Box>
                )}
                {selectedTab === 1 && (
                    <Box>
                        <ResourcesContainer/>
                    </Box>
                )}
            </Box>


        </Box>
    );
}

export default ContainerWithTabs;