import * as React from 'react';
import {
    FormControl,
    InputAdornment,
    TextField,
} from "@mui/material";
import {useContext, useState} from "react";
import {RolesContext} from "../../context/roleContext";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";



export default function Search() {

    const {roleName, updateRoleName} = useContext(RolesContext);

    // const updatePage = () => {
    //     // updateCurrentPage(0)
    //     // getUserPage(currentPage - 1, size, userType);
    //     console.log("paging stuff for later")
    // }

    const [showClearIcon, setShowClearIcon] = useState("none");
    const [inputValue, setInputValue] = useState("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("search", event.target.value);
        setShowClearIcon(event.target.value === "" ? "none" : "flex");
        setInputValue(event.target.value);
    };
    const handleClick = (): void => {
        // TODO: Clear the search input
        console.log("clicked the clear icon...");
        setShowClearIcon("none");
        setInputValue("");
    };

    return (
        <FormControl style={{minWidth: 240}} sx={{mx: '2rem'}}>
                <TextField
                    // label={"search-role"}
                    size="small"
                    onChange={handleSearch}
                    value={inputValue}
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
                                <ClearIcon/>
                            </InputAdornment>
                        )
                    }}
                />
        </FormControl>
    );
}