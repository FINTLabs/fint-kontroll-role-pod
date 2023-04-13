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

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.searchFunction(event.target.value as string);
        setShowClearIcon(event.target.value === "" ? "none" : "flex");
    };

    const handleClick = (): void => {
        console.log("clicked the clear icon...");
        setShowClearIcon("none");
        props.clearFunction();
    };

    return (
        <FormControl style={{minWidth: 240}} sx={{mx: '2rem'}}>
            <TextField
                id={"search-role"}
                size="small"
                onChange={handleSearch}
                value={props.inputValue}
                placeholder={props.placeholder}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment
                            position="end"
                            style={{
                                display: showClearIcon,
                                width: '1.5rem' // set a fixed width
                            }}
                            onClick={handleClick}
                        >
                            <ClearIcon id={"clearIcon"}/>
                        </InputAdornment>
                    )
                }}
            />
        </FormControl>
    );
}
