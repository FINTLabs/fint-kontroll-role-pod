import * as React from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useRoles} from "../../context/RolesContext";


export default function FilterType() {

    const {roleType, setRoleType} = useRoles();

    const options = [
        { value: "ALLTYPES", label: "Alle" },
        { value: "elev", label: "Elev" },
        { value: "ansatt", label: "Ansatt" }
    ];

    function handleChange(event: SelectChangeEvent) {
        setRoleType(event.target.value as string);
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
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
