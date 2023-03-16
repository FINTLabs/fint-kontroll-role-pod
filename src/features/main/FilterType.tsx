import * as React from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Theme} from "@mui/material";
import {useContext} from "react";
import {RolesContext} from "../../context/roleContext";

export default function FilterType() {

    const {roleType, setRoleType} = useContext(RolesContext);

    const options = [
        { value: "all", label: "Alle" },
        { value: "students", label: "Elev" },
        { value: "employees", label: "Ansatt" }
    ];

    function handleChange(event: SelectChangeEvent) {
        setRoleType(event.target.value as string);
    }

    const updatePage = () => {
        // updateCurrentPage(0)
        // getUserPage(currentPage - 1, size, userType);
        console.log("paging stuff for later")
    }

    return (
        <FormControl style={{minWidth: 220}} sx={{mx: '2rem'}}>
            <InputLabel
                id="filter-type-select-label"
            >
                Brukertype
            </InputLabel>
            <Select
                labelId="filter-type-select-label"
                id="filter-type-select"
                value={roleType}
                label="brukertype"
                onChange={handleChange}
                size="small"
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value} onClick={updatePage}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
