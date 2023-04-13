import { useContext} from "react";
import Search from "../common/Search";
import { RolesContext } from "../../context/roleContext";

export default function RoleSearch() {
    const { searchValue, setSearchValue, setCurrentPage } = useContext(RolesContext);


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
            placeholder="Søk gruppenavn"
            showClearIcon={searchValue === "" ? "none" : "flex"}
        />
    );
}
