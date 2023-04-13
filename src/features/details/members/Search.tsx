import {useContext} from "react";
import { MemberContext } from "../../../context/memberContext";
import Search from "../../common/Search";

// export default function MemberSearch(props: { roleId: number; }) {
export default function MemberSearch() {
    const {searchValue, setSearchValue, setCurrentPage} = useContext(MemberContext);

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
            placeholder="Search members"
            // showClearIcon={ (searchValue === "" ? "none" : "flex")}
        />
    );
}