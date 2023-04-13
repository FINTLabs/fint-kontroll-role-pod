import { useContext} from "react";
import Search from "../common/Search";
import { RolesContext } from "../../context/roleContext";

export default function RoleSearch() {
    const { searchValue, setSearchValue, setCurrentPage } = useContext(RolesContext);

    // useEffect(() => {
    //     console.log("EFFECT in search with value", searchValue);
    //     getRolePage();
    // }, [searchValue]);

    const handleSearch = (value: string) => {
        setCurrentPage(0);
        setSearchValue(value);
        // getRolePage();
    };

    const handleClear = () => {
        setCurrentPage(0);
        setSearchValue("");
        // getRolePage();
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
