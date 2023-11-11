import {useMembers} from "../../../context/MemberContext";
import Search from "../../common/Search";

export default function MemberSearch() {
    const {searchValue, setSearchValue, setCurrentPage} = useMembers();

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
            placeholder="Søk medlemmer"
            // showClearIcon={ (searchValue === "" ? "none" : "flex")}
        />
    );
}
