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
                id="filter-unit-input-label"
            >
                Enhet
            </InputLabel>
            <Select
                labelId="filter-unit-select-label"
                id="filter-unit-select-autowidth"
                value={roleType}
                label="Enhet"
                onChange={handleChange}
                size="small"
            >
                <MenuItem value={"all"} onClick={updatePage}>Alle</MenuItem>
                <MenuItem value={"UnitA"} onClick={updatePage}>first unit</MenuItem>
                <MenuItem value={"UnitB"} onClick={updatePage}>second unit</MenuItem>
            </Select>
        </FormControl>
    );
}