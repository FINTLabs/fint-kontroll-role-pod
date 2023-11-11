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
            <Typography variant="h1" sx={{marginBottom: '1.5rem'}}>
                {roleDetails?.roleName}
            </Typography>
            <Box /*sx={style.content}*/>
                <Tabs value={selectedTab} onChange={handleTabChange}>
                    <Tab label="Medlemmer"/>
                    <Tab label="Ressurser"/>
                </Tabs>
                {selectedTab === 0 && (
                    <Box /*sx={{ marginBottom: '1rem', padding: '2rem'}}*/>
                        <MemberContainer/>
                    </Box>
                )}
                {selectedTab === 1 && (
                    <Box sx={{marginBottom: '1rem', padding: '2rem'}}>
                        <ResourcesContainer/>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default ContainerWithTabs;