import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useContext } from 'react';
import { RolesContext } from '../../context/roleContext';

export default function FilterName() {
    const { roleName, updateRoleName } = useContext(RolesContext);

    const options = [
        { value: 'all', label: 'Alle' },
        { value: 'Name1', label: 'Digital rådgivning' },
        { value: 'Name2', label: 'Fagtjenester' },
        { value: 'Name3', label: 'Digitaliseringsavdeling' },
        { value: 'Name4', label: 'Teknologiseksjon' },
    ];

    function handleChange(event: SelectChangeEvent) {
        updateRoleName(event.target.value as string);
    }

    return (
        <FormControl style={{ minWidth: 220 }} sx={{ mx: '2rem' }}>
            <InputLabel id="filter-name-select-label">Navn</InputLabel>
            <Select
                labelId="filter-name-select-label"
                id="filter-name-select"
                value={roleName}
                label="navn"
                onChange={handleChange}
                size="small"
            >
                {options.map((option) => (
                    <MenuItem
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Select>

        </FormControl>
    );
}
