import Search from "../common/Search";
import {useRoles} from "../../context/RolesContext";

export default function RoleSearch() {
    const {searchValue, setSearchValue, setCurrentPage} = useRoles();


    const handleSearch = (value: string) => {
        setCurrentPage(0);
        setSearchValue(value);
    };

    const handleClear = () => {
        setCurrentPage(0);
        setSearchValue("");
    };

    return (
        <Search
            searchFunction={handleSearch}
            clearFunction={handleClear}
            inputValue={searchValue}
            label="Søk gruppenavn"
            showClearIcon={searchValue === "" ? "none" : "flex"}
        />
    );
}
