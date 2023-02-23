import * as React from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Theme} from "@mui/material";
import {useContext} from "react";
import {RolesContext} from "../../context/roleContext";

export default function FilterTypeRole() {

    const {roleType, updateRoleType} = useContext(RolesContext);



    function handleChange(event: SelectChangeEvent) {
        updateRoleType(event.target.value as string);
    }

    const updatePage = () => {
        // updateCurrentPage(0)
        // getUserPage(currentPage - 1, size, userType);
        console.log("paging stuff for later")
    }

    return (
        <FormControl style={{minWidth: 220}} sx={{mx: '2rem'}}>
            <InputLabel
                id="demo-simple-select-label"
            >
                Gruppername
            </InputLabel>
            <Select
                labelId="Grupper-select-label"
                id="Grupper-select-autowidth"
                value={roleType}
                label="Gruppertype"
                onChange={handleChange}
                size="small"
            >
                <MenuItem value={"all"} onClick={updatePage}>Alle</MenuItem>
                <MenuItem value={"students"} onClick={updatePage}>Elev</MenuItem>
                <MenuItem value={"employees"} onClick={updatePage}>Ansatt</MenuItem>
            </Select>
        </FormControl>
    );
}