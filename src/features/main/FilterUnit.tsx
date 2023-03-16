import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import {useContext} from 'react';
import { RolesContext } from '../../context/roleContext';

export default function FilterUnit() {
    const { roleType, setRoleType } = useContext(RolesContext);

    // useEffect(() => {
    //     // getAllRoles();
    //     console.log("get all roles", roles)
    // }, [])

    function handleChange(event: SelectChangeEvent) {
        setRoleType(event.target.value as string);
    }

    const menuItems = [
        { label: 'Alle', value: 'all' },
        { label: 'First unit', value: 'UnitA' },
        { label: 'Second unit', value: 'UnitB' },
    ];

    const updatePage = () => {
        console.log('get a new list');
    };

    return (
        <FormControl style={{ minWidth: 220 }} sx={{ mx: '2rem' }}>
            <InputLabel id="filter-unit-select-label">Enhet</InputLabel>
            <Select
                labelId="filter-unit-select-label"
                id="filter-unit-select"
                value={roleType}
                label="Enhet"
                onChange={handleChange}
                size="small"
            >
                {menuItems.map((item) => (
                    <MenuItem key={item.value} value={item.value} onClick={updatePage}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
