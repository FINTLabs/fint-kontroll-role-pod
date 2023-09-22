import * as React from 'react';
import {
    FormControl,
    InputAdornment,
    TextField,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

interface SearchProps {
    searchFunction: (value: string) => void;
    clearFunction: () => void;
    inputValue: string;
    placeholder: string;
    showClearIcon?: string; // make the prop optional
}

export default function Search(props: SearchProps) {
    const [showClearIcon, setShowClearIcon] = useState<string>(props.showClearIcon || "none");
    const [showSearchIcon, setShowSearchIcon] = useState("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.searchFunction(event.target.value as string);
        setShowClearIcon(event.target.value === "" ? "none" : "flex");
        setShowSearchIcon(event.target.value !== "" ? "none" : "flex");
    };

    const handleClick = (): void => {
        setShowClearIcon("none");
        setShowSearchIcon("");
        props.clearFunction();
    };

    return (
        <FormControl style={{minWidth: 220}} sx={{mx: '2rem', my: '1rem'}}>
            <TextField
                label="Søk"
                id={"search-role"}
                onChange={handleSearch}
                value={props.inputValue}
                placeholder={props.placeholder}
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment
                            position="start"
                            style={{
                                display: showSearchIcon,
                            }}
                        >
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment
                            position="end"
                            style={{
                                display: showClearIcon,
                                cursor: 'pointer'
                            }}
                            onClick={handleClick}
                        >
                            <ClearIcon id={"clearIcon"}/>
                        </InputAdornment>
                    )
                }}
                inputProps={{
                    'aria-label': props.placeholder // Add an invisible label
                }}
            />
        </FormControl>
    );
}
