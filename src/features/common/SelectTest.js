import React, { useState } from 'react';
import { makeStyles } from '@mui/material/styles';
import { Chip, FormControl, Input, InputLabel, MenuItem, Select } from '@mui/material';

// const useStyles = makeStyles((theme: { spacing: (arg0: number) => any; }) => ({
//     formControl: {
//         margin: theme.spacing(1),
//         minWidth: 120,
//         maxWidth: 300,
//     },
//     chips: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
//     chip: {
//         margin: 2,
//     },
//     noLabel: {
//         marginTop: theme.spacing(3),
//     },
// }));

const data = {
    label: 'Category',
    id: '1',
    children: [
        {
            label: 'Subcategory 1',
            id: '2',
            children: [
                {
                    label: 'Option 1',
                    id: '3',
                },
                {
                    label: 'Option 2',
                    id: '4',
                },
            ],
        },
        {
            label: 'Subcategory 2',
            id: '5',
            children: [
                {
                    label: 'Option 3',
                    id: '6',
                },
                {
                    label: 'Option 4',
                    id: '7',
                },
            ],
        },
    ],
};

const MultiLevelSelectTree = () => {
    // const classes = useStyles();
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelectChange = (event) => {
        const selected = event.target.value;
        setSelectedItems(selected);
    };

    return (
        <div>
            <FormControl>
                <InputLabel id="multi-level-select-label">{data.label}</InputLabel>
                <Select
                    labelId="multi-level-select-label"
                    id="multi-level-select"
                    multiple
                    value={selectedItems}
                    onChange={handleSelectChange}
                    input={<Input />}
                    renderValue={(selected) => (
                        <div >
                            {selected.map((value) => (
                                <Chip key={value} label={value}  />
                            ))}
                        </div>
                    )}
                >
                    {data.children.map((subcategory) => (
                        <MenuItem key={subcategory.id} value={subcategory.label}>
                            {subcategory.label}
                            {subcategory.children && (
                                <MenuItems children={subcategory.children} parent={subcategory.label} />
                            )}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

const MenuItems = ({ children, parent }) => {
    return children.map((option) => (
        <MenuItem key={option.id} value={`${parent} > ${option.label}`}>
            {option.label}
            {option.children && <MenuItems children={option.children} parent={`${parent} > ${option.label}`} />}
        </MenuItem>
    ));
};

export default MultiLevelSelectTree;
