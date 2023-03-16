import {Box, Theme, Typography} from "@mui/material";
import {DataTable} from "./DataTable"
import Search from "./Search";
import {useParams} from "react-router-dom";
import React, {useContext, useEffect} from "react";
import {MemberContext} from "../../../context/memberContext/";
import {RolesContext} from "../../../context/roleContext";


// @ts-ignore
function Container() {




    // useEffect(() => {
    //     // ... write code to get new data using new prop, also update your state
    // }, [props.match.params.roleId]);

    // useEffect(() => {
    //     setSearchValue("");
    // }, [setSearchValue]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //
    //         await setRoleId(paramRoleId);
    //         console.log("EFFECT get page from container: ", roleId);
    //
    //     }
    //     fetchData().then(r => getMemberPageA(100));
    // }, [paramRoleId]);

    // console.log("render");
    return (
        <Box>

            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '1rem',
                }}>
                    <Typography color="primary">Members:</Typography>
                    <Box>
                        <Search />
                    </Box>
                </Box>
                <Box>
                    {/* add any buttons or other elements you want to the right */}
                </Box>
            </Box>
            <Box>
                <DataTable />
            </Box>
        </Box>

    );
}

export default Container;